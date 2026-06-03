// Generates the CMBD brand image assets from the source artwork.
//
// Usage: node scripts/build-cmbd-assets.js
//
// Reads the committed source PNGs in scripts/brand-src/cmbd/ and writes the five
// brand assets into public/brands/cmbd/. The source artwork is navy-on-transparent,
// and the CMBD sidebar is dark navy, so every logo/icon is composited onto a cream
// (#FAF7F0 — brand.background) card to stay legible. iOS also renders transparent
// apple-icons on black, so an opaque backing is required there too.
//
// Recipe: strip the 1px frame (extract) -> trim transparent margin -> resize to fit
// (contain) -> composite centred onto a cream canvas -> PNG.

const path = require('path');
const sharp = require('sharp');

const SRC_DIR = path.join(__dirname, 'brand-src', 'cmbd');
const OUT_DIR = path.join(__dirname, '..', 'public', 'brands', 'cmbd');

const LOGOTYPE = path.join(SRC_DIR, 'logotype.png'); // compact CMBD bubble mark
const LOGO_FULL = path.join(SRC_DIR, 'logo-full.png'); // full "C'est Marseille BD"

// brand.background — keep in sync with config/brand/cmbd.ts
const CREAM = { r: 250, g: 247, b: 240, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// A few of the source frames carry a 1px black border at the very edge that would
// defeat trim(); shave a small inset off first. Harmless for borderless sources.
const INSET = 5;

async function loadTrimmed(src) {
  const { width, height } = await sharp(src).metadata();
  // Realize the inset crop to a buffer first — sharp can't combine an explicit
  // extract with trim in a single pipeline ("bad extract area").
  const inset = await sharp(src)
    .extract({
      left: INSET,
      top: INSET,
      width: width - 2 * INSET,
      height: height - 2 * INSET,
    })
    .png()
    .toBuffer();
  return sharp(inset).trim({ threshold: 10 });
}

// Square cream badge with the artwork centred and `pad` fraction of margin.
async function badge(src, size, pad, outName) {
  const inner = Math.round(size * (1 - 2 * pad));
  const trimmed = await loadTrimmed(src);
  const art = await trimmed
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toBuffer();
  const out = path.join(OUT_DIR, outName);
  await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: art, gravity: 'center' }])
    .png()
    .toFile(out);
  console.log(`  ${outName.padEnd(16)} ${size}x${size}`);
}

// Wide cream banner with the full logo centred, sized so that under object-contain
// the logo fills ~80% of the hero band height.
async function hero(src, outName) {
  const LOGO_H = 880; // rendered artwork height inside the banner
  const pipeline = await loadTrimmed(src);
  const trimmed = await pipeline.png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const ratio = meta.width / meta.height;
  const logoW = Math.round(LOGO_H * ratio);
  const canvasH = Math.round(LOGO_H / 0.8); // ~10% vertical margin each side
  const sidePad = 160;
  const canvasW = logoW + 2 * sidePad;
  const art = await sharp(trimmed).resize(logoW, LOGO_H, { fit: 'fill' }).png().toBuffer();
  const out = path.join(OUT_DIR, outName);
  await sharp({ create: { width: canvasW, height: canvasH, channels: 4, background: CREAM } })
    .composite([{ input: art, gravity: 'center' }])
    .png()
    .toFile(out);
  console.log(`  ${outName.padEnd(16)} ${canvasW}x${canvasH} (logo ${logoW}x${LOGO_H}, src ratio ${ratio.toFixed(2)})`);
}

async function main() {
  console.log('Building CMBD brand assets ->', OUT_DIR);
  // Nav / admin / login logo + browser/app icons: the compact CMBD bubble mark.
  await badge(LOGOTYPE, 800, 0.14, 'logo.png');
  await badge(LOGOTYPE, 192, 0.1, 'icon.png');
  await badge(LOGOTYPE, 180, 0.1, 'apple-icon.png');
  await badge(LOGOTYPE, 48, 0.08, 'favicon.png');
  // Home hero: the full logo featured on cream.
  await hero(LOGO_FULL, 'hero.png');
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
