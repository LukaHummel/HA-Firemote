"""Read APK label strings using Android's resource entry offsets.

pyaxmlparser 0.3.31 treats sparse type indexes as dense arrays. Keep label
resolution independent of that index so modern APKs cannot silently use another
resource's text. Layouts follow Android's ResourceTypes.h.
"""

from struct import unpack_from


def _chunks(data, start, end):
    while start < end:
        kind, header, size = unpack_from("<HHI", data, start)
        if header < 8 or size < header or start + size > end:
            raise ValueError("Invalid resource chunk")
        yield start, kind, header, size
        start += size


def _string(data, pool, index):
    start, _, header, size = pool
    count, _, flags, strings = unpack_from("<IIII", data, start + 8)
    if index >= count:
        raise ValueError("Invalid string index")
    offset = unpack_from("<I", data, start + header + index * 4)[0]
    pos = start + strings + offset
    end = start + size

    def length(pos, wide=False):
        width, mask = (2, 0x8000) if wide else (1, 0x80)
        value = int.from_bytes(data[pos:pos + width], "little")
        pos += width
        if value & mask:
            value = ((value & (mask - 1)) * mask
                     + int.from_bytes(data[pos:pos + width], "little"))
            pos += width
        return value, pos

    if flags & 0x100:
        _, pos = length(pos)  # UTF-16 code unit count precedes UTF-8 byte count.
        size, pos = length(pos)
        encoding = "utf-8"
    else:
        size, pos = length(pos, wide=True)
        size *= 2
        encoding = "utf-16-le"
    if pos + size > end:
        raise ValueError("String exceeds resource pool")
    return data[pos:pos + size].decode(encoding)


def resolve_string(data, resource_id, seen=frozenset()):
    """Resolve a string or reference, preferring its default configuration.

    Dense, sparse, 16-bit offset, and compact entry layouts are supported.
    Return None for absent resources or reference cycles; malformed data raises
    ValueError/struct.error for the caller to handle as an unresolved label.
    """
    if resource_id in seen:
        return None
    seen = seen | {resource_id}
    table = next(_chunks(data, 0, len(data)))
    if table[1] != 2:
        raise ValueError("Not an Android resource table")
    chunks = list(_chunks(data, table[2], table[3]))
    pool = next((chunk for chunk in chunks if chunk[1] == 1), None)
    if pool is None:
        return None
    candidates = []
    for package, kind, header, size in chunks:
        if kind != 0x200 or unpack_from("<I", data, package + 8)[0] != resource_id >> 24:
            continue
        type_offset = unpack_from("<I", data, package + 284)[0] if header >= 288 else 0
        for start, kind, header, size in _chunks(data, package + header, package + size):
            if kind != 0x201 or data[start + 8] + type_offset != (resource_id >> 16) & 255:
                continue
            flags = data[start + 9]
            count, entries_start = unpack_from("<II", data, start + 12)
            index = resource_id & 65535
            offset = None
            if flags & 1:
                for i in range(count):
                    entry_index, entry_offset = unpack_from("<HH", data, start + header + i * 4)
                    if entry_index == index:
                        offset = entry_offset * 4
                        break
            elif index < count:
                if flags & 2:
                    value = unpack_from("<H", data, start + header + index * 2)[0]
                    offset = value * 4 if value != 65535 else None
                else:
                    value = unpack_from("<I", data, start + header + index * 4)[0]
                    offset = value if value != 0xffffffff else None
            if offset is None:
                continue
            pos = start + entries_start + offset
            if pos < start + header or pos + 8 > start + size:
                raise ValueError("Invalid resource entry offset")
            entry_size, entry_flags = unpack_from("<HH", data, pos)
            if entry_flags & 8:  # Compact entry embeds the value in its header.
                value_type = entry_flags >> 8
                value = unpack_from("<I", data, pos + 4)[0]
            elif entry_flags & 1:  # Complex values are not labels.
                continue
            else:
                if entry_size < 8 or pos + entry_size + 8 > start + size:
                    raise ValueError("Invalid resource value")
                value_type, value = unpack_from("<B I", data, pos + entry_size + 3)
            # The configuration begins with its size, followed by qualifier bytes.
            default = not any(data[start + 24:start + header])
            candidates.append((not default, value_type, value))
    for _, value_type, value in sorted(candidates, key=lambda item: item[0]):
        if value_type == 3:
            return _string(data, pool, value)
        if value_type == 1:
            resolved = resolve_string(data, value, seen)
            if resolved is not None:
                return resolved
    return None
