import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const MARK_PATH = path.join(ROOT, 'public', 'brand', 'mark-ink.png');
const PUBLIC = path.join(ROOT, 'public');

async function generate() {
  const markBuf = await fs.readFile(MARK_PATH);
  const b64 = markBuf.toString('base64');

  // 1. SVG Favicon with embedded base64 data URI (avoids external resource blocking in image context)
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#f4f2ed"/>
  <image href="data:image/png;base64,${b64}" x="8" y="8" width="48" height="48" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  await fs.writeFile(path.join(PUBLIC, 'favicon.svg'), svgFavicon);

  // 2. 64x64 PNG
  const png64 = await sharp(Buffer.from(svgFavicon)).resize(64, 64).png().toBuffer();
  await fs.writeFile(path.join(PUBLIC, 'favicon-64.png'), png64);

  // 3. 32x32 PNG
  const png32 = await sharp(Buffer.from(svgFavicon)).resize(32, 32).png().toBuffer();
  await fs.writeFile(path.join(PUBLIC, 'favicon-32.png'), png32);

  // 4. Apple Touch Icon (180x180, opaque #f4f2ed background as per iOS HIG)
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#f4f2ed"/>
  <image href="data:image/png;base64,${b64}" x="24" y="24" width="132" height="132" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  const applePng = await sharp(Buffer.from(appleSvg)).resize(180, 180).removeAlpha().png().toBuffer();
  await fs.writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), applePng);

  // 5. Multi-resolution favicon.ico (16, 32, 48, 64) via ImageMagick
  execSync(`magick "${path.join(PUBLIC, 'favicon-64.png')}" -define icon:auto-resize=64,48,32,16 "${path.join(PUBLIC, 'favicon.ico')}"`);

  console.log('✓ Favicons successfully generated in /public:');
  console.log('  - favicon.svg (embedded data URI on paper background)');
  console.log('  - favicon.ico (multi-res: 16, 32, 48, 64)');
  console.log('  - favicon-64.png (64x64)');
  console.log('  - favicon-32.png (32x32)');
  console.log('  - apple-touch-icon.png (180x180 opaque)');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
