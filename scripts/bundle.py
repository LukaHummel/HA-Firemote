#!/usr/bin/env python3
"""Bundle the shipped frontend with the integration; optionally build an install ZIP."""

import argparse
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "dist"
COMPONENT = ROOT / "custom_components" / "firemote_apps"
DESTINATION = COMPONENT / "frontend"


def files(directory):
    return {
        path.relative_to(directory): path.read_bytes()
        for path in directory.rglob("*")
        if path.is_file()
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail if bundled frontend differs from dist",
    )
    parser.add_argument("--zip", type=Path, help="Write one installable archive")
    args = parser.parse_args()
    if args.check:
        if files(SOURCE) != files(DESTINATION):
            parser.exit(1, "Bundled frontend is stale. Run python3 scripts/bundle.py\n")
    else:
        shutil.copytree(SOURCE, DESTINATION, dirs_exist_ok=True)
        for path in DESTINATION.rglob("*"):
            if path.is_file() and not (SOURCE / path.relative_to(DESTINATION)).exists():
                path.unlink()
    if args.zip:
        args.zip.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(args.zip, "w", zipfile.ZIP_DEFLATED) as archive:
            for path in sorted(COMPONENT.rglob("*")):
                if (
                    path.is_file()
                    and "__pycache__" not in path.parts
                    and path.suffix != ".pyc"
                ):
                    archive.write(path, path.relative_to(ROOT))
            archive.write(ROOT / "LICENSE", "LICENSE")
        print(args.zip.resolve())
    else:
        print("Bundled frontend matches dist")


if __name__ == "__main__":
    main()
