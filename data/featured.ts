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
  episodeId: "42",
  showDate: "August 9, 2026",
  name: "Seventy-Five Thousand Dollars For A Son",
  honorific: "",
  title: "The Chakadan Daniel ruling, reparations with repatriation, and the herb still unwritten.",
  image: "/backgrounds/pitons-st-lucia.jpg",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "They do not chop our locks on the street anymore. The war on Rastafari simply became subtle — it moved from the baton to the paperwork.",
  intro: [
    "Blessed love, family. The August 9th broadcast opened the way it always does — in worship — and then turned its face straight into the things this island would rather not discuss.",
    "Prophet Alem set the foundation first: liberate the Black mind, the Black soul, and the man and woman in flesh. Freedom, redemption, international repatriation — and every people under their own vine and fig tree.",
  ],
  sections: [
    {
      heading: "Seventy-Five Thousand Dollars For A Son",
      body: [
        "The Prophet returned to Chakadan Daniel, the young Rastafari man found dead in a police cell in 2013, whose inquest found he had been unlawfully killed. The High Court has now ruled that the State breached his mother's constitutional right to the protection of the law by failing to complete a prompt and effective investigation — and awarded her EC$75,000.",
        "The Prophet called it what he sees: crumbs. He set it against the millions this same court system awards when a man of the establishment has his rights infringed. They do not chop our locks on the street anymore — the war simply moved from the baton to the paperwork, to the delayed file and the judgment that never comes.",
      ],
    },
    {
      heading: "Reparations With Repatriation",
      body: [
        "Full independence is economic independence. We are going to take our resources — it must happen, it will happen, and it is happening. Every nation that profited from slavery owes the Black nation reparations WITH repatriation.",
        "And the Ethiopia Africa Black International Congress does not seek its reparations down here in Babylon. We want our reparations in the land of Africa, so we can build the continent. Plus the call for African studies and Garvey's teachings in the school curriculum — and the reminder that King Emmanuel Charles Edwards raised the banners from the 1930s, before Ghana.",
      ],
    },
  ],
  quotes: [
    {
      text: "We do not seek reparations down here in the Western world. We want our reparations in the land of Africa, so we can help build the continent.",
      attribution: "Prophet Alem, on the EABIC position",
    },
    {
      text: "We need to know where we came from for us to know in what direction we need to go.",
      attribution: "Prophet Alem",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "ChakadanDaniel",
    "JusticeForRastafari",
    "Reparations",
    "Repatriation",
    "MarcusGarvey",
    "KingEmmanuel",
    "AfricanStudies",
    "SaintLucia",
    "Rastafari",
  ],
};
