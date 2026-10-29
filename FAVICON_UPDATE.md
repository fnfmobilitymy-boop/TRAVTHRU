# TRAVTHRU favicon update — 29 October 2026

The official header uses `images/travthru-logo-poster.webp` and its supplied
TRAVTHRU / Alphard animation. The existing square artwork in
`images/travthru-icon-512.png` is the final frame of that same branding.

## Change

- Add `public/favicon.png`: 512 × 512, byte-identical to that existing square
  logo. The logo and website were not redesigned.
- Regenerate `public/favicon.ico` from the same image at 16, 32, 48 and 64 pixels.
- Declare both root favicon files explicitly in `index.html` with accurate types
  and sizes. Replace the previous 96px declaration and legacy shortcut syntax.
- Keep the existing matching Apple icon, and point the manifest's 512px entry at
  `favicon.png`. Older matching asset URLs remain available for cached clients.
- Update localisation asset handling so the main Chinese homepage, `/en/` and
  `/ms/` all resolve the same root icons, including subdirectory deployments.

## Verified locally

- Production build: passed.
- Functional suite: 18 tests passed (31.1 seconds).
- Existing SEO regression checker: passed for Chinese, English and Malay;
  titles, descriptions, canonicals, schema and other SEO metadata are unchanged.
- Rendered icon links in all three pages: correct PNG 512 × 512 and ICO URLs.
- Asset HTTP requests on the built local preview: HTTP 200 with PNG content type;
  PNG dimensions/pixels checked and ICO directory contains the four stated sizes.
- Apple icon is available and manifest points to the root 512px PNG.
- Built `robots.txt`: `User-agent: *` and `Allow: /`, with no icon disallow rule.
- Website body markup is byte-for-byte unchanged. Application logic, styling,
  booking forms, animations, contact links and deployment workflow are unchanged.
- Git whitespace check: passed. No lint/typecheck scripts or dependencies added.

## Production URLs and verification limit

- https://travthru.com/favicon.png
- https://travthru.com/favicon.ico
- https://www.travthru.com/favicon.png
- https://www.travthru.com/favicon.ico

The existing GitHub Pages workflow successfully deployed application commit
`68f41fd` (run `40826687716`). The environment network settings were subsequently
published by the owner, resolving the earlier workspace-only access restriction.

## Live production verification completed — 29 October 2026

- Twelve HTTPS requests passed: homepage, English and Malay pages on both
  `travthru.com` and `www.travthru.com`, both favicon files on both hosts, and
  `robots.txt` on both hosts.
- Every final response was HTTP 200. The `www` URLs redirect once to their matching
  non-www production URLs. TLS verification remained enabled.
- Live `favicon.png`: `image/png`, exactly 512 × 512, byte-identical to the official
  square logo used to generate it. Live ICO: `image/vnd.microsoft.icon`, with the
  expected 16/32/48/64-pixel entries. Both files match the deployed local assets.
- All language pages reference `/favicon.png` and `/favicon.ico` correctly; no old
  SVG favicon declaration remains in their rendered HTML.
- Public robots content is `User-agent: *` / `Allow: /`, with no icon disallow.
  Responses had no blocking X-Robots-Tag for these requests.
- Requests using Googlebot and Googlebot-Image user-agent strings succeeded. This
  verifies public access and crawl configuration; it does not claim an actual
  request from Google's crawler infrastructure or a completed Google recrawl.

Actual search-result favicon replacement remains controlled by Google and may
follow a later recrawl; no immediate refresh or ranking outcome is promised.
