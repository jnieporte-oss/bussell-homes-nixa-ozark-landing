# Bussell Homes — Nixa & Ozark Landing Page

A responsive, conversion-focused landing page for **Forest Heights in Nixa** and **Valley Ridge in Ozark**, built with React and Vite.

## Page highlights

The page uses authentic Bussell Homes branding and photography, one consistent **Get Homes & Pricing** conversion goal, a live Bussell HubSpot inquiry form, current featured inventory, community comparison content, buyer benefits, model-home information, FAQs, equal-housing identification, and full legal notices.

| Area | Implementation |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Custom responsive CSS; no UI framework |
| Lead capture | Live HubSpot form for portal `242740896`, form `57378aca-cdbf-47ed-adf8-177c604dd531` |
| Communities | Forest Heights · Nixa and Valley Ridge · Ozark |
| Primary CTA | Get Homes & Pricing |
| Secondary CTA | Call a Home Advisor / Schedule a Tour |
| Accessibility | Automated desktop and mobile audit with zero detected violations |
| Responsive QA | Desktop 1440×1000 and mobile 390×844 |

## Run locally

```bash
pnpm install
pnpm run dev
```

Open the local URL shown by Vite. The configured development port is **4173**.

## Production build

```bash
pnpm run build
pnpm run check
pnpm run preview
```

The production-ready static output is generated in `dist/`. Deploy that directory to a static host, or deploy the source project through Vercel, Netlify, Cloudflare Pages, or another Vite-compatible provider.

## Content and integration notes

The live HubSpot script is loaded from `https://js-na2.hsforms.net/forms/embed/v2.js`. It can take several seconds to initialize on slower networks, so the page includes a secure-form loading state and a readiness poll. The form preserves HubSpot's original fields, consent control, and submission behavior. Consent is **unchecked by default**.

Featured prices and availability were verified on **August 26, 2026** from Bussell Homes' published inventory. Because inventory changes, update the `homes` array in `src/App.jsx` before a future campaign launch and revise the visible verification date in the inventory and legal notices.

The page uses the current Bussell phone number, email address, privacy policy, inventory page, floor-plan page, community LotVue maps, and Nixa model-home directions.

## Quality checks

```bash
node qa/playwright-check.mjs
node qa/accessibility-check.mjs
```

The QA scripts use the installed system Chromium path `/usr/bin/chromium`. If running on another computer, update `executablePath` in the scripts or install a compatible Playwright browser.

| Check | Result |
|---|---|
| Production build | Pass |
| JavaScript type check | Pass |
| Local asset references | 14 checked, 0 missing |
| Desktop accessibility | 0 detected violations |
| Mobile accessibility | 0 detected violations |
| Inventory filter | Pass |
| Mobile menu | Pass |
| Primary CTA scroll | Pass |
| HubSpot form presence | Pass |
| Horizontal document overflow | None |

## Project structure

```text
bussell-landing/
├── public/assets/       Authentic Bussell images and brand marks
├── qa/                  Automated QA scripts, results, and screenshots
├── src/App.jsx          Page content, data, and components
├── src/styles.css       Complete responsive visual system
├── src/main.jsx         React entry point
├── index.html           Metadata and font loading
├── package.json         Scripts and dependencies
└── vite.config.js       Vite configuration
```

## Recommended launch checklist

Before publishing, confirm live availability and prices, validate the HubSpot form submission in Bussell's production CRM, add the final campaign analytics or advertising pixels if required, connect the final domain, and run the two QA scripts once more against the deployed URL.
