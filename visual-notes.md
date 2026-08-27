# Visual Asset Assessment

The **Forest Heights aerial** is a wide 2500×1406 frame that clearly communicates an established neighborhood, ponds, active construction, and the rolling Ozarks setting. It has strong horizontal depth and tolerates a dark evergreen overlay. The upper-left and upper-center areas are visually quieter than the central streets, making it suitable as the main hero background with left-aligned white copy and a right-side form card.

The **Valley Ridge aerial** is a 2560×1917 drone image showing homes, new construction, open green land, and a broad Ozarks horizon. It is strongest as a portrait-friendly community card or split-image section because its 4:3 crop preserves both neighborhood and landscape context. The top sky and upper-left pasture provide safe space for a small location label, but not for dense hero copy without cropping.

The hero will therefore use Forest Heights as the full-bleed background while prominently naming both **Nixa and Ozark**. Valley Ridge will receive equal prominence immediately below the fold in the two-community selector and again in the side-by-side comparison. This avoids an artificial photo composite while retaining authenticity.

## First desktop browser QA

The desktop hero renders with strong contrast, balanced asymmetric layout, clear Nixa/Ozark positioning, and an above-the-fold CTA. The four trust stats remain visible in the initial viewport. Navigation, typography, imagery, and all primary CTA controls render without runtime-console errors. The external HubSpot form had not completed loading at the first screenshot, so its network/load timing requires a second validation pass and a resilient timeout fallback.

The HubSpot form loads successfully and exposes the expected first name, last name, email, phone, buying timeline, Realtor status, SMS consent, and submit fields. No runtime errors are present and there is no horizontal overflow at 1280 px. However, the default HubSpot one-column layout expands the lead card to roughly 1,257 px and the hero to roughly 1,447 px. The form should be restyled into a compact two-column desktop grid (with single-column mobile fallback) so the complete hero remains visually focused. Off-screen lazy-loaded images appeared as not yet complete during the initial DOM audit; they require validation after scrolling, not treatment as broken files.

After the compact-grid styling update, the page reload remained visually stable and retained its intended initial 900 px hero while the external HubSpot script was loading. The embed’s initialization time is variable in the sandbox, so the loading skeleton is serving its intended purpose. A final wait-and-measure pass is still needed to confirm the compact grid once the third-party script finishes.

The delayed embed is not caused by a JavaScript error: the HubSpot global and forms API are present, but the external `embed/v2.js` resource took approximately 11.3 seconds in the sandbox. The loading target retained only its skeleton because the original one-time load callback could be missed or delayed during hot reload. The component should poll briefly for API readiness and retry form creation once, which will make initialization resilient to cached scripts and slow third-party load timing.

The production-equivalent runtime initializes the HubSpot form reliably and the compact field grid works for name, email, phone, timeline, and Realtor status. The consent checkbox is wrapped in its own direct `fieldset.form-columns-1` with an inner `.hs_sms_opt_in` field, so the prior rule targeting `.legal-consent-container` did not span it across both grid columns. Hidden UTM fieldsets also exist as direct children. The correction is to span `fieldset:has(.hs_sms_opt_in)` across the full grid and hide direct fieldsets containing hidden UTM fields, leaving the submit button full width.

The corrected desktop form now renders exactly once. All five hidden UTM fieldsets are removed from layout, the consent field spans both columns, and the form card is approximately 758 px tall inside a 948 px hero. At 1280×1100 there is no horizontal overflow, the trust bar begins within the first viewport, and the final hero maintains a strong side-by-side hierarchy.

The interactive browser environment keeps a fixed 1280×1100 viewport and ignores `window.resizeTo`, so mobile validation must use a dedicated headless Chromium viewport rather than relying on in-page resizing.

## Independent viewport captures

The 1440×1000 desktop capture confirms the final hero is polished and balanced: the headline, value ranges, primary and secondary CTAs, live form, privacy text, navigation, and start of the trust bar all fit in one viewport. The form fields are compact and readable, and the actual Bussell aerial remains visible without competing with the copy.

The 390×844 mobile capture confirms a clean mobile-first stack: logo and menu are clear, the full benefit-led headline remains readable, all four home-range facts fit, the primary CTA is above the fold, and the fixed Call / Get Homes & Pricing bar is visible. The embedded lead form follows immediately below the hero copy and can be reached from the primary CTA. The fixed bar overlays only the bottom edge of the secondary button at this top scroll position, which is acceptable because it repeats the same two actions; the page reserves 62 px of body padding to prevent footer content from being covered.

## Full-page desktop tile review — first capture

Tile 1 confirms the full hero, live form, trust bar, and community-section heading are visually strong and properly spaced. Tile 2 is largely blank where the community cards should appear. This is not a page layout failure; it is a full-page screenshot artifact caused by scroll-reveal elements remaining at `opacity: 0` after the automated scroll returned to the top. The QA script must explicitly add the `visible` class to reveal elements and wait for lazy-loaded images before taking the full-page captures, then regenerate all tiles for reliable section-by-section inspection.

## Corrected full-page desktop review — tiles 1–2

Tile 1 verifies a complete, high-contrast hero with all critical conversion elements visible, followed cleanly by the four-part trust bar and the community introduction. Tile 2 verifies both community cards render with authentic imagery, parallel content weight, clear phase badges, and functional live-map paths. The transition into the available-homes section is visually distinct, and the first row of Forest Heights inventory cards is consistent in image ratio, pricing hierarchy, address legibility, and CTA treatment. No clipping or unexplained gaps are visible across the overlap.

## Corrected full-page desktop review — tiles 3–4

Tile 3 verifies all three Valley Ridge cards align with the Forest Heights row, the inventory disclaimer and source link remain readable, and the transition into the three lifestyle reasons uses clear visual contrast and balanced card heights. Tile 4 confirms the dark split new-home-advantage section maintains strong image-to-copy balance, all six benefit items are legible, the primary CTA has sufficient contrast, and the overlap into the Why Bussell grid is seamless. No text collision, image distortion, or spacing discontinuity is visible.

## Corrected full-page desktop review — tiles 5–6

Tile 5 verifies the asymmetric Why Bussell section balances a sticky narrative column, authentic BBB proof, and eight concise value cards without excessive density. The comparison-table introduction and first rows are readable and clearly differentiate the two paths. Tile 6 confirms the comparison table completes without truncation, the model-home visit block uses a strong 50/50 image and information treatment, the address/hours/phone are easy to scan, and the FAQ section begins with a clear hierarchy. The overlap boundary is clean and the lifestyle photo is not distorted.

## Corrected full-page desktop review — tile 7

The final desktop tile verifies the FAQ list completes cleanly, the Valley Ridge aerial anchors a strong final conversion block, the repeated Get Homes & Pricing and phone CTAs remain visually dominant, and the footer includes contact paths, helpful links, equal-housing mark, all five legal notices, and community identification. The page closes without overlap, blank space, or a broken visual boundary. Desktop full-page visual QA is complete.

## Corrected full-page mobile review — tiles 1–2

Tile 1 verifies the mobile hero hierarchy, prominent primary CTA, secondary phone CTA, hamburger control, and persistent two-action conversion bar. The lead form begins immediately after the hero and stacks cleanly at the narrow breakpoint. Tile 2 confirms the remaining form fields, unchecked consent control, full-width submit button, disclosure text, two-column trust-stat grid, community introduction, and Forest Heights card entry all render without clipping or horizontal document overflow. The fixed conversion bar remains readable and repeats—not replaces—the core actions.

## Corrected full-page mobile review — tiles 3–4

Tile 3 verifies both community cards stack with clear phase labels, location overlays, concise benefits, and separated detail/map actions. Tile 4 confirms the three inventory filters fit within one row at 390 px and the Forest Heights home cards preserve consistent photography, pricing prominence, address hierarchy, and tap-friendly detail CTAs. Images remain sharp and card edges stay within the viewport.

## Corrected full-page mobile review — tiles 5–6

Tile 5 verifies the remaining Forest Heights and Valley Ridge cards retain consistent spacing and readable pricing at the narrow breakpoint. Tile 6 confirms the final inventory card, timestamped pricing disclaimer, source inventory link, buyer-reason introduction, and first two reason cards remain clear and conversion focused. The longer mobile page rhythm is intentional, with sufficient separation between inventory and lifestyle messaging.

## Corrected full-page mobile review — tiles 7–8

Tile 7 confirms the third buyer-reason card and the image-led entry into the new-home advantage section scale cleanly, with readable overlay text and an effective shift to the dark benefit panel. Tile 8 verifies all remaining benefit rows, the full-width comparison CTA, the Why Bussell narrative, the BBB proof strip, and the start of the value-card sequence remain well spaced and legible. No section loses its intended contrast or hierarchy on mobile.

## Corrected full-page mobile review — tiles 9–10

Tile 9 verifies all eight Why Bussell value cards stack uniformly and the comparison introduction remains concise. Tile 10 confirms the comparison is intentionally contained in a horizontal scroll region—the document itself remains 390 px wide—while the leading comparison columns stay readable. The model-home image, tagline overlay, location details, operating hours, phone number, and tour action stack cleanly beneath the table.

## Corrected full-page mobile review — tiles 11–12

Tile 11 verifies the model-home action buttons, FAQ introduction, expanded first answer, remaining accordion rows, and transition into the final CTA all render cleanly with appropriate tap spacing. Tile 12 confirms the final aerial CTA, repeated lead and phone actions, reassurance copy, contact details, helpful links, equal-housing mark, legal disclosures, copyright, and community labels remain readable through the page close. Footer content ends above the reserved mobile fixed-bar space. Mobile full-page visual QA is complete across all 12 tiles.

## Final automated QA

The final production build and JavaScript type check both pass. Automated accessibility testing reports **zero detected violations** at 1440×1000 desktop and 390×844 mobile breakpoints, with 52 and 53 rule groups passing respectively. The mobile comparison region is keyboard focusable, the fixed mobile actions are contained in a labeled landmark, the decorative reason numbers meet contrast requirements, consent remains unchecked by default, and no local image asset is broken. Automated interaction checks confirm the Valley Ridge inventory filter returns three cards, the mobile menu opens, and the primary mobile CTA scrolls the live lead form into view. External production links resolve successfully; the exact Google Fonts stylesheet and HubSpot embed script return HTTP 200.

## Final preview approval

The refreshed desktop preview shows the complete hero, authentic aerial, live two-column HubSpot form, primary and secondary CTAs, full navigation, trust transition, and privacy disclosure in a cohesive single viewport. The refreshed mobile preview preserves headline impact, all four decision facts, the above-the-fold primary CTA, phone alternative, menu control, and persistent two-action bar without horizontal clipping. Both previews are approved for handoff.
