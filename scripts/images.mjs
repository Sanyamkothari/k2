/**
 * Image pipeline. Reads every file in /images, writes responsive WebP renditions
 * to /public/img and a manifest to /src/generated/images.json.
 *
 * Idempotent: a source that has not changed (same content hash) is skipped.
 * Runs automatically before `astro dev` and `astro build`.
 */
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SRC = path.join(ROOT, 'images');
const OUT = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'generated', 'images.json');
const WIDTHS = [480, 800, 1200, 1600, 2000];
const MAX = 2400;
const QUALITY_WEBP = 78;
const QUALITY_AVIF = 65;
const EXT = /\.(jpe?g|png|webp)$/i;

const slug = (s) => s.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(full));
    } else if (EXT.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  const files = (await getFiles(SRC)).sort();
  const manifest = {};
  let made = 0, skipped = 0;
  const t0 = Date.now();

  for (const full of files) {
    const rel = path.relative(SRC, full).split(path.sep).join('/');
    const buf = await fs.readFile(full);
    const hash = createHash('md5').update(buf).digest('hex').slice(0, 8);
    const name = `${slug(rel)}-${hash}`;
    const image = sharp(buf, { limitInputPixels: false }).rotate();
    const meta = await image.metadata();
    const w = meta.width, h = meta.height;
    const widths = Array.from(new Set([...WIDTHS.filter((x) => x < w), Math.min(w, MAX)])).sort((a, b) => a - b);
    const outputs = widths.flatMap((x) => [
      { w: x, format: 'webp', file: path.join(OUT, `${name}-${x}.webp`) },
      { w: x, format: 'avif', file: path.join(OUT, `${name}-${x}.avif`) },
    ]);
    const missing = [];
    for (const o of outputs) if (!(await exists(o.file))) missing.push(o);
    if (missing.length) {
      await Promise.all(
        missing.map((o) => {
          const resized = image.clone().resize({ width: o.w, withoutEnlargement: true });
          if (o.format === 'avif') {
            return resized.avif({ quality: QUALITY_AVIF, effort: 4 }).toFile(o.file);
          }
          return resized.webp({ quality: QUALITY_WEBP, effort: 4 }).toFile(o.file);
        })
      );
      made += missing.length;
    } else skipped += 1;
    const largest = widths[widths.length - 1];
    manifest[`images/${rel}`] = { name, width: w, height: h, widths, largest, ratio: +(w / h).toFixed(4) };
  }

  // Remove renditions whose source is gone or changed.
  const keep = new Set(
    Object.values(manifest).flatMap((m) =>
      m.widths.flatMap((x) => [`${m.name}-${x}.webp`, `${m.name}-${x}.avif`])
    )
  );
  let removed = 0;
  for (const f of await fs.readdir(OUT)) if (!keep.has(f)) { await fs.unlink(path.join(OUT, f)); removed += 1; }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 1));
  console.log(`images: ${files.length} sources, ${made} renditions written, ${skipped} up to date, ${removed} stale removed (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
