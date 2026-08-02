/**
 * Featured Guest Spotlight
 * Highlights the special guest for the current week's show.
 * The `episodeId` links to an entry in data/episodes.ts so the
 * spotlight player controls the same audio as the archive.
 */

export interface FeaturedQuote {
  text: string;
  attribution: string;
}

export interface FeaturedSection {
  heading: string;
  body: string[];
}

export interface FeaturedGuest {
  episodeId: string;
  showDate: string;
  name: string;
  honorific: string;
  title: string;
  image: string;
  imageCredit: string;
  tagline: string;
  intro: string[];
  sections: FeaturedSection[];
  quotes: FeaturedQuote[];
  hashtags: string[];
}

export const featuredGuest: FeaturedGuest = {
  episodeId: "41",
  showDate: "August 2, 2026",
  name: "Tamunokuro Iyo Obietonbara",
  honorific: "Special Guest",
  title: "Nigerian Historian · Author of \"Rebirthing the African Consciousness\" · Founder, AfriSankofa360",
  image: "/guest-poster/opengraph-image",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "Emancipation Day — but are we free? The shackle came off the feet in 1834; the chain was re-strategized onto the mind.",
  intro: [
    "Blessed love, family. On the sacred weekend of August 1st — Emancipation Day — the Honorable Prophet Alem opened the Voice of Africa with a hard truth: the shackle came off our feet in 1834, but the chain was re-strategized onto our minds.",
    "Then the Prophet welcomed a mighty guest: Tamunokuro Iyo Obietonbara, a Nigerian historian who calls himself a child of Africa — and he brought the blueprint.",
  ],
  sections: [
    {
      heading: "Follow The Money Of Abolition",
      body: [
        "Britain paid £20 million to the slave owners — a debt its own taxpayers only finished settling in 2015 — while the enslaved received nothing. Emancipation was compensation for the masters, not justice for the people.",
        "From the land of Saint Lucia sold from under our feet to the slow-walking of the herb, the Prophet showed how false independence, divide-and-rule and mental slavery still hold the Caribbean in bondage.",
      ],
    },
    {
      heading: "The Theft Of Your VIPs",
      body: [
        "Colonization was never just about land and resources, the guest teaches — it was about stealing a people's VIPs: their Values, their Interests, their Principles. Even when you think you have liberated yourself, as long as you live by the colonizer's values, you will always end up serving his interest.",
        "He held up China as the mirror: after their century of humiliation they purged the foreign programming and rebuilt on their authentic identity — the very work Africa and her diaspora have yet to finish. Decolonize even the image of God. The Sahel has already cracked the code.",
      ],
    },
  ],
  quotes: [
    {
      text: "Even when you think you've liberated yourself, as long as you live by the colonizer's values, you will always end up serving his interest.",
      attribution: "Tamunokuro Iyo Obietonbara",
    },
    {
      text: "The shackle came off our feet in 1834 — but the chain was re-strategized onto our minds.",
      attribution: "Prophet Alem, Emancipation Day",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "EmancipationDay",
    "MentalSlavery",
    "DecolonizeYourMind",
    "Tamunokuro",
    "PanAfrican",
    "Rastafari",
    "MarcusGarvey",
    "KnowThyself",
    "SahelRising",
  ],
};
