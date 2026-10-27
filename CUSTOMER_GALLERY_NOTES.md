> **Publication update — 27 October 2026:** Following explicit owner approval, the three-language site and 20-photo gallery are now published at https://fnfmobilitymy-boop.github.io/TRAVTHRU/ (English `/en/`, Malay `/ms/`). All three URLs returned HTTP 200 without redirecting to the legacy site; served JS/CSS and sample gallery images matched the prepared files. Preview pages use `noindex,follow`. Ten workflow tests and deployment passed in run 40500489730. The owner removed the Pages custom-domain binding; no DNS, billing or Google permissions were changed by the agent. Earlier “local only / not deployed” statements below describe the pre-authorisation audit stage. Production-domain migration and Search Console remain outstanding.

# Customer journey photo gallery

Local implementation only. Not pushed or deployed; existing SEO/social-link changes remain pending approval.

## Source and selection

- User video: `20261027-1111-03.6442315.mp4`, approximately 7.93 seconds. Used only as a reference for a moving, curved circular photo wall. The reference video/posters are not embedded or redistributed.
- User archive: `iloveimg-compressed.zip`, 23 JPEG images.
- 20 transfer, vehicle, luggage and travel photographs included in the gallery.
- Three screenshots (archive entries 7, 20 and 21, counted from one) excluded from the photo wall: review/chat screenshots are not transfer photographs and may contain personal correspondence. They remain untouched in the uploaded archive; no text, names, ratings or testimonials were extracted.
- Captions describe visible scenes only; no customer names, dates, routes, review scores or endorsement quotations were invented.
- No generative image replacements, face changes or retouching applied. EXIF orientation was normalised and images resized/encoded to WebP for web use; metadata is not copied to the published derivatives.

## Assets and UI

- `public/images/journeys/`: 20 full-view images, 20 lighter thumbnails.
- `src/journey-photos.js`: ordered image manifest with original proportions and Chinese/English/Malay descriptions.
- `#real-journeys`: added between destinations and enquiry, with a footer link.
- Circular perspective layout with lightly curved photo surfaces, automatic slow rotation, hover/focus pause, previous/next buttons, touch/mouse drag and explicit pause/resume.
- Vertical page scrolling remains native (`touch-action: pan-y`).
- Full-photo dialog uses `object-fit: contain` so portraits, groups and wide pictures remain fully visible. Previous/next, keyboard arrows, Escape and a close button supported.
- Rotation stops off screen, when the document is hidden, during interaction and when reduced motion is requested. No-JavaScript HTML retains the real photo thumbnails as a scrollable strip.
- All meaningful images have translated alt text and dimensions; thumbnail images are lazy loaded. Large images load on request. The reference animation is interpreted as a web-native gallery rather than an exact reproduction of a supplied 3D project.

See `tests/gallery.spec.js` for gallery and mobile interaction checks. No payment, booking or contact workflow was changed.
