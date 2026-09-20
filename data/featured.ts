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
  episodeId: "48",
  showDate: "September 20, 2026",
  name: "Own The Tools",
  honorific: "",
  title:
    "Babylon burning, spiritual emancipation, and the struggle to own the tools of development.",
  image: "/backgrounds/renaissance-monument-dakar.jpg",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "Own the tools. Open the books. Train the youth. Africa for Africans — those at home and those abroad.",
  intro: [
    "Blessed love, family. This September 20th edition opened with thanksgiving for life, the Ethiopia Africa Black International Congress, the Church of Divine Salvation, Four Wings Universal and Blazing 99.3 FM — centering the Rastafari order of the Prophet, Priest and King.",
    "Reverence to His Imperial Majesty Emperor Haile Selassie I, King Emmanuel Charles Edwards and the Right Excellent Marcus Mosiah Garvey — with the call to see yourself and know yourself.",
  ],
  sections: [
    {
      heading: "Free The Mind First",
      body: [
        "The heart of the reasoning: liberation must be spiritual before it can be anything else. Education, political slogans and material success cannot complete emancipation if the mind stays trapped inside inherited colonial ideas.",
        "Examine where your religious concepts came from, how faith has been used to prop up imperial power, and how African ancestral identity can be remembered without disrespecting the good in the sacred texts.",
      ],
    },
    {
      heading: "Own The Tools Of Development",
      body: [
        "From the Sahel to Burkina Faso: why can African nations pay more to build less? Because they rent the machines, the skills and the systems instead of owning them.",
        "The challenge — study Dr. Marimba Ani, watch the rise of smart cities and surveillance, investigate the true history of Sudan, and build. Own the machines, the factories, the roads and the data. Liberation must be spiritual, economic, technological and institutional at once.",
      ],
    },
  ],
  quotes: [
    {
      text: "Own the tools, or stay a customer in your own house.",
      attribution: "Prophet Alem",
    },
    {
      text: "A people without the knowledge of their past history, origin and culture is like a tree without roots.",
      attribution: "Marcus Mosiah Garvey",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "Rastafari",
    "HaileSelassieI",
    "MarcusGarvey",
    "SpiritualEmancipation",
    "AfricanSovereignty",
    "OwnTheTools",
    "BurkinaFaso",
    "EconomicLiberation",
    "PanAfricanism",
  ],
};
