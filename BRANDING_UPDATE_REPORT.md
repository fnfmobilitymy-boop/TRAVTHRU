# TRAVTHRU animated branding — current implementation

## Startup experience

The owner clarified that this should feel like a device startup: a fullscreen
video first, followed directly by the website. This supersedes the earlier
contained-card interpretation and non-fullscreen instruction.

- A first visit in a tab displays the supplied TRAVTHRU / Alphard film on a
  fullscreen black background for its approximately 5.04-second duration.
- The underlying website is hidden during startup. Completion reveals the
  homepage directly, without automatically opening the enquiry planner.
- Proportional `contain` sizing preserves the entire uppercase TRAVTHRU name and
  vehicle; portrait phones have black letterboxing rather than cropped content.
- The original sound is retained. Playback attempts audible autoplay; where the
  browser blocks that, it falls back to muted playback and enables sound after
  a trusted interaction while the opening remains visible. Audible autoplay
  cannot be guaranteed on every browser. There is no sound button or prompt.
- Skip, Escape or desktop wheel scrolling closes startup and stops/unloads audio.
  The footer has separate actions to replay startup and open the trip planner.
- Reduced-motion and returning-tab visitors see the website directly. A versioned
  session flag lets existing visitors see this corrected startup once.
- A small early head script prevents the page flashing before the video. Its
  fail-open timer restores page visibility if the main script cannot load.
  Without JavaScript, the website remains visible and crawlable.

## Navigation and footer logos

Both use the supplied finished animated logo instead of the former icon/text
lockup. They play silently once when visible, retain the final static frame and
use no video requests for reduced motion. The footer is deferred until in view.

Deep green backgrounds and screen blending integrate the black matte. The header
trims outer matte and enlarges the display by approximately 27%, retaining the
complete wordmark and vehicle front. PRIVATE CHAUFFEUR & TOURS sits beside it;
phone layouts wrap that descriptor. The footer uses the full 16:9 composition.
No additional hero video panel remains.

The existing welcome envelope, manual trip planner, booking form, WhatsApp links,
three languages, gallery, routes and SEO metadata remain available. The old icon
remains in the envelope, favicon, manifest and existing structured-data reference.

## Supplied media and delivery assets

Input: `kling_20261027_Creation_Create_a_5_5850_0.mp4`, 2,559,501 bytes,
1920 × 1080, approximately 5.04 seconds, H.264 / AAC.
No animation, wordmark or light sweep was regenerated or redrawn.

| Asset | Delivery format | Bytes |
| --- | --- | ---: |
| `public/videos/travthru-logo.mp4` | H.264, fast start, 1280 × 720, no audio | 263,733 |
| `public/videos/travthru-logo.webm` | VP9, 1280 × 720, no audio | 218,435 |
| `public/images/travthru-logo-poster.webp` | Final supplied frame, 1280 × 720 | 51,776 |
| `public/videos/travthru-opening.mp4` | Optimized H.264 with original AAC audio copied from source | 348,110 |

The opening reuses the optimized picture and original audio streams without
regeneration or further re-encoding. All players use `preload="none"`; the opening
source is only assigned when startup is needed. Completion/dismissal releases it.

## Files relevant to the latest startup correction

- `index.html`: early startup visibility guard; fullscreen opening markup reused.
- `src/opening.js`: hide/reveal website and stop media on dismissal/completion.
- `src/welcome.js`: startup goes directly to the site; manual planner remains.
- `src/style.css`: fullscreen black stage, proportional video, discreet skip.
- `tests/opening.spec.js`: fullscreen bounds, media duration, sound interaction,
  direct entry to homepage, no automatic planner, dismissal and replay.
- `tests/welcome.spec.js`, `tests/malay.spec.js`, `tests/brand-video.spec.js`:
  validate the independent planner and versioned startup session behaviour.
- `BRANDING_UPDATE_REPORT.md`: this current delivery record.

## Verification

- Production build: passed.
- Full functional suite: **18 tests passed (30.0 seconds)**.
- Static three-language SEO checker: passed; metadata, canonical URLs,
  sitemap/robots, LocalBusiness data, assets, anchors and layout checks unchanged.
- JavaScript syntax and Git whitespace checks: passed.
- No lint script or lint configuration exists; no lint run is claimed.
- Fullscreen bounds checked at desktop 1440 × 1000 and phone 390 × 844. After
  dismissal, the homepage is visible and the quick planner remains hidden.
- Screenshots: `artifacts/startup-fullscreen-desktop.png` and
  `artifacts/startup-fullscreen-mobile.png` (local and ignored by Git).
- The AAC source has nonzero audio and Chromium confirms unmuted playback after
  interaction. Physical real-device sound output and iOS Safari are not verified.

No dependencies, payment processing, contact destinations, live DNS/domain
settings or deployment workflow were changed. Publication is authorised by the
owner's ongoing request; verify the deployment and live assets before claiming
this correction is live.
