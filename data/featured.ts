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
  episodeId: "38",
  showDate: "July 5, 2026",
  name: "Gilbertha St. Rose",
  honorific: "Dr.",
  title: "Integrative Healthcare Practitioner · Managing Director, Eden Herbs",
  image: "/guests/gilbertha-st-rose.png",
  imageCredit: "Blessed Love Voice of Africa · Radio Program",
  tagline:
    "Still standing. No compromise. The doctor Saint Lucia tried to silence — back on the frequency.",
  intro: [
    "Blessed love, family. The July 5th reasoning did not open like entertainment — it opened like a trumpet at the gate. Honorable Prophet Alem placed the words of Emperor Haile Selassie I before the people and called for a reset of the Black mind, then brought the broadcast home to unfinished business: the persecution of one of Saint Lucia's own.",
    "Dr. Gilbertha St. Rose — integrative healthcare practitioner and Managing Director of Eden Herbs — looked at the same evidence the world is only now debating, made a clinical decision to prescribe ivermectin and educate her patients, and came on this very program to say so. Within the same week, ivermectin was banned on the island, and the machinery turned on her.",
  ],
  sections: [
    {
      heading: "The Charge and the Cost",
      body: [
        "She was suspended, fined $10,000 EC, and her licence revoked. The High Court ordered her reinstatement — a partial victory — yet in April 2026 the Saint Lucia Medical and Dental Council sent a fresh letter, still pursuing the charge. On an island where money is not easy to find, the fine still stands.",
        "The medicine they banned is now studied around the world, even as a cancer treatment. The questions she was punished for asking are the questions the world is finally asking out loud.",
      ],
    },
    {
      heading: "No Complicity, No Compromise",
      body: [
        "She called into the show herself, without shame — the one who has been persecuted, standing firm. She named it plainly: no complicity, no compromise. A time will come, she warned, when they will answer for the atrocities that have been done.",
        "Prophet Alem closed where he began — on knowledge, love and understanding, and the type of education we give the youth. Not Babylon's curriculum. The education that begins with the truth, however expensive the truth turns out to be. Great health is great wealth.",
      ],
    },
  ],
  quotes: [
    {
      text: "The one that has been persecuted... No complicity, no compromise. A time will come when they will deal with the atrocities that they have done.",
      attribution: "Dr. Gilbertha St. Rose, live on Blessed Love Voice of Africa",
    },
    {
      text: "It's all about the type of education we give this youth.",
      attribution: "Prophet Alem, on the charge of Haile Selassie I",
    },
  ],
  hashtags: [
    "BlessedLoveVoiceOfAfrica",
    "GilberthaStRose",
    "StillStanding",
    "NoCompromise",
    "MedicalFreedom",
    "Ivermectin",
    "HealthIsWealth",
    "SaintLucia",
    "Rastafari",
  ],
};
