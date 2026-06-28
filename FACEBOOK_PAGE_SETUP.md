## Finding Your Facebook Page URL

### Option 1: You're the Page Admin
1. Go to your Facebook Page (not your personal profile)
2. Look at the browser address bar
3. Copy the FULL URL — it'll be one of:
   - `https://www.facebook.com/YourCustomName` (if you claimed a username)
   - `https://www.facebook.com/profile.php?id=100012345678` (numeric ID if you haven't hit the like threshold yet)

### Option 2: From the Share Link
The link you gave me (`facebook.com/share/193qZqJoJ3/`) is a specific post. To find the Page:
1. Open that link in a browser
2. Click on the page name at the top of the post
3. You'll land on the Page itself
4. Copy the URL from the browser address bar (that's the Page URL)

### Setting It
Once you have the URL, add it to your deployment:

```bash
# .env.local (for local testing)
NEXT_PUBLIC_FACEBOOK_PAGE_URL=https://www.facebook.com/profile.php?id=YOURPAGEID

# Or in Vercel/Netlify environment variables
```

**The widget works with BOTH formats** — custom name or numeric ID. You don't need to wait for the custom name to activate it.

### Can't Find It? Send Me a Screenshot
If you're stuck, DM me a screenshot of the page (or the full browser URL when you're on your Page) and I'll extract the right URL format.
