import { chromium } from "playwright";
import { getAllEpisodes } from "../data/episodes.ts";
import { getPostById } from "../data/posts/index.ts";

const episodes = getAllEpisodes();
const browser = await chromium.launch();
const ctx = await browser.newContext({ ignoreHTTPSErrors: true });

console.log(`\n🔍 AUDITING ${episodes.length} EPISODES — Archive.org vs Our Copy\n`);

for (const ep of episodes) {
  const post = getPostById(ep.id);
  const ourCopy = post?.teaser ?? ep.description;

  // Convert archive_url MP3 to the /details/ page
  const detailsUrl = ep.archive_url
    .replace(/\/download\/([^\/]+)\/.*/, "/details/$1");

  const page = await ctx.newPage();
  let archiveDesc = "";
  let archiveTitle = "";

  try {
    await page.goto(detailsUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);

    archiveTitle = await page.title();
    const descNode = page.locator(".description, [itemprop='description']").first();
    if (await descNode.count()) {
      archiveDesc = await descNode.innerText();
    }
  } catch (e) {
    console.log(`❌ EP ${ep.episode_number} (${ep.id}) — LOAD ERROR: ${e.message.split('\n')[0]}`);
    await page.close();
    continue;
  }

  await page.close();

  // Extract key terms from Archive description
  const archiveLower = (archiveTitle + " " + archiveDesc).toLowerCase();
  const ourLower = ourCopy.toLowerCase();

  // Flag potential drift: our copy mentions a guest name not in Archive description
  const guestMentions = ourLower.match(/\b(dr\.|ambassador|h\.e\.|excellency)\s+[a-z]+/gi) || [];
  let drift = false;
  const driftReasons = [];

  for (const mention of guestMentions) {
    const name = mention.replace(/^(dr\.|ambassador|h\.e\.|excellency)\s+/i, "");
    if (name.length > 2 && !archiveLower.includes(name)) {
      drift = true;
      driftReasons.push(`mentions "${mention}" not found on Archive page`);
    }
  }

  // Check for topic mismatch keywords
  const ourTopics = ourLower.match(/\b(cannabis|ivermectin|reparation|caricom|venezuela|repatriation|who)\b/g) || [];
  for (const topic of ourTopics) {
    if (!archiveLower.includes(topic)) {
      drift = true;
      driftReasons.push(`topic "${topic}" not in Archive description`);
    }
  }

  const status = drift ? "⚠️  DRIFT" : "✅ OK";

  console.log(`${status} EP ${ep.episode_number.toString().padStart(2)} (${ep.id.padStart(2)})`);
  if (drift && driftReasons.length) {
    console.log(`   └─ ${driftReasons[0]}`);
  }
  if (!archiveDesc.trim()) {
    console.log(`   └─ (Archive page has no description text)`);
  }
}

await browser.close();
console.log("\n✅ AUDIT COMPLETE\n");
