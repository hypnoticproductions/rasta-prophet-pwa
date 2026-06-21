import { chromium } from "playwright";

// Map our episodes to their Archive.org detail pages + what we CLAIM about them.
const TARGETS = [
  {
    ep: "15",
    url: "https://archive.org/details/show-1-18-2026-segment-interview",
    expect: ["st. rose", "gilbertha", "gloria", "ivermectin"],
  },
  {
    ep: "33",
    url: "https://archive.org/details/show-5-24-202-full-show",
    expect: ["decaires", "poncho", "cannabis", "marshall", "immanuel"],
  },
  {
    ep: "35",
    url: "https://archive.org/details/show-on-6-7-2026-full-show-001",
    expect: ["comissiong", "caricom", "reparat", "barbados"],
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 verify-bot",
  ignoreHTTPSErrors: true,
});

for (const t of TARGETS) {
  const page = await ctx.newPage();
  let text = "";
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    // Archive renders metadata into the page; grab title + description region.
    await page.waitForTimeout(3000);
    text = (await page.locator("body").innerText()).toLowerCase();
  } catch (e) {
    console.log(`\n=== EP ${t.ep} === ${t.url}\n  ERROR loading: ${e.message}`);
    await page.close();
    continue;
  }

  const title = await page.title();
  console.log(`\n=== EP ${t.ep} === ${t.url}`);
  console.log(`  page title: ${title}`);
  for (const term of t.expect) {
    const found = text.includes(term);
    console.log(`  [${found ? "PASS" : "MISS"}] expects "${term}"`);
  }
  await page.close();
}

await browser.close();
