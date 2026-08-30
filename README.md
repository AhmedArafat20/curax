# CuraX — Website Build

Vanilla HTML/CSS/JS (no frameworks). GSAP + ScrollTrigger for scroll
animation, Lenis for smooth scroll, Three.js for the hero background,
plus a small set of purpose-built modules (theme switching, lightbox,
portfolio filtering, contact validation).

## Pages

**English:** `index.html`, `about.html`, `services.html`, `work.html`, `contact.html`
**Arabic / RTL:** `ar/index.html`, `ar/about.html`, `ar/services.html`, `ar/work.html`, `ar/contact.html`

Every page's language switcher links to its exact counterpart in the other
language (not just the homepage), in both directions.

## Themes

Two themes, toggled from the nav (desktop and mobile) and persisted in
`localStorage` under the key `curax-theme`:

- **Main** (default) — the dark navy/black premium look with blue + red accents.
- **Light** — the same layout and content, re-themed bright and white-led,
  with the same blue + red accents.

This works by re-pointing the existing `--bg-black / --bg-navy / --bg-navy2`
CSS variables under `[data-theme="light"]` in `css/style.css` — no markup
duplication, no separate light-mode templates. A small inline snippet in
every page's `<head>` reads the saved preference before first paint so
there's no flash of the wrong theme on load.

## Navigation

Modern sticky nav with a blurred/shadowed state on scroll, a `logo.png`
slot (falls back cleanly to the "CuraX" text wordmark if no file exists
yet at `assets/images/logo/logo.png`), the language switcher, the theme
toggle, and the "Start a Project" CTA. The mobile menu is a fullscreen,
staggered, animated overlay with the same language/theme controls.

## Portfolio

8 projects across 5 categories (Websites, Marketing, Software, AI,
Branding) on both `work.html` and `ar/work.html`, plus 2 featured on each
homepage. Each card now has a category badge, a hover overlay with a
"View Project" call-to-action, and clicking anywhere on a card opens a
lightbox (`js/lightbox.js`) with the full image, title, categories and
description — no page reload, no duplicated content in the HTML.

Artwork is custom-built abstract SVG (dark background, blue identity
color, red accent) rather than stock photography, so there's no
third-party licensing risk and everything stays on-brand. Swap in real
project photography later by replacing `assets/images/projects/project-01.svg`
through `project-08.svg` with real files of the same name (update the
`src` extension in `work.html`, `ar/work.html`, and the homepage preview
to match).

## Contact & WhatsApp

- A floating WhatsApp button (bottom corner, pulse animation) appears on
  every page, linking to `https://wa.me/201507404838`.
- The contact form (`contact.html` / `ar/contact.html`) has animated
  floating labels, a focus underline, icon-led contact info rows,
  inline field validation as you type, and distinct loading / success /
  error states — the error state and its "Try again" link are wired up
  in `js/contact.js` behind `window.curaxContactError()`, ready for a
  real backend to call.
- There's still no backend. `js/contact.js` has a clearly marked block
  showing exactly where to add a real `fetch()` call once an endpoint exists.

## Company information

- Email: `curax44@gmail.com` (clickable everywhere)
- Phone: `01507404838` (clickable everywhere)
- WhatsApp: `https://wa.me/201507404838` (derived from the phone number
  with Egypt's country code — update if that's not the right number)
- Every footer and hero mentions coverage across **Egypt and the Gulf**,
  in both languages.
- The brand name "CuraX" is kept in Latin script everywhere, including
  inside Arabic copy (titles, meta tags, body text, footer) — it no
  longer appears transliterated as "كيوركس".

## Team

- **Mustafa Ashraf** — Founder & Managing Director, larger card, listed
  first, "Senior Founder" badge.
- **Ahmed Ayman** — Founder & Managing Director, smaller card, noted as
  working under Mustafa's leadership.

## Stats

Homepage shows two count-up stats: **+100 Projects** and **10 Years of
Experience** (English and Arabic), animated when scrolled into view.

## Animation & motion

- Section-by-section scroll reveals (fade/slide/scale) via GSAP ScrollTrigger.
- Subtle scroll-linked parallax on the hero and on each service's visual panel.
- Hover micro-interactions: magnetic buttons, image zoom/tilt on project
  cards, lift + glow on primary buttons, animated focus underlines on
  form fields.
- A custom cursor (desktop only) that adapts to the active theme.
- Everything respects `prefers-reduced-motion` and is disabled/reduced on
  touch devices where appropriate.

## Typography

Slightly tightened scale for a cleaner, more premium feel (see the
`--fs-*` variables in `css/style.css`). Space Grotesk for display type
and Inter for body text in English; IBM Plex Sans Arabic for Arabic,
with RTL-specific line-height and letter-spacing fixes in `css/rtl.css`
so Arabic script isn't stretched by settings tuned for Latin type.

## Remaining placeholders

Only left as placeholders because no real value was provided:

- `[LOCATION]` — physical address, if any
- `[SOCIAL_INSTAGRAM]`, `[SOCIAL_LINKEDIN]`, `[SOCIAL_BEHANCE]` — social links
- `[CANONICAL_URL]` — once the site has a live domain
- `assets/images/logo/logo.png` — a real logo file (nav + footer already
  reference this path and fall back gracefully until it exists)
- `assets/images/team/mustafa.jpg` and `ahmed.jpg` — real team photos
  (elegant initials placeholders render automatically until these exist)
