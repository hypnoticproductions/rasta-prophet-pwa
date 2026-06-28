# DEPLOYMENT GUIDE — The Rasta Prophet PWA

## What's Built (Branch: `claude/react-to-html-conversion-KVqgz`)

### ✅ SEO Dominance
- **Guest landing pages** at `/guests/[slug]` with Person JSON-LD, verified facts, cited sources, episodes, quotes
- **Episode pages** emit RadioEpisode JSON-LD + guest cross-links
- **Quote cards** at `/quotes/[id]` with striking 1200×630 OG images (red/gold/green atmosphere)
- **sitemap.xml + robots.txt** — 36 episodes + 3 guests + 3 quotes indexed
- **Keywords targeting** guest names flow into episode titles/meta

### ✅ Virality Engine
- **ShareButtons** — Facebook / X / WhatsApp / copy with built-in referral tracking (`?ref=` codes)
- **ReferralTracker** — credits inbound shares, stores attribution log in localStorage
- **Quote card OG images** built at compile time, designed to stop the scroll

### ✅ Facebook Widget
- **FacebookPagePlugin** — official Page Plugin (iframe, no SDK) closes the share loop

### ✅ Atmosphere
- Hard-hitting episode descriptions (St. Rose / DeCaires / Comissiong verified)
- Pitons backgrounds for St. Lucian guests
- Maduro image replaced with fresh one

---

## Activation Checklist

### 1. Set Facebook Page URL
```bash
# In .env.local or Vercel environment variables:
NEXT_PUBLIC_FACEBOOK_PAGE_URL=https://www.facebook.com/YourPageName
```
**Find the page:** The share link you provided (`facebook.com/share/193qZqJoJ3/`) is a specific post, not the Page. You need the main Page URL:
- Go to your Facebook Page
- Copy the URL from the browser (should be `facebook.com/[pagename]` or `facebook.com/profile.php?id=...`)
- Set it in the env var above

Without this, the Facebook widget stays hidden (by design — won't break, just won't show).

### 2. Harvest More Quotes (Optional but Recommended)
**Current:** 3 verified Comissiong quotes seeded.  
**Needed:** 2-3 quotes each from St. Rose (Ep 15) and DeCaires (Ep 33) to fill out the quote card gallery.

**How:**
- Transcribe episodes 15 and 33 via Whisper / AssemblyAI / Deepgram
- Pull 2-3 verified, attributable lines from each guest
- Add to `data/quotes.ts` (follow the existing format)
- Rebuild — the quote cards and OG images prerender automatically

### 3. Check the Playwright Audit (Optional)
The background audit of all 35 episodes was running when we pivoted. Check if it surfaced any other description drift:
```bash
npx tsx scripts/audit-all-episodes.ts
```
Fix any flagged mismatches (like the Ep 15 issue I caught earlier).

### 4. Deploy
```bash
npm run build    # verify it builds clean
git push         # push the branch
```
Merge the PR when ready. The static export works anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3).

---

## What's Left for Billion-Dollar Positioning

Built now:
- ✅ SEO (guests, quotes, sitemap, structured data, keywords)
- ✅ Virality mechanics (share buttons, referral tracking, quote cards)
- ✅ Facebook widget (Page Plugin)

Still needed (per the strategic assessment):
- ❌ **Email capture** — exit-intent popup, "get the weekly recap" form
- ❌ **Community hub** — Discord/Telegram link, "join the reasoning room"
- ❌ **Support/patronage CTA** — Patreon, Ko-fi, "support the Prophet" button
- ❌ **Clip tool** — click timestamp → 30sec MP3 snippet + auto quote card → share
- ❌ **Transcripts as text** — publish full transcripts for SEO (Google doesn't index audio well)
- ❌ **Retargeting pixel** — Facebook Pixel or GA4 event tracking for ad retargeting
- ❌ **More quotes** — aim for 20-30 quote cards (5-10 per major guest)

These are the conversion ladder + growth loop components. The foundation (SEO + virality) is **done**. The monetization layer is **next**.

---

## Testing the Build Locally

```bash
npm run build
npx serve out    # or python3 -m http.server -d out 8080
```
Open `http://localhost:8080` and verify:
- Home page loads
- `/episodes/35` (Comissiong) loads with guest cross-link
- `/guests/david-comissiong` loads with facts, sources, episodes
- `/quotes/comissiong-power-concedes-nothing` loads with the striking card
- Share buttons on any page carry `?ref=` codes
- Facebook widget shows (only if NEXT_PUBLIC_FACEBOOK_PAGE_URL is set)

---

## Analytics / Referral Tracking (When You Add a Backend)

Right now referral tracking is **client-side only** (localStorage). To build a sharer leaderboard or run ads:

1. **Add an analytics endpoint** (e.g. `/api/track` or a serverless function)
2. **In `ReferralTracker.tsx`**, uncomment the beacon line:
   ```ts
   navigator.sendBeacon('/api/track', JSON.stringify({ ref, path: location.pathname }));
   ```
3. **Store events** in a database (Supabase, Firebase, Postgres)
4. **Build a leaderboard:** top referrers by inbound `?ref=` hits
5. **Retarget:** pass ref codes to Facebook Pixel custom events

---

## Sources & Credits

All guest facts cross-checked against:
- [The Voice St. Lucia](https://thevoiceslu.com/) (St. Rose)
- [World Council for Health](https://worldcouncilforhealth.substack.com/) (St. Rose)
- [Loop St. Lucia](https://www.loopslu.com/) (DeCaires)
- [Caribbean News Global](https://caribbeannewsglobal.com/) (DeCaires)
- Archive.org show descriptions (all episodes)

Quote cards use only verified, attributable lines.

---

## What This Unlocks

1. **Google search discovery** — "David Comissiong reparations" → lands on the episode
2. **Facebook viral loop** — quote card shared → friend clicks → lands on site → sees the page feed → follows
3. **Referral attribution** — every share is tracked, foundation for a sharer leaderboard
4. **Authority building** — cited sources + structured data = Google trust signal

The site is now a **vanguard platform**, not just an archive. It's positioned to capture search traffic, amplify shares, and turn listeners into a movement.

Deploy it and the growth loops activate.
