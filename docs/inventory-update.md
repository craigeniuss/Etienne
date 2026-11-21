# Updating lot inventory (no developer)

## Quick edits

| What | Where |
|------|--------|
| Price, status, acreage, views, photos | `src/data/lots.ts` |
| Phone, email, Calendly, marketing stats | `src/data/site.ts` |
| Plat background image | `public/plat/plat.png` |
| Lot packet PDF | `public/packet/etienne-lot-packet.pdf` |
| Lot photos | `public/images/lots/lot-{number}/` |

## Status values

Use exactly: `available` | `under-contract` | `sold` (maps to Available / Pending / Sold on the site).

## After you edit

1. Save the file.
2. If the site is on Vercel: push to GitHub (or use Vercel deploy) — static pages rebuild automatically.
3. Spot-check **/lots**, **/map**, and one **/lots/lot-X** page.

## Featured example lot

Update the 0.58-acre ~$899,999 Cascade-view example in `lots.ts`; the homepage carousel reads from the same data.

## Need help?

Ask Craig’s web contact or open a Cursor chat: “Update lot 12 to under-contract and price $X in lots.ts.”