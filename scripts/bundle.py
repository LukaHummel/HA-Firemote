#!/usr/bin/env python3
"""Stamp or check the integration's frontend version; optionally build an install ZIP."""

import argparse
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPONENT = ROOT / "custom_components" / "firemote_apps"
FRONTEND = COMPONENT / "frontend"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail if the frontend version differs from manifest.json; do not modify it",
    )
    parser.add_argument("--zip", type=Path, help="Write one installable archive")
    args = parser.parse_args()
    version = json.loads((COMPONENT / "manifest.json").read_text())["version"]
    entrypoint = FRONTEND / "HA-Firemote.js"
    frontend = entrypoint.read_text()
    stamped, declarations = re.subn(
        r"const FiremoteFrontendVersion = '[^']+';",
        f"const FiremoteFrontendVersion = '{version}';",
        frontend,
    )
    if declarations != 1:
        parser.exit(
            1, "Expected one FiremoteFrontendVersion declaration in HA-Firemote.js\n"
        )
    if args.check and frontend != stamped:
        parser.exit(1, "Frontend version is stale. Run python3 scripts/bundle.py\n")
    if not args.check and frontend != stamped:
        entrypoint.write_text(stamped)
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
        print("Frontend version matches manifest.json")


if __name__ == "__main__":
    main()
