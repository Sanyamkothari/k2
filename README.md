# K2 Architects — website

The public site for K2 Architects, Nagpur. Astro with React islands, Tailwind tokens, Motion for animation, Lenis for scroll. Static output; deploys to Netlify or any shared host.

- **Art direction**: see [RATIONALE.md](RATIONALE.md). The living style guide is at `/styleguide`.
- **Routes**: `/` (home), `/works` (portfolio with filters, grid/index views and a gallery), `/studio`, `/contact`, `/styleguide`. Old URLs (`/projects`, `/projects.html`, `/contactus`, `/contactus.html`) redirect.

## Adding a project (no code required)

1. **Drop the photographs into the appropriate category under `images/`** (e.g. `images/schools/`, `images/colleges/`, `images/healthcare/`, `images/hostels/`, `images/residential/`, `images/bungalows/`, `images/hospitality/`). Use clean lowercase kebab-case filenames (e.g. `new-public-school-cover.jpg`). JPG or PNG. Any aspect ratio; the pipeline crops and resizes. Keep the longest side at or under 2400 px (the pipeline never emits anything larger) so the repository and the build stay small.
2. **Add an entry to `data/projects.json`** under the right category key:

   | key           | shown as                    | directory               |
   |---------------|-----------------------------|-------------------------|
   | `engineering` | Schools                     | `images/schools/`       |
   | `college`     | Colleges & Campuses         | `images/colleges/`      |
   | `medi`        | Hospitals & Healthcare      | `images/healthcare/`    |
   | `hostel`      | Hostels & Public Buildings  | `images/hostels/`       |
   | `residential` | Residential & Commercial    | `images/residential/`   |
   | `bungalow`    | Bungalows & Townships       | `images/bungalows/`     |
   | `banquets`    | Banquets & Hospitality      | `images/hospitality/`   |

   ```json
   {
     "id": 26,
     "title": "NEW PUBLIC SCHOOL",
     "description": "NAGPUR (M.S.)",
     "image": "images/schools/new-public-school-cover.jpg",
     "images": [
       "images/schools/new-public-school-cover.jpg",
       "images/schools/new-public-school-aerial.jpg"
     ],
     "year": 2024
   }
   ```

   - `title` may be ALL CAPS; the site converts it to title case.
   - `description` is `CITY (STATE)`. Recognised state codes: `M.S.`, `C.G.`, `M.P.`, `U.P.`, `A.P.`, `ODISHA`.
   - `image` is the cover; `images` is the gallery (include the cover first).
   - `year` is optional. When any project has one, the Index view shows a Year column.
   - `id` only needs to be unique within its category. Share links use a slug made from the title and city (`/works?project=new-public-school-nagpur`).
3. **Build.** `npm run build` regenerates the image renditions and the pages. Nothing else to touch.

To feature a project on the home page, add its slug to `featured` in `src/lib/site.ts` (run `npm run slugs` to list every slug). Team, sectors, clients, contact details and copy also live in `src/lib/site.ts`.

## Development

```bash
npm install
npm run dev        # http://localhost:4321 (runs the image pipeline first)
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
npm run check      # type-check Astro and TypeScript
npm run images     # regenerate image renditions only
```

Requires Node 22.

### Configuration

`src/lib/site.config.js`:

- `SITE_URL` — the public origin, used for canonical URLs, Open Graph and JSON-LD. Set the `SITE_URL` environment variable at build time or edit the default.
- `FORMSPREE_ID` — a [Formspree](https://formspree.io) form id for the contact form. Leave empty and the form opens the visitor's email app with the message pre-filled.

### Image pipeline

`scripts/images.mjs` reads every file in `images/`, writes WebP renditions at 480, 800, 1200, 1600, 2000 and up to 2400 px wide into `public/img/`, and records dimensions in `src/generated/images.json`. It is idempotent: unchanged sources are skipped, and renditions of removed sources are deleted. Both directories are generated and git-ignored. Components request sizes through `src/lib/images.ts`, which only ever emits widths the source can supply, so nothing is upscaled.

## Deploying

- **Netlify**: connect the repo; `netlify.toml` sets the build command, publish directory, redirects (via `public/_redirects`) and cache headers.
- **Search engines**: the build writes `sitemap-index.xml`, and `/robots.txt` points to it. Both use `SITE_URL`, so set it to the real domain before the first production build.
- **Shared hosting (Apache)**: run `npm run build` and upload the contents of `dist/`. The included `.htaccess` serves extensionless URLs and the legacy redirects.

## Project layout

```
data/projects.json         The single source of truth for the portfolio
images/                    Original photographs, organised by category (schools/, colleges/, healthcare/, hostels/, residential/, bungalows/, hospitality/, team/, clients/)
public/                    Static files: fonts, brand marks, robots, redirects
scripts/images.mjs         Image pipeline
src/lib/site.ts            Copy, team, sectors, clients, featured works
src/lib/projects.ts        JSON → normalised projects (labels, title case, slugs)
src/styles/tokens.css      Design tokens (colour, type, space, motion)
src/styles/global.css      Fonts, base styles, utilities
src/layouts/Base.astro     Head, SEO, JSON-LD, nav, footer
src/components/            Home sections, works island (React), shared pieces
src/pages/                 index, works, studio, contact, styleguide
```

`archive/` holds legacy material from the previous site and is not part of the build.
