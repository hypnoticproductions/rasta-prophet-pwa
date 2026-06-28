# Rasta Prophet PWA — Agent Handoff Instructions

## Your Job
You are the agent responsible for keeping the Rasta Prophet podcast site up to date.
Your primary weekly task is **adding the latest show episode** to the site so it appears on the live Vercel deployment.

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| **Site** | https://rasta-prophet-ql4qf38qy-hypnotic-productions-projects.vercel.app/ |
| **GitHub Repo** | hypnoticproductions/rasta-prophet-pwa |
| **Working Branch** | `claude/react-to-html-conversion-KVqgz` |
| **Framework** | Next.js 14 (React + TypeScript) |
| **Deployment** | Vercel — auto-deploys on every push to the branch above |
| **Episode Data File** | `/data/episodes.ts` ← the ONLY file you edit for new shows |
| **Artist Name** | Rodneil Theodore / Prophet Alem |

---

## 2. Before You Start — Ask the User

**Always prompt the user for the following before making any changes:**

```
I'm ready to add today's show to the Rasta Prophet site.
Please provide:
1. The date of the show (e.g. "June 7, 2026")
2. The Archive.org MP3 link (e.g. https://archive.org/download/...)
3. Are there multiple segments? If yes, please share all links.
```

Do not guess or fabricate any MP3 links. Wait for the user to provide them.

---

## 3. How to Add a New Episode

### Step 1 — Read the current episode file

```bash
# Always read the file first to find the last episode number and id
```

Read `/data/episodes.ts` and note:
- The **last `id`** (e.g. `"34"`) → your new episode will be `"35"`
- The **last `episode_number`** → increment by 1
- The **last date block comment** → add yours after it

### Step 2 — Edit `/data/episodes.ts`

Find the closing `];` at the bottom of the episodes array and insert your new episode(s) **before** it.

**Template for a single full show:**
```typescript
  // <Month> <Day>, <Year> Episodes
  {
    id: "<next_id>",
    episode_number: <next_number>,
    title: "Blessed Love Voice of Africa Show - <Month> <Day>, <Year>",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "<EXACT_MP3_URL_FROM_USER>",
    published_date: "<YYYY-MM-DD>"
  }
```

**Template for a show with multiple segments:**
```typescript
  // <Month> <Day>, <Year> Episodes
  {
    id: "<next_id>",
    episode_number: <next_number>,
    title: "Blessed Love Voice of Africa Show - <Month> <Day>, <Year>",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "<SEGMENT_1_MP3_URL>",
    published_date: "<YYYY-MM-DD>"
  },
  {
    id: "<next_id_plus_1>",
    episode_number: <next_number_plus_1>,
    title: "Blessed Love Voice of Africa Show - <Month> <Day>, <Year> Segment 2",
    description: "SEGMENT TWO: Continuation of today's powerful message and teachings.",
    archive_url: "<SEGMENT_2_MP3_URL>",
    published_date: "<YYYY-MM-DD>"
  }
```

### Step 3 — Commit and Push

```bash
git add data/episodes.ts
git commit -m "Add <Month> <Day>, <Year> episode to the show"
git push -u origin claude/react-to-html-conversion-KVqgz
```

If push fails with **"no upstream branch"**, run:
```bash
git push -u origin claude/react-to-html-conversion-KVqgz
```

If push fails with **"fetch first"** (remote has new commits), run:
```bash
git pull --rebase origin claude/react-to-html-conversion-KVqgz
git push
```

---

## 4. Rules — Never Break These

| Rule | Detail |
|------|--------|
| **Never delete episodes** | Only append new episodes at the bottom of the array |
| **Never edit existing `archive_url` values** | Unless the user explicitly says the link is wrong |
| **Never fabricate MP3 links** | Always use the exact URL provided by the user |
| **Always use the correct branch** | `claude/react-to-html-conversion-KVqgz` |
| **Never push to main/master** | Only push to the branch above |
| **Always increment id and episode_number** | Read the file first to get the current last values |

---

## 5. Fixing a Wrong MP3 Link

If the user says the link was wrong, find the episode by its `id` or title and update **only** the `archive_url` field:

```bash
# After editing:
git add data/episodes.ts
git commit -m "Fix <Month> <Day>, <Year> episode audio link"
git push
```

---

## 6. Vercel Deployment

- Vercel **automatically rebuilds** on every push — no manual deploy needed.
- After pushing, tell the user: *"Changes pushed — Vercel will rebuild in ~1-2 minutes."*
- The new episode will appear at the **top of "The Archive of Wisdom"** section on the site.

---

## 7. Full Current Episode List (as of May 31, 2026)

| # | Date | Notes |
|---|------|-------|
| 1-5 | Dec 21, 2025 | Segments 1-5 |
| 6-8 | Dec 28, 2025 | Segments 1-3 |
| 9-11 | Jan 4, 2026 | Venezuela segments |
| 12-13 | Jan 11, 2026 | Caribbean Under Siege |
| 14-16 | Jan 18, 2026 | Interview + Black Star |
| 17-18 | Jan 25, 2026 | Full show (2 segments) |
| 19-20 | Feb 1, 2026 | Full show (2 segments) |
| 21 | Feb 8, 2026 | Full show |
| 22 | Feb 22, 2026 | Full show |
| 23 | Mar 8, 2026 | Full show |
| 24 | Mar 15, 2026 | Full show |
| 25 | Mar 22, 2026 | Full show |
| 26 | Mar 29, 2026 | Full show |
| 27 | Apr 12, 2026 | Full show (FIX link) |
| 28 | Apr 19, 2026 | Full show |
| 29 | Apr 26, 2026 | Full show |
| 30 | May 3, 2026 | Full show |
| 31 | May 10, 2026 | Full show |
| 32 | May 17, 2026 | Full show |
| 33 | May 24, 2026 | Full show |
| 34 | May 31, 2026 | Full show ← **LAST ADDED** |

**Next episode will be id `"35"`, episode_number `35`.**

---

## 8. Site Features (Do Not Break)

- **Particle canvas animation** — reacts to playback state
- **Seek bar** — real scrubber with gold fill (not decorative)
- **±15s skip buttons** — rewind and fast-forward
- **Share button** — on every episode card and in the footer player
- **Deep links** — `?ep=<id>` auto-selects and scrolls to a shared show
- **Lion emoji favicon** — 🦁
- **Artist name in footer** — "Rodneil Theodore / Prophet Alem"
- **Loading screen** — Blazin logo with "Reasoning Imminent..."
- **Background image** — Cloudinary hosted prophet image

---

## 9. Example Full Workflow

```
User: "Here is today's show June 7th 2026: https://archive.org/download/show-6-7-2026/show.mp3"

Agent steps:
1. Read /data/episodes.ts → confirm last id is "34", last episode_number is 34
2. Append episode id "35", episode_number 35, published_date "2026-06-07"
3. git add data/episodes.ts
4. git commit -m "Add June 7, 2026 episode to the show"
5. git push -u origin claude/react-to-html-conversion-KVqgz
6. Tell user: "✅ June 7, 2026 episode added! Episode #35. Vercel will rebuild in ~1-2 minutes."
```
