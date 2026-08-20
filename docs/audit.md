# GiDieL Landing Page — UI/UX & Competitive Audit

**Date:** August 19, 2026
**Base Product:** GiDieL (local codebase) — cosmetics promotion & brand-activation landing page
**Benchmark:** BASIC/DEPT® (basicagency.com) — award-winning digital branding & product design agency

## Methodology

- **Base Product** was audited directly from source (all components, i18n, CSS, config).
- **Benchmark** — the beauty sites you'd expect (Aesop → 403 bot-block; Glossier / Byredo / Charlotte Tilbury / Rituals → JS SPAs returning no server-rendered text) were unscrapeable. So **BASIC/DEPT®** was used as the primary agency benchmark, supplemented by well-established, widely-documented beauty-aesthetic conventions (Aesop / Byredo / Diptyque-style editorial minimalism). To re-run against a specific URL, paste it and the whole comparison can be regenerated.

---

## 1. Executive Summary

The Base Product is a **clean, competent v1** with good bones: a cohesive warm palette, a real component system (`Section`, `SectionHeader`, reusable cards), full i18n with RTL, and `next/image` throughout.

But it reads as a **"template with motion," not a high-end agency site**, for three structural reasons:

1. **The "editorial serif" is fake.** `globals.css` maps `--font-serif` to Geist — a *sans* font — and `layout.tsx` only loads Geist. Every `font-serif` class silently renders sans. High-end beauty/agency benchmarks build their entire voice on a real display serif.
2. **Proof is decorative, not persuasive.** The "brand marquee" lists fictional names in faint gray; testimonials are 3 text-only cards; there are no client logos, no awards/press, no case-study depth. The benchmark organizes its entire page around *evidence* (agency-of-the-year badges, named clients, deep engagements, press).
3. **Motion is uniform and a bit redundant.** Nearly every element does the same `whileInView` fade-up, and the animated orbs were animated *twice* (CSS keyframes **and** Framer Motion). No video, scroll-progress, pinned sections, or parallax.

Most of the gap is **content/typography/proof strategy**, not architecture.

---

## 2. Key "Winning" Patterns

Prioritized by impact-to-effort.

### P1 — Real display serif (highest impact)
- **Description:** Benchmarks lead with a high-contrast serif for headlines; the sans handles UI. The Base Product declares `font-serif` everywhere but renders Geist, losing the entire editorial/luxury feel.
- **Implementation:** Load a true serif via `next/font` (e.g. Playfair Display, Cormorant, Fraunces), set `--font-serif` to it, remove the `--font-serif: var(--font-geist)` override.

### P2 — "Watch reel" / video hero
- **Description:** BASIC/DEPT opens with a `Watch Reel` CTA and a video timeline, not a static image.
- **Implementation:** Muted, looping `<video>` (or poster + play overlay) in the Hero's right column with `preload="none"`.

### P3 — Evidence-first social proof bar
- **Description:** Named, logo-style clients ("Patagonia · Google · KFC · Wilson · AT&T") instead of a fictional marquee.
- **Implementation:** Convert `BrandMarquee` into a "Trusted by" logo strip (grayscale → color on hover) populated with real names or press/launch badges.

### P4 — Awards / press trust badges
- **Description:** "Design and Branding Agency of the Year", Webby nominations — credentials worn above the fold.
- **Implementation:** Add an awards/press row (e.g. "Agency of the Year", "4× Webby nominee", publication logos), wired to i18n.

### P5 — Deep case studies, not thumbnails
- **Description:** Each engagement has a full narrative ("an eCommerce experience driven by Patagonia's mission") with "Read our full case study". The Base Product's cards go nowhere.
- **Implementation:** `ProjectCard` → `/work/[slug]` detail routes with problem → approach → results (metric, gallery, testimonial, CTA).

### P6 — Scroll-progress + scroll-driven motion
- **Description:** Carousel counters and drag interactions give a sense of place and control; the Base Product has no scroll feedback.
- **Implementation:** Fixed scroll-progress bar (`useScroll` + `scaleX`) and hero/section parallax (`useScroll` + `useTransform`).

### P7 — Counter/interaction micro-UX
- **Description:** "Drag Drag Drag" cues and carousel counters make browsing feel tactile.
- **Implementation:** Convert testimonials to a draggable carousel with dot/index counter.

### P8 — Trust-badge contact / friction reduction
- **Description:** The Base Product has a budget `<select>` + benefits list (good), but lacks "what happens next" microcopy and a low-friction alt channel.
- **Implementation:** Reassurance line under the submit button ("2 business days · no retainer · free 30-min call") + `mailto:`/WhatsApp fallback.

---

## 3. Gap Analysis Matrix

| Dimension | Current Status | Target / Benchmark Standard | Priority |
|---|---|---|---|
| Typography | Geist used for both sans & "serif" — no true serif | High-contrast display serif + sans pairing | **High** |
| Color / palette | Cohesive ink/rose/gold, warm & consistent | Already strong; add more contrast in CTAs | Low |
| Whitespace / layout | Consistent `py-24/32`, grid-based, symmetric | Editorial asymmetry + generous hero whitespace | Med |
| Imagery | Static `next/image`, no video | Video reel, large full-bleed imagery | **High** |
| Hero | Text-led, fade-up reveals | Video/reel + scroll-driven motion | **High** |
| Scroll animation | Uniform `whileInView` fade-up everywhere | Scroll-progress, parallax, pinned sections | Med |
| Micro-interactions | Hover states, card glow, marquee | Custom cursor, drag cues, carousel counters | Med |
| Orbs | Animated twice (CSS keyframes **and** Framer) | Single source of animation + `prefers-reduced-motion` guard | **High** |
| Navigation | Sticky, blurred, anchor links | Add active-section highlight + sticky mobile CTA | Med |
| Mobile menu | Simple max-height accordion | Add focus trap + animated overlay | Low |
| Social proof | Fictional marquee + 3 text testimonials | Named client logos, awards, press, ratings | **High** |
| Case studies | 6 cards, no detail, dead `cursor-pointer` | Deep narrative case studies with results | **High** |
| CTA placement | Good (hero + nav + contact) | Add sticky mobile CTA + "what's next" microcopy | Med |
| Form friction | Budget select + benefits list | Reassurance microcopy, alt contact channel | Med |
| i18n | Full EN/RU/HE + RTL, good | Add loading state (was a blank flash) | **High** |
| Accessibility | `userScalable:false` blocked pinch-zoom | Remove zoom lock; respect `prefers-reduced-motion` | **High** |
| Performance | `next/image`, lazy by default | Add video `preload="none"`, skeleton screens | Med |
| Architecture | Clean, reusable components | Add case-study routes | Med |

---

## 4. Implementation Roadmap

Ordered for maximum visual impact with least risk.

**Step 1 — Typography + proof bar (the 80/20)**
1. Add a real serif (`next/font`), repoint `--font-serif`.
2. Replace the fictional `BrandMarquee` with a "Trusted by" logo/credential strip.
3. Add awards/press badges near the hero.

**Step 2 — Fix what's broken**
4. Remove the duplicate orb animation; add `prefers-reduced-motion` handling.
5. Remove `maximumScale:1 / userScalable:false` from `viewport`.
6. Add a skeleton/loading state for the i18n provider (rendered `null` → blank flash).
7. Fix hardcoded strings (`ServiceCard` "Learn more"; footer `href="#"` placeholders).

**Step 3 — Make proof go deep**
8. Wire `ProjectCard` into case-study detail views.
9. Upgrade testimonials to a carousel with index counter + real attribution.
10. Add a sticky mobile "Start a campaign" CTA.

**Step 4 — Motion polish (last, after content is right)**
11. Scroll-progress bar (`useScroll` + `scaleX`).
12. Hero parallax on the image column.
13. Optional: `Watch reel` video hero with poster + modal.

---

## Implementation Status

Completed in follow-up sessions after this audit:

- ✅ **Step 1** — Real display serif (Playfair Display) + "Trusted by" proof bar with i18n label.
- ✅ **Step 2** — Removed duplicate orb animation + `prefers-reduced-motion` guard; removed zoom lock; fixed i18n blank flash (seeded default dict, no `null` render); fixed hardcoded strings + footer/nav anchor links.
- ✅ **Step 3 (partial)** — `Work` cards now link to 6 statically-generated `/work/[slug]` case-study pages (`generateStaticParams` + `generateMetadata` + `notFound`).

Completed in the current implementation:

- ✅ **Step 3** — Testimonials are now an accessible draggable carousel with keyboard controls, dots, and a slide counter.
- ✅ Added a sticky mobile "Start a campaign" CTA and contact-form reassurance with a direct email fallback.
- ✅ Added server-side validation for required contact-form fields and email format.
- ✅ Enabled Framer Motion's user `prefers-reduced-motion` setting globally.

The only intentionally deferred item is the **video hero (P2)**: the repository contains no campaign video asset, so adding a broken or externally hosted video would reduce reliability. The existing image hero already includes scroll-linked parallax and can accept a local reel later without architectural changes.

---

## Verification update — external benchmark

**Date:** August 20, 2026  
**External URL:** https://gidiel-landi.bolt.host/

### What was verified

- The external URL responds with **HTTP 200** and exposes the title `GiDieL — Cosmetics Promotion & Brand Activation` plus the matching cosmetics-promotion description.
- The external page is client-rendered from the perspective of the available readable-page inspection: its extracted body contains only the document title. Because no rendered section tree, styles, image list, or interactive controls were exposed, an exact pixel/content parity claim against the external runtime would be unreliable.
- The local app was inspected from source and through the local preview. It currently exposes the home page, eight service cards, six linked work cards, six statically generated case studies, three locales (EN/RU/HE), RTL handling, a testimonial carousel, anchored navigation, and a contact endpoint.

### Local issues found and fixed during this verification

- **High — broken translated sections:** keys such as `process.steps.0.title`, `about.pillars.0.title`, and `testimonials.items.0.quote` were rendered literally because the translation resolver rejected array traversal. The resolver now supports numeric array segments, so the process, about, and testimonial content renders correctly.
- **Medium — locale switching race:** switching between locales could leave the previous dictionary visible while a new dictionary loaded, and switching back to the cached default did not explicitly restore its dictionary. Dictionary loading is now cancellation-safe and cached dictionaries are applied immediately.
- **Medium — carousel accessibility:** the testimonial panel now has a labelled `tabpanel`, the dots reference it, and ArrowLeft/ArrowRight work when the panel is focused.

### Remaining product risks

1. **Contact delivery is not production-ready.** `/api/contact` validates input and logs the submission server-side, but it does not send or persist the brief. The success message should not be treated as confirmed delivery until an email/webhook provider is connected.
2. **Trust claims need verification.** “Agency of the Year”, “4× Webby Nominee”, “40+ verified reviews”, `120+` campaigns, `38` brands, and `4.9x` ROI are presented as facts without evidence links. Keep them only if they are true and auditable; otherwise replace them with clearly labelled illustrative copy.
3. **Social links are placeholders.** Instagram and LinkedIn currently point to their generic homepages rather than GiDieL profiles.
4. **Service “Learn more” links all resolve to the same contact anchor.** This is functional, but the label implies service detail pages. Either add service detail routes or change the copy to an explicit contact CTA.
5. **Exact external visual comparison remains pending.** A screenshot set, rendered DOM export, or a directly inspectable local copy of the external runtime is needed to compare spacing, typography, imagery, responsive breakpoints, and interaction parity with confidence.

### Quality checks

- `npm run lint` — passed.
- `npm run build` — passed; home page and all six case-study routes generated successfully.
- Contact API smoke test — invalid payload returns `400`; valid payload returns `200` (with the delivery limitation noted above).

### Prioritized next actions

- **P0:** connect the contact form to a real delivery/persistence provider and change the success state to reflect actual delivery.
- **P1:** replace generic social URLs and substantiate or remove unsupported proof claims.
- **P1:** obtain a rendered external reference (screenshots at desktop/mobile or inspectable DOM) and run the remaining visual parity pass.
- **P2:** decide whether service detail pages are part of the product scope; if not, rename the links to “Discuss this service”.
- **P2:** add a local campaign reel only when a reliable asset and poster are available.
