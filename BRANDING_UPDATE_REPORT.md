# TRAVTHRU supplied logo animation update

## Status

Implemented and verified locally. The owner has authorised publication of this
version with the existing navigation and footer logos retained. The full static-logo
replacement is pending the owner's transparent SVG, PNG or WebP of the new logo.
The supplied MP4 has a black background and is not a transparent navigation logo.
No logo or animation was regenerated or redrawn.

## Placement audit

| Placement | Existing implementation | Result |
| --- | --- | --- |
| Header / desktop navigation | `index.html` shared brand anchor, `logo-mark.png` and uppercase wordmark | Existing static brand retained pending transparent new asset |
| Mobile navigation | Same header brand anchor; collapsible navigation | Same pending asset; narrow-screen sizing checked |
| Homepage opening | Full-screen `#brand-intro` and progress animation | Removed; no full-screen loading screen |
| Homepage hero | `.hero-model` branding area | Supplied film embedded within this area with complete 16:9 composition |
| Booking envelope | Existing static `logo-mark.png` | Retained pending transparent asset; booking functionality retained |
| Footer | Shared brand markup with `logo-mark.png` | Retained pending transparent new asset |
| Favicon / manifest / LocalBusiness logo reference | Existing SVG/PNG assets | Unchanged; no SEO metadata changes |

## Media and behaviour

Input: `kling_20261027_Creation_Create_a_5_5850_0.mp4`, 2,559,501 bytes,
1920 × 1080, approximately 5.04 seconds, H.264 with AAC audio.

Derived delivery assets preserve the supplied frames, timing, black background,
gold uppercase **TRAVTHRU** typography and golden sweep. Transcoding and resizing
were the only video transformations; no crop, redesign, generation or overlays.

| Asset | Purpose | Bytes |
| --- | --- | ---: |
| `public/videos/travthru-logo.mp4` | H.264 1280 × 720, fast-start, no audio | 263,733 |
| `public/videos/travthru-logo.webm` | VP9 1280 × 720, no audio | 218,435 |
| `public/images/travthru-logo-poster.webp` | Final supplied frame, 1280 × 720 | 51776 |

The hero video has `autoplay`, `muted`, `playsinline` and `preload="none"`,
without looping. Sources are assigned only when the branding area enters view.
WebM is preferred, with MP4 as the alternative. Completion displays the final
static frame and releases the media source. Autoplay refusal, media error or an
eight-second loading/playback timeout uses the same static fallback. The film
never restarts on scrolling, language changes or reopening the trip planner.

With `prefers-reduced-motion: reduce`, no video sources are assigned and no film
is downloaded. Switching to reduced motion during playback stops it. With
JavaScript disabled, the static image remains available. `object-fit: contain`
preserves the complete company name and car without changing their proportions.

The existing envelope and trip planner follow completion/fallback, remain
dismissible by scrolling, close button or Escape, and reopen from the footer.
The former “Replay intro” action now reads “Open trip planner” in all three
languages. A bounded wait prevents media loading from blocking the planner.

## Changed files

- `index.html`: replace the full-screen intro with inline hero media and fallback;
  retain existing normal static logos pending the correct asset.
- `src/brand-video.js`: viewport-triggered once-only playback and fallback handling.
- `src/main.js`: initialise hero branding and pass completion to the planner.
- `src/welcome.js`: retain the planner/envelope without a full-screen intro.
- `src/style.css`: responsive contained media and small-phone spacing.
- `src/translations.js`, `src/ms.js`: logo alternative text and planner action.
- `src/i18n.js`: ignore empty reverse translations and whitespace-only nodes;
  prevents missing translations from rendering stray text in whitespace nodes.
- `scripts/localize.py`: preserve correct video/poster paths for localized and
  subdirectory builds.
- Three derived media files listed above.
- `tests/brand-video.spec.js`: playback, completion, reduced-motion, media-failure
  and MP4-alternative coverage.
- `tests/welcome.spec.js`: verify the planner sequence with inline branding.
- `BRANDING_UPDATE_REPORT.md`: this delivery record.

## Verification

- Production build: `npm run build` — passed.
- Functional suite: `npm test` — 15 tests passed (44.1 seconds).
- SEO regression check: `node scripts/check-seo.mjs`, covering all three static
  language pages, metadata, canonical URLs, sitemap, robots, assets and schema — passed.
- Syntax checks: `node --check` for changed application JavaScript;
  Python parser validates `scripts/localize.py`.
- No lint script or lint configuration exists in this repository. No lint run
  is claimed and no dependency was added for this change.
- Responsive inspections: Chinese, English and Malay at 320, 390, 768 and 1440 px;
  no horizontal page overflow in the checked layouts. Screenshots inspected in
  desktop Chromium, with reduced motion to show the final frame consistently.
- Functional tests include booking summaries, WhatsApp links, mobile navigation,
  fleet selection, language switching, gallery and welcome planner interactions.
- Screenshots: `artifacts/logo-desktop.png`, `artifacts/logo-tablet.png`,
  `artifacts/logo-mobile.png`, `artifacts/logo-mobile-small.png` (local, ignored
  by Git). Header/footer still display the previous static logo in these previews.

No dependencies, booking endpoint, WhatsApp destination, SEO copy, pages,
domain/DNS configuration or deployment workflow were changed.

## Pending / not verified

- Owner must supply a matching **transparent** static logo before normal-logo
  replacements can be completed. The black video poster is used only inside the
  black hero media area, never substituted into navigation or footer logos.
- Production playback and real-device Safari/iOS/Android testing have not been
  performed; browser checks use local Chromium. Autoplay policy can vary by
  browser settings, which is why the static fallback is always present.
- Publication was authorised after local verification. Confirm the release workflow
  and live assets before reporting production deployment as complete.
