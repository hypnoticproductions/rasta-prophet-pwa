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
  episodeId: "40",
  showDate: "July 26, 2026",
  name: "His Weapon Is A Shovel",
  honorific: "",
  title: "Prisons turned into farms — Traore, Sankara, and the rising of a continent.",
  image: "/backgrounds/makola-market.jpg",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "Africa's true wealth is not buried underground in minerals — it is walking, breathing, and ready to be restored.",
  intro: [
    "Blessed love, family. On this Sabbath — in the same week InI give thanks for the 23rd of July, the earthday of His Imperial Majesty Emperor Haile Selassie I, King of Kings, Lord of Lords, Conquering Lion of the Tribe of Judah — the Honorable Prophet Alem carried the Voice of Africa straight to the heart of the matter: rehabilitation, redemption, and the rising of a continent.",
    "This week the Prophet lifted up Captain Ibrahim Traore and the Burkina Faso revolution that Babylon does not know how to report. Not with bullets — with seed.",
  ],
  sections: [
    {
      heading: "Prisons Turned Into Farms",
      body: [
        "The discarded turned into providers — men and women once buried in shame now feeding whole communities, earning wages, reclaiming the land. The spirit of Sankara rises again. The spirit of Joshua rises again, for Moses saw the promised land but Joshua entered it, from the river to where the sun sets: the continent of Africa.",
        "Africa's true wealth is not buried underground in minerals. It is walking, breathing, and ready to be restored.",
      ],
    },
    {
      heading: "Babylon's Answer — Cages",
      body: [
        "The Prophet held up the mirror. In America they built a prison system that is a slavery system — a people barely a tenth of the population, yet the majority behind the bars. One nation buries its children in cages; another plants them in the soil and watches them grow. Judge for yourself which one fears its people, and which one frees them.",
        "From there the reasoning ran deep: repatriation with compensation, the so-called world wars named for what they were, a generation imprisoned in the screens — and the one command that answers it all. Know thyself.",
      ],
    },
  ],
  quotes: [
    {
      text: "Africa's true wealth isn't buried underground in minerals — it's walking, breathing, and ready to be restored.",
      attribution: "On the Burkina Faso revolution",
    },
    {
      text: "Without the Prophet there is no vision. Without the Priest there is no order. Without the King the people perish.",
      attribution: "Prophet Alem",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "IbrahimTraore",
    "BurkinaFaso",
    "Sankara",
    "HaileSelassieI",
    "PanAfrican",
    "Rastafari",
    "AfricaForAfricans",
    "KnowThyself",
    "PrisonToFarm",
  ],
};
