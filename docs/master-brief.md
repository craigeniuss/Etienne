# Master brief — Étienne at Deer Creek Meadows

Source of truth for copy, positioning, pages, conversion, and SEO. Implementation: **Next.js 15** per [cursor-build-playbook.md](./cursor-build-playbook.md).

**Live domain (migrate with 301s):** `https://www.etienneatdeercreekmeadows.com/`  
**Phone:** `801-864-1655`  
**Listing broker:** Craig, Equity Real Estate  
**Developer/owner:** Scott Lybbert · **Land planning:** Berg Engineering  

---

## Project brief

Premium, high-converting, SEO-optimized site for an **exclusive gated** mountain community of **custom building lots** in Provo Canyon, Utah. **22 lots remaining** (inventory editable without a developer).

### Goals (priority)

1. Rank for high-intent local and luxury land searches  
2. Capture qualified leads (name, email, phone, lot preferences, timeline, intent)  
3. Convert to **private site tours** and **per-lot inquiries**  

### Positioning & voice

Refined mountain living on **221 acres** (~**half permanently protected open space**, recorded in county records). Gated, private, secure homesites with **protected views** of Cascade Mountain and Wasatch peaks. **Last remaining buildable lots in Provo Canyon.** Bring your own builder; **private pools permitted**; **STR allowed (5-day minimum)**.

**Tone:** confident, elegant, nature-rooted, exclusive but approachable. **Avoid** generic real-estate clichés.

---

## Key facts (feature site-wide)

| Topic | Detail |
|--------|--------|
| Location | Provo Canyon — between Provo/Orem and Heber; ~5 mi Sundance; Deer Creek, Deer Valley, SLC nearby |
| Scale | 221 acres; ~50% permanent open space |
| Access | Gated private entry; HOA community roads; **year-round snow removal** (driveways = owner) |
| River | Private tunnel under highway → Provo River (fly fishing); meadow walking paths |
| Build | Custom only; pools OK; rentals 5-day min; pets OK (dogs on leash in commons; no livestock) |
| Seasons | Wildflower summer, golden aspens fall, snowy peaks winter |
| Schools | Wasatch County School District |
| Inventory | 22 lots remaining — update status/pricing in `/data/lots.ts` |
| Example lot | 0.58 ac ~$899,999, Cascade views (placeholder; make editable) |

### Lot types (marketing categories)

- Forest canopy  
- Hillside panorama  
- Meadow homesite  

---

## Required pages

| Route | Purpose |
|-------|---------|
| `/` | Hero video/photo; headline below; dual CTAs; trust bar; Why Étienne; lot types; lifestyle; featured lots; testimonials placeholder; final CTA |
| `/lots` | Filterable grid + link to map |
| `/map` | Interactive plat; clickable parcels |
| `/lots/[slug]` | 22 lot detail pages — photos, video, plat download (gated), inquiry form |
| `/community` or `/location` | 221 ac, open space, tunnel, paths, four seasons, proximity map |
| `/building` | BYO builder, pools, guidelines, rentals, HOA summary |
| `/schedule-tour` | High-conversion tour form + calendar |
| `/faq` | Accordion; FAQ schema |
| `/about`, `/contact` | Broker/developer, Equity Real Estate, disclosures |
| `/guides` | SEO blog (optional but recommended) |

### Homepage copy (canonical)

- **H1/headline:** “Last Building Lots in Provo Canyon. Build Your Mountain Home at Étienne at Deer Creek Meadows.”  
- **Subhead:** Gated community, protected open space, Sundance + Provo River proximity  
- **Primary CTA:** “Schedule a Private Site Tour”  
- **Secondary CTA:** “View Available Lots”  

### Trust bar (homepage)

221 acres · Half open space · Gated · Custom builds

---

## Lead capture (critical)

| Requirement | Implementation notes |
|-------------|----------------------|
| Placement | Hero, sticky bars, exit-intent, lot pages, 30–45s / scroll depth on mobile |
| Fields (short) | Name, email, phone + 1–2 qualifiers; progressive disclosure later |
| Primary CTA labels | Schedule Private Site Tour · Request Lot Details · Walk the Land With Me · Get Current Pricing & Availability |
| Follow-up | Instant on-screen confirm + email (SMS sequence placeholder) |
| CRM | Webhook-ready `/api/lead` + swappable `/lib/crm.ts` (FUB, HubSpot, Salesforce) |
| Mobile | Click-to-call + SMS prominent |
| Lead magnets | Community map & lot inventory · Provo Canyon custom home guide · Current pricing sheet |
| Urgency (tasteful) | Only 22 lots remaining · Final homesites in Provo Canyon |
| Social proof | Testimonials, lots sold count, developer credibility |
| Spam | Turnstile + honeypot |

**Tour page fields:** Name, email, phone, preferred contact, timeline (ready now / 3–6 mo / exploring), lot preferences (size, views, budget), message. “Call anytime” + phone.

---

## SEO

### Target keywords

Provo Canyon building lots · Étienne at Deer Creek Meadows · gated lots near Sundance · Provo Canyon custom home lots · Deer Creek Meadows homesites · last lots Provo Canyon · building lots near Deer Creek Reservoir · Wasatch County mountain lots

### Technical

RealEstateListing / Product per lot · Place · Organization · FAQPage · BreadcrumbList · sitemap · robots · canonicals · local signals (Wasatch County, Provo Canyon, Heber, Provo)

### Content ideas (guides)

Building a custom home in Provo Canyon · Fly fishing the Provo River · Sundance area living · Wasatch County market updates

---

## Design

**Luxury mountain modern:** stone, wood, meadow greens, canyon blues, warm neutrals. Cormorant Garamond + Inter. Cinematic photography, generous whitespace. Interactive map, smooth motion (respect `prefers-reduced-motion`). Exclusive and trustworthy—not flashy.

**Conversion > pure aesthetics:** every page has one clear next step toward contact or tour.

---

## Admin (broker without dev)

1. Edit **`src/data/lots.ts`** (or `/data/lots.ts`) — price, status, photos paths  
2. Edit **`src/data/site.ts`** — phone, Calendly, scarcity totals  
3. Drop images in **`/public/images/lots/`** and **`/public/plat/`**  
4. Replace **`/public/packet/`** PDFs when pricing changes  
5. See **`/docs/inventory-update.md`** (create at deploy)

---

## Analytics

GA4 + GTM conversion events · heatmaps (Microsoft Clarity) · mobile-optimized forms · SSL via host