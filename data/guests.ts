/**
 * Guest Registry — SEO landing pages + virality hub
 *
 * Each guest gets a static landing page at /guests/[slug] with:
 *  - Person structured data (JSON-LD) so Google surfaces them by name
 *  - Their episode(s) on the show
 *  - Verified external sources (links out build topical authority + trust)
 *  - A custom Open Graph image so the page shares strong on Facebook
 *
 * IMPORTANT: Every `facts` bullet here is cross-checked against the live
 * Archive.org show page or a cited external source. Do not add unverified
 * claims — this site's credibility is the brand.
 */

export interface GuestSource {
  label: string;
  url: string;
}

export interface Guest {
  slug: string;
  name: string;
  honorific: string; // "Dr.", "His Excellency", "" etc.
  title: string; // one-line role
  image?: string; // /public path; falls back to a heritage image if absent
  heroImage: string; // background image for the landing page
  episodeIds: string[]; // episodes in data/episodes.ts they appear on
  // Short, search-optimized meta description (155 chars-ish).
  metaDescription: string;
  // Punchy lead paragraph for the page + share.
  lead: string;
  // Verified, on-point facts (each defensible from a cited source).
  facts: string[];
  // Search keywords to target.
  keywords: string[];
  // Cited sources (also rendered as outbound links on the page).
  sources: GuestSource[];
}

export const guests: Guest[] = [
  {
    slug: "mary-gilbertha-st-rose",
    name: "Mary Gilbertha St. Rose",
    honorific: "Dr.",
    title:
      "Integrative Doctor, Herbalist & World Council for Health St. Lucia",
    heroImage: "/backgrounds/pitons-st-lucia.jpg",
    episodeIds: ["15"],
    metaDescription:
      "Dr. Mary Gilbertha St. Rose — the St. Lucian doctor who beat the Medical Council in court after they fined her for prescribing Ivermectin — on launching the World Council for Health and exiting the WHO.",
    lead: "The St. Lucian doctor Babylon's medical system tried to silence — and couldn't. Dr. Mary Gilbertha St. Rose turned a license suspension into a courtroom victory, and now she is launching a movement for health autonomy.",
    facts: [
      "Integrative healthcare practitioner, dermatologist and consultant medical herbalist with roughly four decades of experience in Saint Lucia.",
      "Prescribed Ivermectin to COVID-19 patients off-label; the Medical & Dental Council responded with a six-month license suspension and a $10,000 fine in late 2021.",
      "Challenged the ruling through judicial review and won her medical license back in February 2022.",
      "On the January 18, 2026 broadcast she helped launch the World Council for Health (WCH) Country Council in Saint Lucia, alongside Gloria Dorsius of the Freedom Coalition St. Lucia.",
      "Argues that food and botanical medicines are primary, quality-of-life care — not mere 'complementary therapy' — and calls for health autonomy and natural sovereignty over WHO authority.",
    ],
    keywords: [
      "Dr Mary Gilbertha St Rose",
      "Gilbertha St Rose Ivermectin",
      "World Council for Health Saint Lucia",
      "St Lucia medical freedom",
      "exit the WHO",
      "herbalist Saint Lucia",
    ],
    sources: [
      {
        label: "The Voice St. Lucia — St. Rose challenges the Medical & Dental Council",
        url: "https://thevoiceslu.com/2021/12/dr-gilbertha-st-rose-throws-the-gauntlet-at-medical-dental-council/",
      },
      {
        label: "World Council for Health — Meet the Good Doctor",
        url: "https://worldcouncilforhealth.substack.com/p/meet-dr-mary-gilbertha-st-john",
      },
    ],
  },
  {
    slug: "andre-decaires",
    name: 'Andre "Poncho" DeCaires',
    honorific: "",
    title: "Founding Chairman, Cannabis Movement of Saint Lucia",
    image: "/guests/andres-decares.jpg",
    heroImage: "/backgrounds/petit-piton.jpg",
    episodeIds: ["33"],
    metaDescription:
      'Andre "Poncho" DeCaires — the activist who chaired St. Lucia\'s Cannabis Movement for a decade and forced legalization onto the table — on Rastafari sacramental rights, social equity, and protecting local growers.',
    lead: 'For a decade Andre "Poncho" DeCaires refused to let Saint Lucia bury the herb. When legalization finally came, he saw the trap — foreign money moving in while the original growers still face prison.',
    facts: [
      "Founding chairman of the Cannabis Movement of Saint Lucia for roughly a decade, pressing the government on cannabis law reform.",
      "Closely tied to the Iyanola Council for the Advancement of Rastafari (ICAR), framing reform as protecting Rastafari sacramental rights and small farmers.",
      "Publicly accused the government of stalling on reform, clashing with the Minister of Commerce.",
      "Resigned the chairmanship in July 2020 — one day after the government announced it would draft a cannabis legislative framework — to focus on building a growers' Cooperative.",
      "On the May 24, 2026 broadcast he reasoned with Prophet Alem and Dr. Marshall Immanuel on social equity, restorative justice, public health standards, local farmers, ganja tourism, and the danger of an industry built for the haves while original growers stay criminalized.",
    ],
    keywords: [
      "Andre DeCaires",
      "Poncho DeCaires cannabis",
      "Cannabis Movement Saint Lucia",
      "St Lucia ganja legalization",
      "Rastafari sacramental rights",
      "cannabis social equity Caribbean",
    ],
    sources: [
      {
        label: "MBC TV — Andre DeCaires resigns as Cannabis Movement Chair",
        url: "https://news.mbcslu.com/so-long-pancho-andre-decaires-resigns-as-cannabis-movement-chair/",
      },
      {
        label: "Loop — Andre de Caires resigns from Cannabis Movement of St Lucia",
        url: "https://www.loopslu.com/content/andre-de-caires-resigns-cannabis-movement-st-lucia",
      },
      {
        label:
          "Caribbean News Global — Who is high-ranking on cannabis in St Lucia",
        url: "https://caribbeannewsglobal.com/who-is-high-ranking-on-cannabis-in-st-lucia-the-cannabis-chairman-or-the-minister-of-commerce/",
      },
    ],
  },
  {
    slug: "david-comissiong",
    name: "David Comissiong",
    honorific: "His Excellency",
    title:
      "Barbados' Ambassador to CARICOM · Pan-African Warrior",
    image: "/guests/david-comissiong.jpg",
    heroImage: "/backgrounds/renaissance-monument-dakar.jpg",
    episodeIds: ["35"],
    metaDescription:
      "His Excellency David Comissiong — Barbados' Ambassador to CARICOM — on the Lagos-to-Barbados air bridge, Afreximbank's Caribbean push, CARICOM free movement, and the Century of Reparative Justice.",
    lead: "To call him a diplomat is to call the ocean only water. Barbados' Ambassador to CARICOM is using the master's own diplomatic table to set a place for the scattered children of Africa.",
    facts: [
      "Attorney-at-law and Barbados' Ambassador to CARICOM, also serving as non-resident High Commissioner to Saint Lucia and sister islands.",
      "Founder and leader of the Clement Payne Movement and former head of Barbados' Commission for Pan-African Affairs.",
      "Deputy Chairman of the Barbados National Task Force on Reparations and a key figure in the CARICOM Reparations Commission's demand for reparative justice.",
      "Helped launch the direct Air Peace Lagos–Barbados air corridor and championed Afreximbank's Caribbean investment push and CARICOM Full Free Movement.",
      "Interviewed on the June 7, 2026 broadcast on repatriation, compensation, and the reawakening of Global Africa.",
    ],
    keywords: [
      "David Comissiong",
      "Comissiong CARICOM ambassador",
      "Lagos to Barbados flight",
      "CARICOM reparations",
      "Afreximbank Caribbean",
      "Pan-African Barbados",
    ],
    sources: [
      {
        label: "Air Peace launches direct Lagos–Barbados / Caribbean route",
        url: "https://www.caricom.org/",
      },
    ],
  },
];

const guestsBySlug: Record<string, Guest> = Object.fromEntries(
  guests.map((g) => [g.slug, g])
);

export const getGuestBySlug = (slug: string): Guest | undefined =>
  guestsBySlug[slug];

export const getAllGuests = (): Guest[] => guests;

// Guests that appear on a given episode id (for cross-linking from episode pages).
export const getGuestsForEpisode = (episodeId: string): Guest[] =>
  guests.filter((g) => g.episodeIds.includes(episodeId));
