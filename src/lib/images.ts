/**
 * Image lookups against the manifest written by scripts/images.mjs.
 * Source files live in /images and are referenced by path in data/projects.json;
 * renditions are static WebP files in /public/img. Nothing is processed at runtime.
 */
import manifest from '../generated/images.json';

interface Entry { name: string; width: number; height: number; widths: number[]; largest: number; ratio: number }
const entries = manifest as Record<string, Entry>;

export interface Rendition { src: string; srcset: string; width: number; height: number; sizes: string }

export function entry(path: string): Entry {
  const e = entries[path];
  if (!e) throw new Error(`Image not in manifest: "${path}". Drop the file into /images, check the path in data/projects.json, then run "npm run images".`);
  return e;
}

const url = (e: Entry, w: number) => `/img/${e.name}-${w}.webp`;

/** Responsive WebP rendition. Only widths the source can supply without upscaling. */
export function rendition(path: string, opts: { widths?: number[]; sizes?: string } = {}): Rendition {
  const e = entry(path);
  const wanted = opts.widths ? e.widths.filter((w) => opts.widths!.some((x) => Math.abs(x - w) < 1) || w === e.largest) : e.widths;
  const widths = wanted.length ? wanted : e.widths;
  return {
    src: url(e, widths[widths.length - 1]),
    srcset: widths.map((w) => `${url(e, w)} ${w}w`).join(', '),
    width: widths[widths.length - 1],
    height: Math.round(widths[widths.length - 1] / e.ratio),
    sizes: opts.sizes ?? '100vw',
  };
}

/** Single-width rendition for previews and thumbnails (nearest available width at or above `width`). */
export function thumb(path: string, width = 800): { src: string; width: number; height: number } {
  const e = entry(path);
  const w = e.widths.find((x) => x >= width) ?? e.largest;
  return { src: url(e, w), width: w, height: Math.round(w / e.ratio) };
}
