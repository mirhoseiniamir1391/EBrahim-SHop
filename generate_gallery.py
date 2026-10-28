from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
IMAGE_ROOT = ROOT / "images"
CATEGORIES = ("stationery", "printing", "computer")
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
manifest = {}
for category in CATEGORIES:
    folder = IMAGE_ROOT / category
    folder.mkdir(parents=True, exist_ok=True)
    files = sorted(
        (p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in EXTENSIONS),
        key=lambda p: p.name.casefold(),
    )
    manifest[category] = [p.relative_to(ROOT).as_posix() for p in files]
(IMAGE_ROOT / "manifest.json").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("Image list updated:")
for category, files in manifest.items():
    print(f"  {category}: {len(files)} image(s)")
print("Done. Upload/commit the updated project to GitHub Pages.")
