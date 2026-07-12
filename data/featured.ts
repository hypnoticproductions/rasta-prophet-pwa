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
  episodeId: "39",
  showDate: "July 12, 2026",
  name: "King of Kings, Lord of Lords",
  honorific: "",
  title: "Haile Selassie I — remember your crown. One Day Nearer Home · July 12.",
  image: "/media/cards/king-of-kings.png",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "One day nearer home. Prophet Alem opens on the eternal foundation — Selassie I, King Emmanuel VII — and the truth that African dignity is not given, it is reigned.",
  intro: [
    "Blessed love, family. The July 12th reasoning did not open like entertainment — it opened like a trumpet at the gate: Rastafari, King Emmanuel VII, Selassie I, and the Universal Declaration of Human Rights held up as the standard by which we measure a world that keeps coming up wanting.",
    "Then the fire fell on CARICOM. Saint Lucia's Prime Minister took the chairmanship, the island filled with summits and talking shops — and the mask slipped in one moment: an Al Jazeera correspondent pressed the PM on two Saint Lucian men killed in a U.S. strike at sea, and his microphone was cut.",
  ],
  sections: [
    {
      heading: "The Muzzle",
      body: [
        "Free press silenced behind CARICOM's fancy antics. The Prophet named it plain: don't matter what they tell you about dictators — give them the chance, they'd all love to be one. We saw it during COVID. The Caribbean should not be used as a prop.",
        "Two of our sons — killed, no trial, no charge, no answers. The question that got the mic cut is the one we refuse to drop: does the empire have immunity to kill our citizens in our own sea?",
      ],
    },
    {
      heading: "Fleas on a Dog — and the Sahel Rising",
      body: [
        "To the empire, the whole Caribbean is nothing but fleas on a dog — a giant that scratches when it pleases. But fleas outlive the dog. Across the water the Sahel is rising: Burkina Faso building eight-lane highways while oil-rich Nigeria stays poor, Mali recapturing ground, Africa's gold and uranium as real leverage the Caribbean does not yet hold.",
        "From the CIP passport sellout to supermarket profits and taxes stacked on freight, duty and insurance — the people carry the burden while the birthright is put on sale. No justice, no peace.",
      ],
    },
  ],
  quotes: [
    {
      text: "Don't matter what they tell you about dictators — give them the chance, they'd all love to be one. We saw it during COVID.",
      attribution: "Prophet Alem",
    },
    {
      text: "Freedom, redemption, and international repatriation remain the only points of peace — under our own vine and fig tree.",
      attribution: "Prophet Alem",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "ProphetAlem",
    "TheAnticsExposed",
    "TheyCutTheMic",
    "CARICOM",
    "Reparations",
    "HaileSelassieI",
    "SahelRising",
    "SaintLucia",
  ],
};
