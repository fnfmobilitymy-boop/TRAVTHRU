> **Production verification update — 27 October 2026:** Release 84bcb38 was published successfully (workflow 40503161342). HTTPS requests to both travthru.com and www.travthru.com returned the new site. The Chinese root, `/en/` and `/ms/` returned the new gallery with production `index,follow` and self-canonicals under `https://travthru.com/`. Served JS/CSS hashes matched the release build; sample gallery/hero images, robots.txt and sitemap.xml were accessible over HTTPS. No DNS records were edited by the agent. GitHub Pages still reported `https_enforced: false` and no certificate object during this check; the owner must confirm the final Enforce HTTPS setting when available. This supersedes earlier pending-production observations below. Search Console and Google indexing are not verified.

> **Domain migration update:** The owner selected `travthru.com` and Pages currently reports that apex hostname as its configured domain. The production default is now `https://travthru.com/`; CI also supports `www.travthru.com` if the owner selects that hostname later. The existing-domain examples below reflect the earlier www configuration. Current HTTPS checks still returned the legacy site before this change; production cutover and certificate validation remain pending. No DNS records were edited.

> **Publication update — 27 October 2026:** Following explicit owner approval, the three-language site and 20-photo gallery are now published at https://fnfmobilitymy-boop.github.io/TRAVTHRU/ (English `/en/`, Malay `/ms/`). All three URLs returned HTTP 200 without redirecting to the legacy site; served JS/CSS and sample gallery images matched the prepared files. Preview pages use `noindex,follow`. Ten workflow tests and deployment passed in run 40500489730. The owner removed the Pages custom-domain binding; no DNS, billing or Google permissions were changed by the agent. Earlier “local only / not deployed” statements below describe the pre-authorisation audit stage. Production-domain migration and Search Console remain outstanding.

# Basic SEO delivery report — TRAVTHRU

Audit and local verification date: 27 October 2026 (Malaysia).

## Delivery status

**Completed and verified locally:** production build, three static language documents, metadata, canonicals, hreflang, sitemap/robots, local structured-data checks, image optimisation, JavaScript-disabled crawling checks, responsive checks and ten functional regression tests.

**Implemented but not verified on production:** the production-domain delivery until the actual domain serves the new build. The owner authorised publishing on 27 October 2026 after the gallery review. Publication verification is recorded separately below. No DNS, billing, hosting account or Google permissions were changed. The GitHub workflow deploys automatically on a main-branch push, so the deployment is now being prepared under that explicit authorisation.

**Requires owner action:** authorised migration to the existing production domain, inventory/preservation of legacy article URLs, confirmation of business information, Search Console ownership verification, sitemap submission and post-deployment Google testing.

**Not completed / not claimed:** Search Console connection, Google indexing, rankings, Rich Results Test, Schema.org hosted validator results, PageSpeed scores or field Core Web Vitals.

## 1. Scope and initial audit

- Framework: Vite 7, plain JavaScript/CSS, no server framework or TypeScript.
- Original routing: one Chinese HTML document, language selected through `?lang=zh|en|ms` and localStorage; no independently generated English/Malay HTML.
- Current new-site hosting: GitHub Pages under `https://fnfmobilitymy-boop.github.io/TRAVTHRU/`. Vercel configuration also exists but is not evidence of a new Vercel deployment.
- Confirmed existing production domain: **https://www.travthru.com/**. It still serves the legacy site. The owner previously requested retaining this domain; migration has not been performed.
- Important new-site public content: experience, services, fleet, destinations, enquiry and FAQ sections in one document per language. Section fragments are not separate pages and are not placed in the sitemap.
- Initial issues: generic marketing titles; descriptions updated primarily in JavaScript; mixed-language Open Graph; missing `og:url` and sharing image; missing canonical/hreflang; no new-site sitemap; robots allowed crawling but did not identify a sitemap; no business JSON-LD; language selector had no crawlable language links.
- Main document already had one H1, H2 sections and H3 cards. No wholesale heading rewrite was needed. Startup panels/dialog headings are ancillary, not duplicate main H1s.
- Image elements already had alt attributes, including deliberately empty alt for a decorative envelope logo. Meaningful vehicle/gallery imagery uses labelled image roles; most scene backgrounds are decorative.
- `.reveal` content and sticky scenes depended on JavaScript for visibility. With JavaScript unavailable, visitors could encounter blank/hidden sections despite content existing in source.
- Four prominent PNGs totalled 9,799,747 bytes. Decorative motion, local font CSS and the external map remain potential performance costs.

### Read-only production observations

On this audit date, the existing domain returned HTTP 200 for `/`, `/en/`, `/ms/` and `/articles`, with the same legacy title `TravThru | Book Reliable Private Chauffeur & Transfer Service` and the root canonical `https://www.travthru.com/`. These responses do **not** establish that distinct translated pages or article content exist: the old application can return an SPA shell for different paths. `/robots.txt` and `/sitemap.xml` also returned 200; their old contents were not used as proof that this new implementation was live.

The new repository contains no article catalogue or legacy article implementation. Do not erase indexed legacy articles or redirect all unknown URLs to the homepage. Obtain the existing URL inventory before migration.

## 2. Implemented changes

- Build now generates `/index.html`, `/en/index.html` and `/ms/index.html` with translated body content, language attributes and SEO head tags before JavaScript runs.
- Shared translations were extracted into `src/translations.js`; the existing runtime language switch can hydrate translated static documents and still preserve form input.
- Explicit language paths work directly. The legacy query selector remains supported and is normalised to the corresponding language path; saved preferences still work. Query/marketing parameters are excluded from canonical URLs.
- Existing select menu retained; crawlable language anchors added in the footer.
- Exactly one main H1 remains on each language page. Existing content, booking forms, startup animation, vehicle selection, WhatsApp links, map and gesture effects are retained.
- Added one visible, naturally written service overview describing KLIA/KLIA2 transfers, chauffeur services and car rental with a driver in Kuala Lumpur. No new operating city, self-drive rental, ranking, review or guarantee was invented.
- Added descriptive, translated accessibility text for the bronze Alphard illustration. It remains described as an illustration, not proof of actual vehicle inventory/year.
- JS-free styles expose the principal content and remove the otherwise blank cinematic scroll spacing. Normal JavaScript-enabled design and interactions are retained.
- Added per-language canonical, reciprocal hreflang (`zh-CN`, `en`, `ms`) and `x-default` pointing to the Chinese root.
- Open Graph includes title, description, locale, canonical page URL, site name, image, image dimensions and image alt. Twitter card/title/description/image added. Runtime switching updates the relevant metadata.
- Production robots and sitemap are generated from the same canonical URL configuration.
- Added LocalBusiness JSON-LD with verified-source business details and a service catalogue, without ratings, testimonials, opening hours, prices or invented coordinates/social profiles.
- Added an optional real Search Console HTML verification token hook through `GOOGLE_SITE_VERIFICATION`; no token is populated by default.

## 3. Page-by-page metadata and keyword mapping

### Chinese — https://www.travthru.com/

**Title:** 吉隆坡机场接送与私人包车 | TRAVTHRU

**Description:** TRAVTHRU 提供吉隆坡私人包车、KLIA/KLIA2 机场接送、商务出行及定制旅游。探索轿车、豪华 MPV、客运 VAN 与巴士，通过 WhatsApp 咨询行程及报价。

**Topics:** 吉隆坡机场接送、KLIA/KLIA2 机场接送、私人包车、带司机用车。Services anchor `#services`; fleet `#fleet`; enquiry `#booking`.

### English — https://www.travthru.com/en/

**Title:** KLIA Airport Transfer & Private Chauffeur Kuala Lumpur | TRAVTHRU

**Description:** Plan KLIA/KLIA2 airport transfers, private chauffeur services and tailored tours in Kuala Lumpur with TRAVTHRU. Enquire on WhatsApp for a personalised quote.

**Topics:** KLIA Airport Transfer, Kuala Lumpur Airport Transfer, Private Airport Pickup, Chauffeur Service Kuala Lumpur, Car Rental with Driver. Malaysia is business context; no unsupported nationwide service promise was added.

### Bahasa Melayu — https://www.travthru.com/ms/

**Title:** Pemindahan KLIA & Pemandu Peribadi Kuala Lumpur | TRAVTHRU

**Description:** TRAVTHRU menyediakan pemindahan KLIA/KLIA2, pemandu peribadi dan lawatan tersuai di Kuala Lumpur. Hubungi kami melalui WhatsApp untuk sebut harga perjalanan.

**Topics:** pemindahan lapangan terbang KLIA/KLIA2, pemandu peribadi Kuala Lumpur, sewaan kereta bersama pemandu, lawatan tersuai.

These are language versions of the same service homepage, not invented service landing pages. No keyword-stuffed hidden text, meta-keywords or duplicated doorway pages were added.

## 4. Canonical, sitemap, robots and deployment modes

**Production configuration** (default `npm run build`):

- Base: `https://www.travthru.com/` (configurable with `SEO_SITE_URL` for an actual authorised host).
- Three self-canonical documents: root, `/en/`, `/ms/`.
- `dist/sitemap.xml`: valid XML, exactly those three canonical URLs. No fragment, query-string, file-export, test or preview URLs. No made-up modification timestamps, priority or change frequency.
- `dist/robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://www.travthru.com/sitemap.xml`.
- Public pages: `index,follow`; no production noindex found by local checks.

**Demo/preview configuration:** `SEO_DEPLOYMENT=preview` plus `SEO_SITE_URL=https://fnfmobilitymy-boop.github.io/TRAVTHRU/`.

- Three documents use preview self-canonicals and `noindex,follow`.
- Crawling remains allowed so crawlers can read noindex. No preview sitemap is generated or advertised.
- GitHub Actions selects production settings when Pages is bound to `www.travthru.com`, and noindex preview settings when no custom domain is configured. It refuses unknown custom domains. This prevents serving subdirectory assets or preview noindex on the intended production host.
- Do not set preview noindex on the final production project. Do not publish production-domain canonicals on an unrelated live demo.

The production build was restored after testing preview output; the current local `dist` is the production configuration. No `CNAME` file, domain binding, redirects or DNS records were changed.

## 5. Structured data: evidence and validation

Sources: business name and SSM number supplied by owner in this conversation; phone/email/address copied from the existing official website and already displayed on the new website.

- Name: TRAVTHRU Private Chauffeur Enterprise
- SSM identifier: 002334361-T
- Phone: +60107198186
- Email: travethru@gmail.com (original spelling retained)
- Address: Lot 302 Pertama Complex, Jalan Tuanku Abdul Rahman, Chow Kit, 50100 Kuala Lumpur, MY
- Service areas named: Kuala Lumpur and KLIA/KLIA2, consistent with the offered transfers and tours.
- Types: LocalBusiness, PostalAddress, PropertyValue, OfferCatalog, Offer and Service.
- Uses stable business `@id`, real target domain, existing logo and vehicle illustration. Map is an address-search link, not an invented Google Place ID.

**Passed locally:** JSON parsing, exact agreement with configured/visible business details, consistent IDs, expected service catalogue and absence of fabricated `aggregateRating`. This is not government-register verification and is not a claim of Google rich-result eligibility.

**Not verified:** Google Rich Results Test, hosted Schema.org validator, Google Business Profile ownership, precise map pin or coordinates. Owner must reconfirm that the supplied business/contact details are still current.

## 6. Mobile and performance checks

- JS-disabled production documents checked at 390, 768 and 1440 px for each language: no horizontal overflow; major service copy visible.
- Existing mobile/desktop functional suite: 10 tests passed, covering language persistence, date formats, vehicle/van selection, enquiry summaries, WhatsApp URL composition, navigation, welcome planner, close/replay and scroll dismissal.
- Desktop/mobile design preserved; the only new visible SEO additions are a short service overview and footer language links.
- WebP alternatives: hero 2,225,847 → 200,696 bytes; cover 2,292,300 → 193,036; destinations 3,315,389 → 523,080; fleet 1,966,211 → 151,334.
- Combined selected-image transfer size reduced from **9,799,747 to 1,068,146 bytes (89.1%)**. CSS and sharing metadata reference optimised resources. Original PNGs remain for compatibility; this is not an 89.1% reduction of the entire build or guaranteed page speed.
- Preload added for the first covered-vehicle frame; existing lazy loading of payment images/map and reduced-motion support retained.
- Font CSS is still substantial (about 421 KB uncompressed in the checked build); Chinese fonts are split into unicode subsets, and browser font requests vary by content. This was not presented as fully optimised.
- No Lighthouse, PageSpeed Insights or real-user Core Web Vitals score was measured. Google Maps loading and performance depend on external services/network and were not certified.

## 7. Validation commands and results

| Check | Result |
|---|---|
| `npm run build` | PASS; Vite production assets + static SEO documents generated |
| `npm run test:seo` | PASS; all three language documents without JS, metadata, one H1 each, canonicals/hreflang, JSON-LD, local assets, internal hash anchors, three viewport widths; runtime language metadata; sitemap/robots |
| `npm test -- --reporter=line` | PASS; 10 functional tests (8 existing + 2 gallery) |
| Preview-mode build and assertions | PASS; noindex, correct preview canonicals/base paths, no sitemap, crawlable robots |
| Python XML parse of generated sitemap | PASS; 3 canonical entries |
| `node --check` on source JS / build scripts | PASS |
| Python AST parse of localisation script | PASS |
| `git diff --check` | PASS |
| Lint / TypeScript checks | NOT AVAILABLE; repository defines no lint/typecheck scripts or TypeScript project |

An initial regression check flagged the intentionally Chinese `中文` language-link label on the English page. The untranslated-content test now excludes the explicit locale links just as it excludes the locale selector; other untranslated-content checks remain in force. The final full suite passed. The customer-gallery addition also required scoping privacy-dialog assertions to `#info-dialog`, since the site now has a separate photo dialog.

Build prerequisites: Node/npm and Python 3 standard library. SEO tests reuse the existing Playwright dependency and system Chromium (or `CHROMIUM_PATH`). No runtime dependency was added. Pillow was used once to prepare committed WebP alternatives, not required by future builds.

## 8. Owner actions / Search Console readiness

1. Review this working-tree change and explicitly authorise deployment. Do not push main casually: it triggers the existing Pages deployment workflow.
2. Before migrating www.travthru.com, inventory existing indexed routes (including `/articles` and any article detail URLs) using the old sitemap/Search Console/old provider. Preserve valuable content or create specific permanent redirects to genuinely equivalent content. No blanket homepage redirect.
3. Publish the **production** build on the confirmed domain with `/en/` and `/ms/` serving their generated HTML. Keep demo builds noindex. Check DNS/HTTPS/www redirects with the owner separately; nothing was changed here.
4. In Search Console, choose either Domain property `travthru.com` (owner-managed DNS verification covers subdomains/protocols) or URL-prefix property `https://www.travthru.com/`.
5. For URL-prefix HTML-tag verification, obtain the real `google-site-verification` token and set `GOOGLE_SITE_VERIFICATION` on the production build environment, then make an authorised deployment. Alternatively place Google's exact verification HTML file in `public/`. Do not invent a verification token or expose Google account credentials.
6. Owner clicks Verify in Search Console. Only success there establishes ownership; the code hook alone does not connect Search Console.
7. After successful verification and deployment, submit `https://www.travthru.com/sitemap.xml`. Inspect root, `/en/`, `/ms/` using URL Inspection / live test, then request indexing as appropriate.
8. Confirm Google-selected canonicals, crawl/index reports and rendered content. Run Google Rich Results Test / Schema.org validation and PageSpeed Insights against the deployed pages. Monitor real Core Web Vitals when field data becomes available.
9. Keep the footer's existing “original website” link under review: once the same domain serves the new website it points to the same site, not an archived old version. Existing content/link was retained as requested.

## 9. References and limits

Implementation follows Google Search Central principles: descriptive page titles/snippets, separate accessible language URLs, reciprocal hreflang/self-canonicals, crawlable links, JS-independent content, allow crawling for noindex, canonical-only sitemaps and visible truthful business data.

Official references for owner review:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://support.google.com/webmasters/answer/9008080

Attempts to retrieve the localized-versions and canonical documentation in this environment received HTTP 403. The official online validators and documentation revisions were therefore not independently rechecked live. No ranking, traffic, indexing timeline or rich-result guarantee is made.

## 10. Final checklist

- [x] Existing framework/routes/hosting audited.
- [x] Three unique titles/descriptions and translated static HTML.
- [x] Single main H1, meaningful services copy, image accessibility.
- [x] Production canonical/hreflang/OG/Twitter/JSON-LD configured.
- [x] Valid production sitemap and robots generated.
- [x] Preview indexing safeguards implemented and locally checked.
- [x] Mobile, assets, internal anchors and core forms/interactions tested.
- [x] Selected-image optimisation measured; no fabricated scores.
- [x] Search Console integration path prepared, no fake verification.
- [x] No deployment, DNS, billing or Google account changes.
- [ ] Owner confirms business details and legacy URL migration plan.
- [ ] Explicitly authorised deployment and live production verification.
- [ ] Actual Search Console verification and sitemap submission.
- [ ] External structured-data/Google rendering/field-performance verification.

## Subsequent local gallery update

Added 20 owner-supplied transfer/travel photos as a translated circular gallery in the existing homepage (`#real-journeys`), not a new sitemap page. Three review/chat screenshots were kept out of the photo wall. Images include alt text, dimensions, lazy thumbnails and on-demand full views; no synthetic testimonials or review schema added. `CUSTOMER_GALLERY_NOTES.md` records source selection and interaction details. Social links now include only the supplied TikTok, Facebook, Instagram and YouTube accounts; these remain local, undeployed changes.

## Publication authorisation (27 October 2026)

Owner explicitly requested direct publication after reviewing the gallery. GitHub Pages is configured for `www.travthru.com`, but read-only HTTPS checks still returned the legacy website before release. The GitHub demo URL redirected to that custom domain. No DNS change is authorised or performed. Successful Pages publication alone does not prove the customer domain reaches it. Search Console and legacy-URL migration remain owner actions.

## Owner-requested English sharing cards

Sharing metadata (Open Graph/Twitter) is intentionally English in every language version, while SEO titles/descriptions, visible page copy, hreflang and the language selector remain localised. The sharing image is a 1200×630 JPEG of the existing bronze Alphard illustration, about 175 KB, with explicit image MIME type/dimensions and HTTPS URL. Local checks confirm English sharing metadata and image availability; actual WhatsApp cache refresh and the final card layout remain controlled by WhatsApp and are not guaranteed by metadata validation alone.
