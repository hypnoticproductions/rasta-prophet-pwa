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
  episodeId: "43",
  showDate: "August 16, 2026",
  name: "No Saviour Is Coming From The Sky",
  honorific: "",
  title: "Honouring the Right Excellent Marcus Mosiah Garvey — born August 17, 1887.",
  image: "/media/cards/king-of-kings.png",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "The voice of the people is the voice of God. The strength of the people is the strength of God. See yourself. Know yourself.",
  intro: [
    "Selassie I. Jah Rastafari. Blessed love once more, Africa — at home and abroad. This week the Blessed Love Program stands on holy ground, because tomorrow the sun rises on the 17th of August 1887, the earthday of the Right Excellent Marcus Mosiah Garvey.",
    "The Prophet reminds us: without the prophet there is no vision. That same spirit that walked as Jeremiah, as Elijah, as John the Baptist dropped in Garvey and gave us the blueprint for how we, as Africans globally, liberate ourselves.",
  ],
  sections: [
    {
      heading: "Heaven Is Right Here On Earth",
      body: [
        "Africa for the Africans — those at home and those scattered abroad. Every man, woman and child under their own vine and fig tree, standing on Article 1 of the Universal Declaration of Human Rights: all human beings are born free and equal in dignity and rights. The paperwork of Babylon already condemns Babylon.",
        "The earth is the Lord's and the fullness thereof. So do not let them point you to the sky and pick your pocket on the ground — Africa is the black man's heaven, and it is rightfully ours. We knew ourselves as gods and goddesses on this earth long before they taught us to kneel to a stranger in the clouds.",
      ],
    },
    {
      heading: "No Saviour Is Coming From The Sky",
      body: [
        "The Prophet names the injustice system plain: where the rich man buys his freedom and the poor man cannot buy his rights, that is not a justice system. And when a people can find no justice in the court, history tells you what road they take next. Garvey's prophecy stands.",
        "And we salute the Sahel — this is the spark that will light the rest of Africa. If you cannot give financially, give physically; if you cannot give physically, give spiritually. The closing charge cuts to the bone: no saviour is coming from the sky. We are the ones.",
      ],
    },
  ],
  quotes: [
    {
      text: "No saviour is coming from the sky. We are the ones. The voice of the people is the voice of God; the strength of the people is the strength of God.",
      attribution: "Prophet Alem",
    },
    {
      text: "Do not let them point you to the sky and pick your pocket on the ground. Africa is the black man's heaven, and it is rightfully ours.",
      attribution: "Prophet Alem, on Garvey's earthday",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "MarcusGarvey",
    "August17",
    "HaileSelassieI",
    "Rastafari",
    "KingEmmanuel",
    "PanAfrican",
    "AfricaForTheAfricans",
    "HeavenOnEarth",
    "KnowThyself",
  ],
};
