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
  episodeId: "44",
  showDate: "August 23, 2026",
  name: "Dr. Gilbertha St. Rose & Tesla la Touche",
  honorific: "Special Guests",
  title: "Medical freedom, AI and the new frontier of the fight — who owns your health data?",
  image: "/guests-poster/opengraph-image",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "Health data is the new oil — and whoever owns the information has control.",
  intro: [
    "Blessed love, family. This week the Voice of Africa opened on holy ground and named the propaganda machine plain: the same hand that smeared Haile Selassie I, Marcus Garvey and King Emmanuel Charles Edwards also smeared Idi Amin. Who controls the narrative controls the mind.",
    "Then two mighty guests joined the reasoning — Dr. Gilbertha St. Rose, the doctor this island punished for prescribing ivermectin, and Tesla la Touche, CEO of the Canadian health-innovation company Zymonetics.",
  ],
  sections: [
    {
      heading: "Medical Freedom & The Better Way",
      body: [
        "Since the 1940s, Dr. St. Rose reasoned, the aim has been to denounce natural medicine and make disease a market. The revelation of COVID was that those placed in charge of our health did not, and still do not, have our best interests at heart. The World Council for Health is the better way — and it starts with accountability.",
        "Only about 20% of clinical decisions rest on the highest level of evidence, Tesla explained, and our populations are barely represented in the trials that shape new drugs. So we must organize ourselves a seat at the table — and empower the people to slow down, read the label, and say no.",
      ],
    },
    {
      heading: "Health Data Is The New Oil",
      body: [
        "The newest frontier of the fight is your data. Whoever owns the information has control. They reasoned on AI and who trains it, on genomics and who holds your DNA after the test is done, and on why a Caribbean nation must build its digital-health infrastructure with partners of the region — not hand foreign corporations carte-blanche access to the people's data.",
        "The power of the people is greater than the people in power — but we have to work together. Take back your knowing, and take a stance for it.",
      ],
    },
  ],
  quotes: [
    {
      text: "Health data is the new oil — and whoever owns the information has control.",
      attribution: "The reasoning with Tesla la Touche & Dr. St. Rose",
    },
    {
      text: "The power of the people is greater than the people in power — but we have to work together.",
      attribution: "Tesla la Touche",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "MedicalFreedom",
    "GilberthaStRose",
    "TeslaLaTouche",
    "HealthDataSovereignty",
    "YourDNA",
    "WorldCouncilForHealth",
    "Rastafari",
    "SaintLucia",
    "KnowThyself",
  ],
};
