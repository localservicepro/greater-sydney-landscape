#!/usr/bin/env python3
"""Optimise client photography into responsive WebP variants.

Reads originals from src/assets/img/raw/ (not committed) and writes
src/assets/img/<key>-<width>.webp. Run: python3 scripts/images.py
"""
import os, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'src', 'assets', 'img', 'raw')
OUT = os.path.join(ROOT, 'src', 'assets', 'img')

# key -> (source file, widths)
HERO_W = [768, 1280, 1920]
CARD_W = [480, 800, 1200]  # portrait photos; 1200 wide is plenty for cards and sub-heroes
IMAGES = {
    'hero-lawn-hedge':      ('IMG_3978.webp', HERO_W),   # curved manicured lawn + formal hedge (home hero)
    'lawn-mowing':          ('IMG_0358.webp', HERO_W),   # push mower on freshly cut backyard (landscape)
    'lawn-stripes':         ('IMG_7591.webp', CARD_W),   # striped lawn along hedge (portrait)
    'ride-on-driveway':     ('IMG_9979.webp', CARD_W),   # ride-on mower on driveway (landscape)
    'ride-on-lawn':         ('IMG_0385.webp', CARD_W),   # ride-on on large lawn (portrait)
    'ride-on-leaves':       ('IMG_0171.webp', CARD_W),   # ride-on under trees, leaf litter (portrait)
    'ute-and-mower':        ('IMG_9957.webp', CARD_W),   # ute and ride-on on a block (landscape)
    'hedge-trimming':       ('IMG_7788.webp', CARD_W),   # crew member trimming front hedge (landscape)
    'hedge-house':          ('IMG_6688.webp', CARD_W),   # trimming hedge beside heritage fence (portrait)
    'topiary':              ('IMG_7271.webp', CARD_W),   # clipped topiary ball (portrait)
    'strata-grounds':       ('65f2c6a76b984fbc30bed2138619ef6a.jpeg', HERO_W),  # apartment complex hedges, rainbow
    'garden-lawn-dog':      ('IMG_3975.webp', CARD_W),   # lawn, hedge and garden bed (portrait)
    'commercial-entry':     ('IMG_7088.webp', CARD_W),   # commercial entrance with climbing greenery (portrait)
    'cala-sign-garden':     ('IMG_4772.webp', CARD_W),   # stone feature wall with planting (portrait)
    'lawn-care-watering':   ('IMG_8163.webp', CARD_W),   # crew member watering a fresh lawn (portrait)
}

def load(name):
    im = Image.open(os.path.join(RAW, name))
    im = ImageOps.exif_transpose(im)
    return im.convert('RGB')

def write_variants(key, src, widths):
    im = load(src)
    for w in widths:
        if w > im.width:
            continue
        h = round(im.height * w / im.width)
        out = os.path.join(OUT, f'{key}-{w}.webp')
        if os.path.exists(out):
            continue
        im.resize((w, h), Image.LANCZOS).save(out, 'WEBP', quality=72, method=6)
    # blur-up placeholder (tiny) for LQIP
    tiny = im.resize((24, round(im.height * 24 / im.width)), Image.LANCZOS)
    tiny.save(os.path.join(OUT, f'{key}-lqip.webp'), 'WEBP', quality=40)
    return im.size

def logo_and_icons():
    logo = Image.open(os.path.join(RAW, 'logo.webp')).convert('RGBA')
    logo.save(os.path.join(OUT, 'logo.webp'), 'WEBP', quality=92, lossless=True)
    logo.resize((288, 200), Image.LANCZOS).save(os.path.join(OUT, 'logo-288.webp'), 'WEBP', quality=92)
    # Favicons: square white canvas with the mark centred
    for size, name in [(512, 'icon-512.png'), (192, 'icon-192.png'), (180, 'apple-touch-icon.png'), (32, 'favicon-32.png')]:
        canvas = Image.new('RGBA', (size, size), (255, 255, 255, 255))
        pad = int(size * 0.06)
        inner = logo.copy(); inner.thumbnail((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
        canvas.paste(inner, ((size - inner.width) // 2, (size - inner.height) // 2), inner)
        canvas.save(os.path.join(OUT, name))

def og_image():
    """1200x630 share image: hero photo with charcoal scrim and the logo tile."""
    im = load(IMAGES['hero-lawn-hedge'][0])
    im = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.55))
    scrim = Image.new('RGBA', im.size, (18, 27, 31, 0))
    from PIL import ImageDraw
    d = ImageDraw.Draw(scrim)
    for y in range(630):
        a = int(min(255, max(0, (y - 250) / 380 * 200)))
        d.line([(0, y), (1200, y)], fill=(18, 27, 31, a))
    im = Image.alpha_composite(im.convert('RGBA'), scrim)
    logo = Image.open(os.path.join(RAW, 'logo.webp')).convert('RGBA')
    logo.thumbnail((300, 220), Image.LANCZOS)
    # rounded white tile already baked into logo; add soft shadow
    im.paste(logo, (60, 630 - logo.height - 60), logo)
    # green swoosh stripe bottom
    d2 = ImageDraw.Draw(im)
    for i, col in enumerate([(31, 163, 52), (110, 187, 38), (163, 202, 34)]):
        x0 = 60 + 300 + 40 + i * 70
        d2.polygon([(x0, 600), (x0 + 60, 600), (x0 + 84, 570), (x0 + 24, 570)], fill=col)
    im.convert('RGB').save(os.path.join(OUT, 'og-image.jpg'), 'JPEG', quality=82)

if __name__ == '__main__':
    import json
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    for key, (src, widths) in IMAGES.items():
        size = write_variants(key, src, widths)
        manifest[key] = {'w': size[0], 'h': size[1], 'widths': [w for w in widths if w <= size[0]], 'source': src}
        print(f'{key:22s} {src:40s} {size[0]}x{size[1]}')
    # AI-generated fill-ins (no raw original): register whatever variants exist on disk.
    for key in ('pressure-washing',):
        widths = sorted(int(f[len(key) + 1:-5]) for f in os.listdir(OUT) if f.startswith(key + '-') and f.endswith('.webp') and f[len(key) + 1:-5].isdigit())
        if widths:
            largest = Image.open(os.path.join(OUT, f'{key}-{widths[-1]}.webp'))
            manifest[key] = {'w': largest.width, 'h': largest.height, 'widths': widths, 'source': 'generated (Higgsfield)'}
    json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
    logo_and_icons()
    og_image()
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT) if os.path.isfile(os.path.join(OUT, f)))
    print(f'total optimised assets: {total/1024:.0f} KB')
