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
  episodeId: "45",
  showDate: "August 30, 2026",
  name: "Reclaim The Sound. Reclaim The Story.",
  honorific: "",
  title: "The roots — Bobo Shanti, the sacred Trinity, and the vibration of Nyabinghi.",
  image: "/media/cards/king-of-kings.png",
  imageCredit: "Blessed Love · Voice of Africa · Blazing 99.3 FM",
  tagline:
    "They make us believe it's our culture — but it's not. Reclaim the sound. Reclaim the story. Love yourself as a people.",
  intro: [
    "Blessed love, family. This week the Voice of Africa went to the roots — the foundation of the faith, the fire of Black consciousness, and the sound that carries the message. Reasoning is better than preaching, saith the Most High.",
    "Prophet Alem opened on the eternal aim: repatriation and freedom, every man, woman and child under their own vine and fig tree — and named the wound plain: Africa is the richest land on earth, yet poverty runs rampant, because our resources are stolen, hijacked and looted. But the tide is turning.",
  ],
  sections: [
    {
      heading: "The House Of Bobo Shanti",
      body: [
        "The Prophet took us deep into the Ethiopia Africa Black International Congress — a government within a government — and the sacred Trinity that holds the order together: the Prophet, the Priest and the King. Without the prophet there is no vision, without the priest there is no ceremonial order, and without the king the people shall surely perish.",
        "He hailed King Emmanuel Charles Edwards, His Imperial Majesty Emperor Haile Selassie I, and Marcus Mosiah Garvey — the greatest prophet born of the womb of a woman in this dispensation of time. And quoting Malcolm X — put down the book — he called for unity above religion: no matter your faith, as a Black person you are still oppressed.",
      ],
    },
    {
      heading: "The Vibration Of The Sound",
      body: [
        "The heart of the show was the music. From Nyabinghi — the one-two heartbeat drum, the original church sound — through reggae, the Prophet reasoned on how the beat itself carries spirit, and how conscious sound built the movement.",
        "But the modern industry has diluted Black culture and twisted the image of the Black woman into something that was never ours. They make us believe it's our culture — but it's not. The call: reclaim the sound, reclaim the story, preserve the culture, love yourself as a people.",
      ],
    },
  ],
  quotes: [
    {
      text: "Without the prophet there is no vision, without the priest there is no ceremonial order, and without the king the people shall surely perish.",
      attribution: "Prophet Alem, on the sacred Trinity",
    },
    {
      text: "No matter what religion you are, as a Black person, you are still oppressed, wherever you are in the world.",
      attribution: "Prophet Alem, quoting the spirit of Malcolm X",
    },
  ],
  hashtags: [
    "BlessedLove",
    "VoiceOfAfrica",
    "Blazing993FM",
    "Rastafari",
    "BoboShanti",
    "Nyabinghi",
    "MarcusGarvey",
    "MalcolmX",
    "HaileSelassieI",
    "KingEmmanuel",
    "BlackConsciousness",
    "ReclaimTheSound",
  ],
};
