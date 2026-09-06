# K2 Architects — Website Redesign Brief

You are a senior design engineer with the taste of an editorial art director. Redesign the entire K2 Architects website from scratch. The result must feel like a monograph from a serious architecture practice: quiet, confident, precise. Every choice should look deliberate. Nothing should look like a template.

---

## 1. Who this is for

K2 Architects is a 25-year-old architecture practice based in Nagpur, Maharashtra, led by Principal Architect Ar. Sachin Kothari with Landscape Architect Ar. Riya Kothari. They have delivered 450+ projects across seven Indian states, with deep specialisation in institutional work: schools, colleges, hospitals, hostels, plus townships, bungalows, and commercial buildings. Clients include Delhi Public School, DPS World, GD Goenka, Jindal, Vidyanchal, Sanskar, Happy Faces, and Yugantar.

The audience is school trusts, hospital promoters, developers, and institutions choosing an architect for a multi-crore project. They are judging credibility, scale of experience, and taste. The site must make them feel they are in capable, established hands.

## 2. Existing material you must work with

- `data/projects.json`: 69 projects in 7 categories (`engineering` = schools, `residential`, `hostel`, `bungalow`, `banquets`, `medi`, `college`). Each has `title`, `description` (city and state), a cover `image`, and an `images` array for a gallery. Keep this file as the single source of truth. Rename categories in the UI to clean labels: Schools, Colleges & Campuses, Hospitals & Healthcare, Hostels & Public Buildings, Residential & Commercial, Bungalows & Townships, Banquets & Hospitality.
- `images/`: real drone photographs and 3D renders of built work. Quality and aspect ratios vary. Do not use `bg4.jpg` for the hero; it is an AI-generated image and undermines the practice. Use a real aerial such as `dps_amravati_aerial.png` or `jito_dps_aurangabad.jpg`.
- Logo `images/logo1.png`: white geometric K2 mark with a cyan-blue stroke. The current site's gold accent contradicts it. Fix that.
- Content: the About copy, the five sectors, the four team members, the client logos, the contact details and Google Maps location. Rewrite copy to be shorter and more assured, but keep every fact.
- Preserve and improve the existing SEO: title, meta description, Open Graph, Twitter cards. Add JSON-LD for `ArchitectureFirm` / `LocalBusiness` with the Nagpur address.

Ignore the `hostels/`, `archive/`, and `gdoc_*` directories. They are not part of the public site.

## 3. Art direction

**Concept: "Quiet monumentality."** The buildings are the story. The interface is the paper they are printed on.

**Palette.** Warm off-white paper (`#F4F2ED`) and ink (`#111111`), with two intermediate greys for rules and secondary text. One accent only, taken from the logo's blue, desaturated slightly toward slate (`#1F7FB8` or close), used for at most: link underlines on hover, the active filter, one primary button. No gold. No gradients as decoration. No glassmorphism. A dark mode is optional; if you build it, make it ink paper with the same restraint, not a neon theme.

**Typography.** Pair a high-contrast editorial serif for display with a neutral grotesk for UI and body. Recommended, all free on Google Fonts: display `Instrument Serif` or `Fraunces` (opsz axis, light weight); text and UI `Inter Tight`, `Manrope`, or `Geist`. Display type should be large and tight: hero at `clamp(3.5rem, 9vw, 9rem)`, letter-spacing around `-0.03em`, line-height 0.95. Body at 17–18px, line-height 1.6, measure of 60–70 characters. Use tabular figures for numbers. Use small caps or tracked uppercase labels at 11–12px for meta information such as sector and city. Titles in the data are ALL CAPS; convert to title case at render time.

**Layout.** A 12-column grid with generous outer margins (6–8vw on desktop). Asymmetry is the rule: text columns offset from image columns, a wide image beside a narrow caption, whitespace used as a compositional element. Hairline rules (1px, low-contrast) organise sections instead of cards and drop shadows. Section headings sit at the left margin with a small index number ("01 — Selected Works"). Nothing is centered by default except the hero statement.

**Imagery.** Every image gets `object-fit: cover` into one of three fixed ratios (3:2, 4:5, 16:9) so the mixed source material reads as a coherent set. Apply a subtle, consistent grade via CSS (slight contrast lift, very light warm tint, optional 3–4% film grain overlay). Never stretch. Never place text over a busy image without a gradient scrim. Convert to WebP or AVIF with responsive `srcset`.

**Motion.** Restrained and physical. One easing curve across the site (`cubic-bezier(0.22, 1, 0.36, 1)`), durations 0.6–1.0s for reveals, 0.25s for hovers. Use a smooth-scroll library such as Lenis. Text reveals are masked line-by-line on first view. Images reveal with a `clip-path` wipe and a slow 1.05 → 1.0 scale. Parallax is subtle: at most 10–15% travel. Page transitions are a short fade with a paper-colour curtain. Every animation respects `prefers-reduced-motion`. Remove the spinning preloader and tilt.js entirely; if you want a loader, use a single-line counter or the wordmark fading in, shown only on first load.

**Iconography.** No Font Awesome. Use thin line icons from Lucide or Phosphor at 1.25px stroke, or none at all. Arrows are typographic (→) or a small custom SVG.

## 4. Components to draw from 21st.dev

21st.dev is a registry of shadcn-compatible React and Tailwind components; you copy the source into the repo and own it. Cherry-pick, then restyle every one to the tokens above so the site reads as one hand. Do not mix aesthetics. Suitable pieces:

- **Hero** with staggered text reveal and a full-bleed image (search: "animated hero", "text reveal").
- **Navbar** that is transparent over the hero, then becomes a blurred paper bar on scroll, with a full-screen overlay menu on mobile built as large serif links.
- **Scroll text reveal** for the studio manifesto, words brightening as the user scrolls (search: "text reveal scroll").
- **Hover image list** for sectors and for the Works index: a row of text where hovering a row reveals a floating image that follows the cursor (search: "hover image reveal", "link preview").
- **Marquee / logo cloud** for clients, logos in single-tone grey, slow, pausing on hover (search: "marquee", "logo cloud").
- **Number counter** for the credentials strip (search: "count up", "number ticker").
- **Sticky scroll reveal** for the sector overview: text pinned on the left while images swap on the right.
- **Image gallery / lightbox** with keyboard and swipe navigation, an image counter, and a caption (search: "lightbox", "gallery", "carousel").
- **Magnetic button** and a small custom cursor that expands into "View" over project images (search: "magnetic button", "custom cursor"). Optional; drop it if it feels gimmicky.
- **Footer** with the wordmark set very large, contact details in columns, and a thin top rule.

Avoid from that registry: bento grids, spotlight and aurora backgrounds, meteors, shimmer borders, 3D cards, gradient text, and anything that looks like a SaaS landing page.

## 5. Pages and sections

Build four routes. Keep the same information architecture in the nav: Home, Works, Studio, Contact.

**Home**
1. Hero: full-bleed real aerial photograph with a soft bottom scrim. Bottom-left: "Architecture for institutions that last." set in the display serif over two lines. Bottom-right, small: "Nagpur · Since 1999" and a scroll cue. The K2 mark sits in the nav, not repeated in the hero.
2. Credentials strip: three or four numbers with tabular figures and short labels. 25+ years. 450+ projects. 7 states. 69 works in the portfolio. Separated by hairlines.
3. Selected Works: six to eight projects laid out editorially. Alternate a wide 16:9 image with two stacked 4:5 images. Each has title, sector, city as a small tracked label, and the whole block links to the project.
4. Sectors: an index list of the five sectors with the hover image reveal. Each row has an index number, the sector name in the serif, a one-line description, and an arrow.
5. Studio manifesto: three short sentences set large in the serif with the scroll text reveal. Derive them from the existing About copy.
6. Team: four portraits in 4:5, greyscale by default, colour on hover, name and role beneath. No cards.
7. Clients: heading, then the marquee of logos.
8. Closing statement and footer: "Have a project in mind?" set very large, one primary button "Start a conversation", then the footer.

**Works**
- A page header with the count ("69 projects, 7 sectors") and the filter as a horizontal row of text links with the active one underlined in the accent. On mobile, the filter becomes a horizontal scroll.
- Two views with a toggle: Grid (masonry-ish with fixed ratios, 2–3 columns) and Index (a table of Title / Sector / City / Year-if-known with the hover image preview). Filtering animates with a layout transition; do not blank the container and re-inject.
- Clicking a project opens a full-screen gallery for all its `images`, with a caption of title and location, counter, arrow keys, swipe, Escape, and URL state (`?project=12`) so it can be shared and reloaded.

**Studio**
- Long-form practice story in a two-column editorial layout: a narrow sticky sidebar with the section index, a wide reading column. Sections: Practice, Approach, Sectors, People, Recognition and Clients. Use the existing facts; add pull quotes in the serif.

**Contact**
- Split layout. Left: "Let's talk." in the serif, phone, email, and address as tappable links, office hours. Right: a short form (name, organisation, project type as a select of the sectors, message) posting to a service like Formspree or a mailto fallback. Below, the Google Map embedded with a greyscale filter and a thin border so it belongs to the palette, not a raw 600×450 iframe.

## 6. Technical requirements

- Stack: Astro with React islands, Tailwind CSS with a token file for colours, type scale, and spacing, Motion (framer-motion) for animation, Lenis for scroll. If the client insists on plain HTML, deliver the same design with vanilla CSS custom properties and GSAP; the design must not depend on the framework.
- Static output. Deployable to any shared host or Netlify. No server required.
- Performance budget: LCP under 2.5s on a mid-range phone, CLS 0, total JS under 150KB gzipped, images lazy-loaded below the fold, fonts self-hosted with `font-display: swap` and a size-adjusted fallback.
- Accessibility: WCAG AA contrast, visible focus rings in the accent, full keyboard operation of menu, filters, and gallery, `alt` text on every image derived from title and city, semantic landmarks, one `h1` per page.
- Responsive from 360px to 1920px. The hero type, grid, and gallery must be tested at 375, 768, 1024, and 1440.
- Keep URLs stable where possible (`/projects` can redirect to `/works`).

## 7. Taste rules

- If a decision would make the site look like a SaaS product, a stock template, or a Dribbble shot, make the other decision.
- Fewer elements, larger. One typeface pairing, one accent, one easing curve.
- Whitespace is not empty; it is the frame around the work.
- Let photographs be full-bleed and unadorned. No rounded corners on images, no shadows, no borders unless a hairline.
- Copy is short and specific. "Discover Now" becomes "See the work". "Our Esteemed Clients" becomes "Clients".
- Every hover state should feel like a material response, not a special effect.

## 8. Deliverables

1. A tokens file and a one-page style guide (colours, type scale, spacing, motion) rendered as a route at `/styleguide`.
2. The four routes above, fully responsive, fed from `data/projects.json`.
3. Optimised image pipeline with generated WebP/AVIF and `srcset`.
4. A README explaining how to add a project (edit the JSON, drop images) without touching code.
5. A short written rationale of the art direction, no more than 300 words.

Before you hand over, review the site once more as a critic: open every page at 375px and 1440px, tab through it with the keyboard, scroll it with reduced motion on, and remove anything that does not earn its place.
