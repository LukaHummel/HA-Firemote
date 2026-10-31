"""Synthetic Android resource tables; no APK or parser dependency required."""

import importlib.util
import struct
import unittest
from pathlib import Path

SPEC = importlib.util.spec_from_file_location(
    "apk_resources", Path(__file__).parents[1]
    / "custom_components/firemote_apps/apk_resources.py",
)
resources = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(resources)


def chunk(kind, header, body):
    return struct.pack("<HHI", kind, len(header) + 8, len(header) + len(body) + 8) + header + body


def table(mode=1, compact=False, utf8=True, reference=False):
    strings = ["%1$s won't work unless you enable Google Play services.", "Stremio"]
    encoded = []
    for text in strings:
        raw = text.encode("utf-8" if utf8 else "utf-16-le")
        encoded.append((bytes([len(text), len(raw)]) + raw + b"\0") if utf8
                       else struct.pack("<H", len(text)) + raw + b"\0\0")
    pool = chunk(1, struct.pack("<IIIII", 2, 0, 0x100 if utf8 else 0, 36, 0),
                 struct.pack("<II", 0, len(encoded[0])) + b"".join(encoded))

    def entry(value_type, value):
        if compact:
            return struct.pack("<HHI", 0, 8 | value_type << 8, value)
        return struct.pack("<HHIHBBI", 8, 0, 0, 8, 0, value_type, value)

    # Put Stremio first in the data, with an unrelated message after it. Index
    # offsets, rather than sequential reads, must select the intended value.
    first = entry(1 if reference else 3, 0x7f130000 if reference else 1)
    second = entry(3, 0)
    if mode == 1:
        indexes = struct.pack("<HHHH", 0, len(first) // 4, 30, 0)
        count = 2
    elif mode == 2:
        indexes = struct.pack("<31H", len(first) // 4, *([65535] * 29), 0) + b"\0\0"
        count = 31
    else:
        indexes = struct.pack("<31I", len(first), *([0xffffffff] * 29), 0)
        count = 31
    types = chunk(0x201, struct.pack("<BBHIII", 0x13, mode, 0, count, 28 + len(indexes), 8)
                  + b"\0" * 4, indexes + first + second)
    package_header = struct.pack("<I", 0x7f) + b"\0" * 276
    package = chunk(0x200, package_header, types)
    return chunk(2, struct.pack("<I", 1), pool + package)


class ResourceLabelTests(unittest.TestCase):
    def test_sparse_label_does_not_use_unrelated_message(self):
        self.assertEqual(resources.resolve_string(table(), 0x7f13001e), "Stremio")

    def test_all_entry_layouts_and_string_encodings(self):
        for mode in (0, 1, 2):
            for compact in (False, True):
                for utf8 in (False, True):
                    with self.subTest(mode=mode, compact=compact, utf8=utf8):
                        self.assertEqual(resources.resolve_string(table(mode, compact, utf8),
                                                                  0x7f13001e), "Stremio")

    def test_reference_is_resolved(self):
        self.assertEqual(resources.resolve_string(table(reference=True), 0x7f13001e),
                         "%1$s won't work unless you enable Google Play services.")

    def test_missing_resource(self):
        self.assertIsNone(resources.resolve_string(table(), 0x7f13001d))

    def test_reference_cycle(self):
        self.assertIsNone(resources.resolve_string(table(), 0x7f13001e, {0x7f13001e}))

    def test_malformed_chunk(self):
        with self.assertRaises(ValueError):
            resources.resolve_string(b"\x02\0\x0c\0\0\0\0\0", 0x7f13001e)
