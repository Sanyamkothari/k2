# Provenance: unverified — do not publish

**These 11 files are not cleared for the website.** Nothing here is referenced by
`data/projects.json` or by any component, and it must stay that way until the
practice confirms it holds the photographs and the right to publish them.

Each file is named after a project in the practice register — the commissions we
have no photograph of. The temptation is to wire them straight in. Three checks
say don't.

## What was checked

**No studio caption.** Every genuine K2 render in `images/` carries the studio's
own caption burnt into the frame — `PROPOSED SCHOOL BUILDING AT KOLKATA`,
`AR. SACHIN KOTHARI  NAGPUR - 09372338880`, or the Panorama Design Studio mark.
Not one of these 11 files carries either.

**Dimensions are web crops, not studio exports.** The studio exports at a
consistent 2400×N or 3600×2400. These are 770×224, 1006×400, 1591×769, 1800×812,
720×480 — website banner and thumbnail shapes.

**EXIF is stripped from all 11,** so the metadata neither confirms nor denies a
source. That is normal for an image served by a website.

## Two findings that settle it

`saraswati_dhanvantari_dental_college_parbhani.jpg` is a 770×224 banner with
another institution's name printed across it: **"Dr. Prafulla Patil Educational &
Hospital Campus"**. Whatever this shows, it is not captioned as Saraswati
Dhanvantari Dental College. Publishing it under that name would put the wrong
building on the page — the same error as the Pusad card, which showed a nursery
school render captioned as an orthopaedic hospital.

`delhi_public_school_rajnandgaon.jpg` carries a **"GPS Map Camera"** watermark,
the badge of a third-party phone app. It is someone's handheld snapshot, not a
photograph commissioned or taken by the practice.

## Why this matters more than a missing photo

Publishing a third-party photograph as the practice's own work risks a copyright
claim, and publishing the wrong building under a project's name is a factual
error a prospective client can catch. A project listed by name alone in the
practice register costs nothing and claims nothing. That is the safer state, and
it is the state the site is in today.

## To clear a file for use

Confirm the practice took or commissioned the photograph and may publish it,
verify it shows the building it is named after, then move it into `images/` and
reference it from `data/projects.json`. The image pipeline picks it up from
there. Delete this directory once every file has been cleared or discarded.
