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
  episodeId: "47",
  showDate: "September 13, 2026",
  name: "Freedom, Redemption, Repatriation",
  honorific: "",
  title:
    "Emancipation without economic power is only half a freedom — with compensation.",
  image: "/backgrounds/lalibela-bete-giyorgis.jpg",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "Africa for Africans — those at home and those abroad. Give thanks for the Ethiopian New Year.",
  intro: [
    "Blessed love, family. This September 13th edition opened with prayer, Nyabinghi consciousness and thanksgiving for the Ethiopian New Year — honouring the Prophet, Priest and King order of Rastafari, His Imperial Majesty Emperor Haile Selassie I, King Emmanuel Charles Edwards and the Right Excellent Marcus Mosiah Garvey.",
    "It was a fearless reasoning on freedom, redemption, economic liberation and international repatriation with compensation.",
  ],
  sections: [
    {
      heading: "September 11 — Mount Jimmy & Ras Choco",
      body: [
        "The remembrance ran deep: the raid on the Rastafari camp at Mount Jimmy in Saint Lucia, a tribute to the late Ras Choco and the elders who endured that persecution, and the wider history of state violence against Rastafari across the Caribbean — Coral Gardens in Jamaica, the fight over sacramental cannabis, and the right to wear the turban and headdress.",
        "From that struggle came landmark victories — but the fight for equal rights and justice continues.",
      ],
    },
    {
      heading: "Reparations & Economic Power",
      body: [
        "The British monarchy has acknowledged the horrors of slavery — but stopped short of compensation. Callers reasoned on whether acknowledgment without apology or material repair can ever be justice.",
        "The programme held firm: from the Battle of Adwa to the Sahel, political independence without control of land, production, finance, technology and education is only partial freedom. Build businesses, build knowledge, prepare the youth.",
      ],
    },
  ],
  quotes: [
    {
      text: "Emancipation without economic power remains incomplete.",
      attribution: "Prophet Alem",
    },
    {
      text: "Africa is potentially rich. Our poverty need not cover us with shame.",
      attribution: "Emperor Haile Selassie I",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "Rastafari",
    "EthiopianNewYear",
    "HaileSelassieI",
    "MarcusGarvey",
    "MountJimmy",
    "Reparations",
    "Repatriation",
    "EconomicLiberation",
    "PanAfricanism",
  ],
};
