"""
Generate big, zoomed-in favicons from your logo.png
Run from project root:  python generate-favicons.py
Requires: pip install Pillow
"""
from PIL import Image
import os

LOGO_PATH = os.path.join("assets", "logo.png")
FILL_RATIO = 0.95  # 0.95 = logo fills 95% of icon. Max 1.0.

OUTPUTS = {
    "assets/favicon-48x48.png": 48,
    "assets/favicon-96x96.png": 96,
    "assets/apple-touch-icon.png": 180,
    "assets/android-chrome-192x192.png": 192,
    "assets/android-chrome-512x512.png": 512,
}

def trim(img):
    if img.mode != "RGBA": img = img.convert("RGBA")
    bbox = img.getbbox()
    if bbox: img = img.crop(bbox)
    w, h = img.size
    px = img.load()
    l, t, r, b = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            rv, gv, bv, a = px[x, y]
            if a < 30 or (rv > 235 and gv > 235 and bv > 235): continue
            l, t, r, b = min(l, x), min(t, y), max(r, x), max(b, y)
    if r > l and b > t: img = img.crop((l, t, r+1, b+1))
    return img

def make(img, size):
    tgt = int(size * FILL_RATIO)
    w, h = img.size
    s = min(tgt/w, tgt/h)
    nw, nh = max(1, int(w*s)), max(1, int(h*s))
    r = img.resize((nw, nh), Image.LANCZOS)
    c = Image.new("RGBA", (size, size), (0,0,0,0))
    c.paste(r, ((size-nw)//2, (size-nh)//2), r)
    return c

if not os.path.exists(LOGO_PATH):
    print(f"ERROR: {LOGO_PATH} not found"); exit(1)
logo = trim(Image.open(LOGO_PATH).convert("RGBA"))
print(f"Cropped logo: {logo.size[0]}x{logo.size[1]}, fill={int(FILL_RATIO*100)}%")
for p, sz in OUTPUTS.items():
    make(logo, sz).save(p, "PNG"); print(f"  {p} ({sz}x{sz})")
icos = [make(logo, s) for s in [16,32,48,64]]
icos[0].save("assets/favicon.ico", "ICO", sizes=[(s,s) for s in [16,32,48,64]], append_images=icos[1:])
print("  assets/favicon.ico (16,32,48,64)")
print("\nDone! Favicons generated. If still small, increase FILL_RATIO (max 1.0).")