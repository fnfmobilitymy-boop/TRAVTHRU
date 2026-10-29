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

Publication uses the repository's existing GitHub Pages workflow; its outcome is
reported separately at delivery. The icon paths are configured to permit Google
crawling, but a fresh public-site HTTP/Googlebot fetch could not be completed from
this workspace: its enforced network allowlist rejects the website hostnames
(proxy refusal before an origin HTTP response). This is not evidence of the
website returning 403 or blocking Google. The environment's existing network
settings draft lists both hostnames but is not active in this runtime.

Do not treat local HTTP success or a successful deployment as an observed Google
crawl. Actual search-result favicon replacement remains controlled by Google and
may follow a later recrawl; no immediate refresh or ranking outcome is promised.
