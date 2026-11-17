# Étienne — Cursor build playbook

**Use this in Agent mode, one prompt at a time.** After each step: `npm run dev`, click through the feature, commit to GitHub.

**Master brief (copy, CTAs, facts):** [master-brief.md](./master-brief.md)  
**Always-on rules for Cursor:** `.cursor/rules/project.mdc`

**Stack for this playbook:** Next.js 15 on Vercel (not WordPress/Webflow). Same outcomes as your spec—lot map, 22 SEO lot pages, CRM, speed, schema—with full control in Cursor. Hosting ≈ managed CDN + SSL via Vercel; domain via Cloudflare or Vercel DNS.

**Repo tip:** Scaffold in a **new folder** (e.g. `etienne-site`) or this repo on a `cursor/nextjs-site` branch so the old static site stays untouched until cutover.

---

## Before you start (~15 min)

| Item | Notes |
|------|--------|
| Tools | Cursor, Node LTS, Git |
| Accounts | GitHub, Vercel, Resend |
| Secrets ready | Follow Up Boss API, Turnstile, Meta CAPI, GA4/GTM/Pixel IDs |
| Assets | Plat PNG/PDF, 22-lot spreadsheet, photos, drone hero MP4, logo, info packet PDF |
| Domain | `etienneatdeercreekmeadows.com` (+ optional short domain redirects in Prompt 13) |
| Phone | `801-864-1655` in `site.ts` |

**Target keywords:** See master-brief.md (e.g. Provo Canyon building lots, gated lots near Sundance, last lots Provo Canyon, Deer Creek Meadows homesites, plus each lot address).

**Build priority** (your order): lot map + lot pages → CRM forms → speed/SEO → tracking → content/ads.

---

## Spec → prompt map

| Your spec | Prompts |
|-----------|---------|
| 1. Foundation (CDN, SSL, CWV, WebP) | 1, 12, 13 |
| 2. Pages | 4–7, 9 (FAQ) |
| 3. Lead capture | 3, 8, 15 |
| 4. SEO | 6, 9, 10, 16 |
| 5. Tracking | 11 |
| 6. Content assets | 17 (folders + placeholders) |
| 7. Traffic (post-launch) | 18 (checklist, not code) |

---

## Prompt 0: Project rules

Already in `.cursor/rules/project.mdc` if you copied it earlier. If not, paste:

```
Create a file at .cursor/rules/project.mdc with alwaysApply: true containing these project rules:

Project: Marketing and lead-generation website for "Étienne at Deer Creek Meadows," a luxury mountain building-lot subdivision in Provo Canyon, Utah, near Sundance Resort. 22 lots remain. Listing broker: Craig, Equity Real Estate.

Goals, in priority order: (1) capture buyer leads, (2) rank #1 on Google for Provo Canyon / Sundance land searches, (3) load fast on mobile.

Stack: Next.js 15 App Router, TypeScript, Tailwind CSS, static generation wherever possible, deployed on Vercel. No unnecessary dependencies.

Rules:
- Every page has a unique title, meta description, one H1, canonical URL, and Open Graph tags.
- All images use next/image, WebP/AVIF, with descriptive alt text.
- Mobile-first design. Lighthouse 95+ for Performance, SEO, Accessibility, and Best Practices.
- Every page includes a visible lead capture call to action.
- Design aesthetic: refined alpine luxury: warm neutrals, deep forest green, stone gray, generous whitespace, elegant serif headings (e.g., Cormorant Garamond) with a clean sans body (e.g., Inter).
- Every page footer shows "Equity Real Estate" brokerage name, license info placeholder, and Equal Housing Opportunity logo (Utah advertising requirement).
- Keep all editable business data (lots, contact info, pricing) in /content or /data files so a non-developer can update it.
```

---

## Prompt 1: Scaffold

```
Scaffold the project in this folder: Next.js 15 (App Router) + TypeScript + Tailwind CSS + ESLint, using src/ directory. Set up next/font with Cormorant Garamond and Inter. Create a tailwind theme with the color palette from docs/master-brief.md (luxury mountain modern: forest green, stone gray, meadow/canyon accents, warm neutrals). Create src/data/site.ts with: broker Craig / Equity Real Estate, phone 801-864-1655, text number, email, office address, license placeholder, developer Scott Lybbert, engineer Berg Engineering, social links, GA4/GTM/Meta/Clarity IDs, Calendly URL, SITE_URL https://www.etienneatdeercreekmeadows.com, acresTotal 221, openSpacePercent 50, gated true. Create .env.example (SITE_URL, Resend, CRM, Turnstile, Meta CAPI). Add docs/inventory-update.md explaining how Craig edits lots.ts and public images without code changes. Initialize git with .gitignore. Confirm npm run dev works.
```

---

## Prompt 2: Lot data

```
Create /data/lots.ts exporting a typed array of 22 lots. Lot type fields: lotNumber, slug (e.g. "lot-7"), address, acreage, squareFeet, price, status ("available" | "under-contract" | "sold"), views (array, e.g. "Mt. Timpanogos", "Deer Creek Reservoir", "Meadow"), slopeDescription, utilities (water, power, sewer/septic, internet), buildableAreaNotes, highlights (3-5 bullets), photos (array of paths), videoUrl (optional), latitude, longitude, mapPolygon (SVG points string for the plat map), platPdfPath.

Fill with realistic placeholder data I will edit later; mark every placeholder with a "TODO" comment. Also export helper functions: getAvailableLots(), getLotBySlug(), lotsRemainingCount(), totalLotCount(), and priceRange().

After this prompt, I will replace placeholders with real lot data.
```

---

## Prompt 3: Global layout and persistent CTAs

```
Build the global layout:
- Header: logo, nav (Lots, Map, Location, Building, Financing, Gallery, FAQ, Contact), and a prominent "Get the Lot Packet" button. Collapses to an accessible mobile menu.
- Sticky mobile bottom bar (visible only on mobile): Call, Text, Schedule Tour buttons using tel: and sms: links from /data/site.ts.
- Sticky desktop "Schedule a Tour" button bottom-right (opens lead modal variant "tour" when built).
- Footer: contact info, quick links, "X of Y lots remaining" live from lots data, Equity Real Estate brokerage name, license placeholder, Equal Housing Opportunity logo, privacy policy link.
- Create a /privacy page with a standard real estate lead-capture privacy policy (TCPA-compliant language for texts/calls).
```

---

## Prompt 4: Home page

```
Build the home page per docs/master-brief.md:
1. Full-screen hero (video or photo): H1 "Last Building Lots in Provo Canyon. Build Your Mountain Home at Étienne at Deer Creek Meadows." Subhead on gated community, permanent open space, Sundance + Provo River. Primary CTA "Schedule a Private Site Tour" (modal variant tour), secondary "View Available Lots" → /lots. Live "Only X lots remaining" badge from lots data.
2. Trust bar: 221 acres · Half open space · Gated · Custom builds.
3. "Why Étienne" + lot types: forest canopy, hillside panorama, meadow (cards linking to filtered /lots).
4. Lifestyle strip: fly fishing (river tunnel), skiing/boating/hiking, four seasons.
5. Featured lots carousel (include example 0.58 ac ~$899,999 Cascade views as editable data).
6. Drive-time strip: Sundance, Provo, Orem, Heber, Park City, SLC, airport (from data).
7. Testimonials / Scott Lybbert + Berg Engineering credibility placeholder.
8. Final CTA + <LeadForm /> placeholder (Prompt 8).

LCP: priority poster with next/image; lazy video. Mobile LCP < 2.5s.
```

---

## Prompt 5: Interactive lot map (priority #1)

```
Build /map: an interactive SVG plat map.
- Render a background plat image (/public/plat/plat.png placeholder) with an overlaid SVG where each lot is a polygon from lots.ts mapPolygon.
- Color by status: available = forest green, under contract = amber, sold = gray. Include a legend.
- Hover (desktop) shows tooltip: lot number, acreage, price, views summary. Tap (mobile) opens a bottom sheet with that info plus "View Lot" and "Ask About This Lot" buttons.
- Filters above map: price range, acreage range, status, views. Filtered-out lots fade.
- List view toggle showing the same lots as sortable cards (price, acreage).
- Fully keyboard accessible with aria labels; fire a dataLayer event map_lot_click when a lot is selected (stub until Prompt 11).

Also add /lots index page using the list view with filters and SEO metadata targeting "Provo Canyon lots for sale" and related terms.
```

---

## Prompt 6: Individual lot pages (priority #1, SEO core)

```
Build dynamic route /lots/[slug] statically generated for all 22 lots:
- H1: "Lot [#] – [acreage] Acres in Provo Canyon near Sundance"
- Unique title/meta targeting long-tail: lot address, acreage, Sundance, Deer Creek, Utah County building lot.
- Photo gallery with lightbox, optional per-lot video (lite YouTube/Vimeo embed, no load until click).
- Key facts table: price, acreage, sq ft, views, slope, utilities, status.
- Highlights bullets and buildable area notes.
- Small map showing this lot highlighted on the plat, plus Google Maps pin (static image linking to Google Maps).
- Downloadable plat PDF (gated: clicking opens lead form modal variant "packet").
- Per-lot inquiry: lead form pre-filled with hidden lotNumber and default message "Interested in Lot [#]".
- "Similar Lots" section (3 nearest in price/acreage).
- Sold lots still render with prominent SOLD, no purchase CTA, links to available lots (keep for SEO).
- Unique generateMetadata and OG image per lot (stub dynamic OG until Prompt 9).
```

---

## Prompt 7: Content pages (+ schedule tour)

```
Create /schedule-tour: high-conversion page with fields from master-brief.md (name, email, phone, contact preference, timeline, lot preferences size/views/budget, message), "Call anytime" + 801-864-1655, lazy Calendly, variant "tour".

Create these pages, each with unique SEO metadata, hero image, rich placeholder copy (500-900 words, luxury buyers, TODO to review), internal links to /lots and /map, and lead form at bottom:

- /location: Sundance, Deer Creek Reservoir, Provo River fishing, skiing, hiking, drive times, schools, amenities.
- /building: approved builders from /data/builders.ts (cards: logo, link, description), design guidelines, CC&Rs and HOA summary with downloadable PDF placeholders, sample home renderings.
- /utilities: water, power, sewer/septic, internet, road access, winter snow removal, Utah County zoning and building permit process.
- /financing: land vs construction loans, preferred lenders from /data/lenders.ts, land loan payment calculator (price, down payment %, rate, term → monthly) with "Get pre-qualified" CTA opening lead modal.
- /gallery: masonry grid, filter by season (spring/summer/fall/winter), lightbox; support drone footage entries as video cards.
- /about: broker bio, Equity Real Estate, photo, credentials, Utah brokerage disclosures.
- /contact: form, phone, text, email, lazy Calendly embed placeholder, map.
```

---

## Prompt 8: Lead capture system (priority #2)

```
Build the complete lead capture system:

1. <LeadForm /> variants: "packet" (default), "tour", "lot-inquiry", "contact". Fields: first name, last name, email, phone, timeline dropdown (0-6 months, 6-12 months, 12+ months, just exploring), optional message. Hidden: variant, lotNumber, page URL, UTM fields (first-party cookie on first visit), referrer. TCPA consent checkbox for calls/texts. Client + server zod validation. Cloudflare Turnstile invisible. Honeypot.

2. POST /api/lead: validate + Turnstile; send to Follow Up Boss Events API via swappable /lib/crm.ts (type Property Inquiry, source "Etienne Website", lot + UTM); Resend notification to broker + branded buyer email (packet variant links /packet/etienne-lot-packet.pdf); redirect client to /thank-you?type=[variant]. If CRM fails, notification email must still send.

3. /thank-you: confirmation, packet download when applicable, lazy Calendly, conversion hook for tracking.

4. LeadFormModal openable from any button with variant and optional lotNumber.

5. Exit-intent: desktop mouse leaves top of viewport; mobile after 45s OR 60% scroll — offer Lot Packet; once per 7 days localStorage; never on /thank-you.

6. Wire header "Get the Lot Packet", mobile Schedule Tour, desktop sticky Schedule Tour, and all page CTAs to modal or inline form.
```

---

## Prompt 9: SEO technical layer

```
Implement full technical SEO:
- generateMetadata on all routes; metadataBase from env SITE_URL; canonicals; Open Graph + Twitter.
- Dynamic OG images per lot via next/og (photo, lot number, acreage, price, Étienne branding).
- JSON-LD: Organization + RealEstateAgent site-wide, Place for subdivision with geo, Product/Offer per lot (price + availability from status), BreadcrumbList on inner pages, FAQPage on /faq.
- app/sitemap.ts for all pages, lots, guides; app/robots.ts with sitemap URL.
- Breadcrumb component on inner pages.
- /faq: 20 buyer Q&As (TODO), accordion accessible — utilities, HOA, build timeline, snow access, financing, builders, taxes, STR rules, Sundance proximity.
- Single H1 per page, logical headings, internal links from FAQ to /utilities, /financing, /lots.
```

---

## Prompt 10: Blog / guides (1–2 posts/month foundation)

```
MDX blog at /guides:
- Posts in /content/guides with frontmatter (title, description, date, author, heroImage, keywords).
- Index + post pages with Article schema, TOC, related lots CTA, lead form end.

Write 5 starter posts (1,200+ words each, TODO to review):
1. Cost to Build a Home in Provo Canyon (2026 Guide)
2. Buying Land Near Sundance: What to Know Before You Buy
3. How Land Loans and Construction Loans Work in Utah
4. Provo Canyon vs. Park City: Where to Build Your Mountain Home
5. Year-Round Access and Living in Provo Canyon

Each links to /map and relevant /lots/[slug] pages.
```

---

## Prompt 11: Tracking

```
Implement tracking per /docs/tracking.md (create the doc as you go):
- GTM via next/script afterInteractive from site.ts; GA4 through GTM.
- dataLayer: generate_lead, packet_download, tour_booked (Calendly postMessage), click_to_call, click_to_text, lot_view, map_lot_click, calculator_used, exit_popup_shown, exit_popup_converted.
- Meta Pixel: PageView, ViewContent on lots, Lead on submit, Schedule on tour; server CAPI in /api/lead with hashed email/phone and shared event_id.
- Google Ads conversion tag placeholder in GTM container notes; LinkedIn Insight Tag (ID in site.ts).
- Microsoft Clarity, deferred until consent.
- Cookie consent banner gating non-essential scripts.
```

---

## Prompt 12: Performance and accessibility (priority #3)

```
Production build + bundle review. next/image everywhere with sizes; priority only on LCP. Lazy-load hero video, Calendly, chat, GTM/Clarity until consent or idle. Fix contrast, focus rings, labels, keyboard on map/modals/bottom sheet. Custom 404 with links to available lots. Report Lighthouse mobile for /, /map, one lot page; fix anything below 95 on Performance, SEO, Accessibility, Best Practices.
```

---

## Prompt 13: Deploy

```
Walk me step by step: new private GitHub repo, Vercel import, all .env vars, custom domain [YOURDOMAIN.com] with www → apex, Resend domain DNS. Add next.config redirects (301) from old site URLs: [PASTE OLD URLS]. Post-launch checklist: Search Console + Bing sitemap, E2E forms, Follow Up Boss, GA4/Meta events.
```

---

## Prompt 14: Final QA

```
Senior SEO + CRO audit vs .cursor/rules/project.mdc: CTA on every page, forms + CRM/email fallbacks, schema tests (list Rich Results URLs), unique titles/descriptions, internal link crawl, single TODO report, 375px mobile, brokerage + Equal Housing on every page. Prioritized fix list, then fix in code.
```

---

## Prompt 15: After-hours chat (spec §3)

```
Add an optional chat widget (Crisp or Intercom-style placeholder) in /components/ChatWidget.tsx:
- Lazy-load only after first user interaction or 10s idle.
- Gated by cookie consent.
- Config: chatProviderId in /data/site.ts (TODO).
- If provider is unset, render nothing.
- Document how to connect a live or AI chat that pushes leads to the same /api/lead endpoint with variant "contact".
```

---

## Prompt 16: Off-page SEO helpers (not backlinks, on-site only)

```
Create /data/seo.ts with primary and secondary keyword arrays and helpers for lot page title/description templates. Add a short /docs/seo-keywords.md listing target phrases, recommended Google Business Profile post ideas, and syndication URLs (LandWatch, Land.com, Zillow) with UTM templates pointing back to the site. No automated posting—documentation only.
```

---

## Prompt 17: Public assets structure (spec §6)

```
Organize /public:
- /plat/plat.png, /plat/README with TODO for replacing from surveyor PDF
- /packet/etienne-lot-packet.pdf placeholder
- /video/hero-loop.mp4 + poster.webp
- /video/lots/README one clip per lot optional
- /images/gallery/{spring,summer,fall,winter}/
- /images/lots/lot-{n}/ placeholders
Document in /docs/assets-checklist.md what Craig must upload (drone, seasons, renderings, 60s brand video).
```

---

## Prompt 18: Post-launch traffic (checklist only)

```
Create /docs/post-launch-marketing.md with checklists (no code):
- Google Ads high-intent land keywords
- Meta/Instagram retargeting + drone creative
- Syndication to LandWatch, Land.com, Zillow, MLS deep links to site
- Monthly email: "only X lots left" + new releases
- Google Business Profile for the subdivision
- Backlink outreach: builders, Sundance chamber, Utah directories
```

---

## Suggested run order (matches your priority)

1. **0 → 1 → 2** — rules, scaffold, data  
2. **5 → 6** — map + lot pages (ship these first)  
3. **3 → 4 → 7** — shell, home, content pages  
4. **8** — leads + CRM (test with Resend + FUB sandbox)  
5. **9 → 12** — SEO + performance  
6. **11** — tracking  
7. **10, 15–17** — content, chat, assets  
8. **13 → 14 → 18** — deploy, QA, marketing checklist  

---

## After each prompt

```bash
npm run dev
# smoke test the pages you touched
git add -A && git commit -m "Describe the prompt you just finished"
```

Replace **22 placeholder lots** in `/data/lots.ts` and **real polygons** on the plat as soon as you have surveyor data—map accuracy is conversion-critical.