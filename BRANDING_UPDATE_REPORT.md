# TRAVTHRU animated brand logos

## Current implementation

The owner clarified that the two brand logos in the navigation and footer are
both to use the supplied finished animation. The owner also requested backgrounds
that blend with the website. This supersedes the earlier hero-only placement and
request for a separate transparent navigation asset.

- Header, desktop and mobile: the old icon and text lockup is replaced by the
  supplied animated TRAVTHRU / Alphard logo, linked to the homepage.
- Footer: the same finished animated logo replaces the old icon and text lockup.
- Hero: the extra video panel from the previous interpretation is removed;
  the original hero composition and mobile height are restored.
- Header and footer brand row use the website's deep green gradient. Screen
  blending integrates the video's black matte into that background without a
  separate rectangular video box. Gold lettering remains legible. The rest of
  the footer retains its existing background.
- No video, logo text or light sweep has been regenerated or redrawn. The complete
  16:9 composition is displayed with `object-fit: contain`, without cropping the
  uppercase **TRAVTHRU** name or distorting its proportions.

## Playback and fallback

Both placements autoplay silently, muted and inline, once when entering view.
They show the final supplied frame after completion or autoplay/media failure.
The footer does not load its video sources before entering view. The two players
reuse the same small media files. No fullscreen loading screen is used.

Reduced-motion visitors receive the final static frame with no video request;
changing to reduced motion stops active players. The supplied source audio has
been removed from both delivery formats. The header's completion drives the
existing welcome planner sequence; the footer never reopens that planner.

## Media

Input: `kling_20261027_Creation_Create_a_5_5850_0.mp4`, 2,559,501 bytes,
1920 × 1080, approximately 5.04 seconds, H.264 / AAC.

| Derived asset | Format | Bytes |
| --- | --- | ---: |
| `public/videos/travthru-logo.mp4` | H.264, fast start, 1280 × 720, no audio | 263,733 |
| `public/videos/travthru-logo.webm` | VP9, 1280 × 720, no audio | 218,435 |
| `public/images/travthru-logo-poster.webp` | Final supplied frame, 1280 × 720 | 51,776 |

Transcoding and proportional resizing are the only transformations to the files.
`preload="none"` and deferred source assignment avoid unnecessary downloads.
The former static icon is still used for the existing envelope, favicon and
manifest; SEO metadata and its logo reference are unchanged.

## Files in this correction

- `index.html`: two animated brand anchors, no extra hero video panel.
- `src/brand-video.js`: shared viewport-triggered once-only controller, one per
  placement; preserve header-ready signal for the welcome planner.
- `src/style.css`: contained logo sizing, green backgrounds and blending;
  restore original hero sizing.
- `tests/brand-video.spec.js`: header playback, footer lazy playback and homepage
  link, absence of extra hero video, MP4 fallback, failed media and reduced motion.
- `tests/welcome.spec.js`: use the header branding selector.
- `BRANDING_UPDATE_REPORT.md`: current implementation and validation record.

The media files, localized path handling and translation guards from the previous
verified release are reused. No dependency, booking endpoint, WhatsApp target,
SEO content, routes, domain/DNS setting or deployment workflow has been changed.

## Verification and release

Verified locally: `npm test` — 16 tests passed (41.2 seconds);
`npm run build` — passed; `node scripts/check-seo.mjs` — passed for all three
languages, metadata, canonical URLs, sitemap/robots, schema and local assets.
JavaScript syntax and Git whitespace checks passed. No lint script or lint
configuration exists in the repository.

Local Chromium screenshots:

- `artifacts/brand-placement-desktop.png`
- `artifacts/brand-placement-tablet.png`
- `artifacts/brand-placement-mobile.png`
- `artifacts/brand-placement-small-mobile.png`
- `artifacts/brand-footer-desktop.png`
- `artifacts/brand-footer-mobile.png`

Screenshots are local and ignored by Git. Desktop/tablet/phone layouts were
inspected at 1440, 768, 390 and 320 pixels, with no horizontal page overflow.
Real-device Safari/iOS testing has not been performed; static fallbacks cover
browser autoplay restrictions. Production verification must follow deployment.

Publication is authorised by the owner's request to publish and subsequent
placement/background corrections. Confirm successful deployment and live assets
before reporting the correction as live.
