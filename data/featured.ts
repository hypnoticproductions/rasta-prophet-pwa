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
  episodeId: "46",
  showDate: "September 6, 2026",
  name: "Do Not Surrender Your Mind",
  honorific: "",
  title: "Wake up, know yourself, study your history — and organise around a righteous future.",
  image: "/backgrounds/renaissance-monument-dakar.jpg",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "Do not surrender your mind, your history, or your power. Give thanks. Stay conscious. Keep the fire burning.",
  intro: [
    "Blessed love, family. This September 6th edition of the Voice of Africa came with a clear trumpet call: wake up, know yourself, study your history, and prepare for a future built on justice, dignity and self-determination.",
    "Rooted in the Ethiopia Africa Black International Congress, the Prophet moved through the responsibilities of the prophet, priest and king, the call to place every person under their own vine and fig tree, and the Rastafari commitment to African consciousness, repatriation and economic liberation.",
  ],
  sections: [
    {
      heading: "Selassie I Against Fascism",
      body: [
        "The broadcast revisited the Italian invasion of Ethiopia and gave thanks for Emperor Haile Selassie I's resistance to fascism — connecting that history to today's debates about power, propaganda, war, borders and the unequal application of international law.",
        "It challenged the language of 'independence' when political systems remain economically dependent, and urged the listeners to look beyond nationality toward ancestry, identity, land and collective responsibility.",
      ],
    },
    {
      heading: "From The Sahel To Haiti",
      body: [
        "The programme turned its lens toward the reported trafficking and exploitation of Africans in Libya, the treatment of Haitian people in the Caribbean, the struggle for Rastafari rights, and the need for prison systems to become places of education and rehabilitation rather than cycles of punishment.",
        "From the Sahel to Haiti to the wider African world, the message was vigilance and constructive self-liberation: support food security, build knowledge, defend human rights, reject manipulation, and organise around a righteous future.",
      ],
    },
  ],
  quotes: [
    {
      text: "Do not surrender your mind, your history, or your power.",
      attribution: "Prophet Alem",
    },
    {
      text: "It is us today. It will be you tomorrow.",
      attribution: "Emperor Haile Selassie I, before the League of Nations",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "Rastafari",
    "KnowThyself",
    "HaileSelassieI",
    "Repatriation",
    "SahelRising",
    "Haiti",
    "FoodSecurity",
    "PanAfrican",
    "SelfLiberation",
  ],
};
