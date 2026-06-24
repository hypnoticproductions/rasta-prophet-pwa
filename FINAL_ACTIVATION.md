# FINAL ACTIVATION — Facebook Widget Is Ready

## ✅ Your Facebook Page URL (Confirmed)
```
https://www.facebook.com/profile.php?id=61591141769585
```

## Activate the Widget on Deployment

### If Deploying to Vercel:
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - **Name:** `NEXT_PUBLIC_FACEBOOK_PAGE_URL`
   - **Value:** `https://www.facebook.com/profile.php?id=61591141769585`
   - **Scope:** Production, Preview, Development (check all)
4. Redeploy

### If Deploying to Netlify:
1. Site settings → Environment variables
2. Add:
   - **Key:** `NEXT_PUBLIC_FACEBOOK_PAGE_URL`
   - **Value:** `https://www.facebook.com/profile.php?id=61591141769585`
3. Redeploy

### If Deploying Anywhere Else:
Set the environment variable `NEXT_PUBLIC_FACEBOOK_PAGE_URL` to your Page URL before running `npm run build`.

---

## What the Widget Does

Once activated, the **FacebookPagePlugin** component renders on:
- All guest pages (`/guests/david-comissiong`, etc.)
- All quote card pages (`/quotes/comissiong-power-concedes-nothing`, etc.)
- All episode pages (after the share buttons)

It shows:
- Your Page's recent posts (timeline)
- The number of people who like your Page
- A **Follow** button
- Profile pictures of people who like your Page

**The Loop:**
1. Someone shares a quote card to Facebook
2. Their friend clicks it → lands on your site
3. They see the Facebook widget with your live feed
4. They click Follow **without ever leaving your site**
5. They're now in your audience for all future posts

---

## Test It Locally

```bash
# Set the env var (terminal session only, not committed)
export NEXT_PUBLIC_FACEBOOK_PAGE_URL="https://www.facebook.com/profile.php?id=61591141769585"

# Build
npm run build

# Serve locally
npx serve out

# Open http://localhost:3000/guests/david-comissiong
# Scroll down — you should see the Facebook Page feed embedded
```

---

## When You Get 25+ Likes (Custom Username)

Once your Page hits the threshold for a custom username:
1. Go to Page Settings → "Create @username"
2. Claim a custom name (e.g., `@TheRastaProphet`)
3. Your URL becomes `https://www.facebook.com/TheRastaProphet`
4. Update the environment variable to the new URL

**Both formats work** — you don't need to wait for the custom name to activate the widget now.

---

## What's Live on the Branch

✅ Guest pages with SEO (St. Rose, DeCaires, Comissiong)  
✅ Quote cards with dramatic OG images  
✅ ShareButtons with referral tracking  
✅ Facebook widget (ready, just needs the env var set on deployment)  
✅ sitemap.xml + robots.txt  
✅ Hard-hitting verified episode descriptions  

**Deploy the branch → set the env var → widget goes live.**
