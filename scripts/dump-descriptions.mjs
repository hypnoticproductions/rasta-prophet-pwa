import { chromium } from "playwright";

const URLS = {
  "15": "https://archive.org/details/show-1-18-2026-segment-interview",
  "35": "https://archive.org/details/show-on-6-7-2026-full-show-001",
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ ignoreHTTPSErrors: true });

for (const [ep, url] of Object.entries(URLS)) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(3000);
  // The description sits in the metadata area.
  let desc = "";
  const sel = await page.locator(".description, [itemprop='description']").first();
  if (await sel.count()) desc = await sel.innerText();
  console.log(`\n===== EP ${ep} :: ${url} =====`);
  console.log(desc.trim() || "(no .description node found)");
  await page.close();
}
await browser.close();
