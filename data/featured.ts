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
  episodeId: string;        // matches an Episode id in data/episodes.ts
  showDate: string;         // human-readable date
  name: string;
  honorific: string;
  title: string;
  image: string;            // self-hosted in /public
  imageCredit: string;
  tagline: string;
  intro: string[];
  sections: FeaturedSection[];
  quotes: FeaturedQuote[];
  hashtags: string[];
}

export const featuredGuest: FeaturedGuest = {
  episodeId: "35",
  showDate: "June 7, 2026",
  name: "David Comissiong",
  honorific: "His Excellency",
  title: "Barbados' Ambassador to CARICOM · Pan-African Warrior",
  image: "/guests/david-comissiong.jpg",
  imageCredit: "Interview still — Mornin' Barbados / BGIS",
  tagline: "The Ambassador of the Bridge & the Reawakening of Global Africa",
  intro: [
    "Blessed love, family. When the trumpet sounds on Blessed Love Voice of Africa, it does not only call the spirit — it calls the people to move. And on the June 7th reasoning, a heartical voice came through the airwaves carrying a word the ancestors have been whispering for four hundred years: the bridge home is opening.",
    "That voice belonged to His Excellency David Comissiong — attorney-at-law, Pan-African warrior, and Barbados' Ambassador to the Caribbean Community (CARICOM), who also stands as non-resident High Commissioner to Saint Lucia and several sister islands. But to call him only a diplomat is to call the ocean only water. This is a man who has spent his whole livity chanting down Babylon's lies and building the road back to the Motherland.",
  ],
  sections: [
    {
      heading: "Roots and Rising",
      body: [
        "The brother was shaped by the whole Caribbean, not one island alone. Raised in the household of a Methodist minister, he moved through several Caribbean territories as a child before grounding himself in Barbados, where he came up through the University of the West Indies, Cave Hill, earning his law degree.",
        "From the law he moved to the movement. Comissiong founded and leads the Clement Payne Movement, a Pan-Africanist organization named for the labour hero who fought for the dignity of the working Black man. He also once headed the Barbadian government's Commission for Pan-African Affairs. This is no borrowed consciousness — this is a man who has carried the Garvey fire for decades.",
      ],
    },
    {
      heading: "The Century of Reparative Justice",
      body: [
        "Where Babylon wants the African to forget, Comissiong demands that the world remember — and repay. As Deputy Chairman of the Barbados National Task Force on Reparations and a key figure in the CARICOM Reparations Commission, he has helped lead the Caribbean's united demand for reparative justice from Europe for the crimes of Native Genocide and African Enslavement.",
        "He calls this the \"Century of Reparative Justice,\" and he does not beg — he demands. This is the same word Prophet Alem chants on the show: Freedom, Redemption, International Repatriation with Compensation. The Ambassador speaks it in the halls of the UN; the Prophet chants it on the 99.3 frequency. Two drums, one rhythm.",
      ],
    },
    {
      heading: "The Bridge Made Physical: Lagos to the Caribbean",
      body: [
        "For generations the return to Africa lived in song, in prayer, in the dream of black saline in a ship to take us home. But Comissiong has helped turn the dream into a flight path. He played a central role in launching the direct air corridor between Lagos, Nigeria and Barbados, operated by Air Peace, with the inaugural scheduled flight landing on May 24, 2026. Eight hours across the Atlantic — no more bowing through Babylon's transit gates to reach our own homeland.",
        "And the bridge is not only people — it is power and trade. Comissiong has championed Afreximbank's expansion into the Caribbean, including a reported US$5 billion commitment to strengthen CARICOM trade and investment, with a Caribbean headquarters rising in Barbados. He has also stood firmly behind the rollout of CARICOM Full Free Movement — formalizing at the level of law what the people have practiced at the level of blood for centuries.",
      ],
    },
    {
      heading: "Why the Page Must Know This Man",
      body: [
        "Family, we lift up David Comissiong not as a politician to worship, but as proof of a prophecy in motion. While many leaders bow to Babylon, here is a son of the soil using the master's own diplomatic table to set a place for the scattered children of Africa. The flight is real. The bank is real. The free movement is real. The reparations demand is real and it will not be denied.",
        "The Most High does not only move through the pulpit and the chant — sometimes Jah moves through an ambassador with a passport and a vision. Our work now is simple and serious: wake up, link up, trade, travel, learn, and return. The bridge is open. The people must move. Give thanks. Blessed love. Africa shall rise with equity and justice.",
      ],
    },
  ],
  quotes: [
    {
      text: "Colonialism is an unnatural state. It is an aberration that is to be avoided at all costs.",
      attribution: "David Comissiong",
    },
    {
      text: "Power concedes nothing without a demand... If there is no struggle, there is no progress.",
      attribution: "David Comissiong, before the UN Permanent Forum on People of African Descent",
    },
    {
      text: "Reparations is not merely about a money payment... it is a revolutionary programme of transformation designed to eradicate the structures, practices and consequences of anti-black and anti-Indigenous racism.",
      attribution: "David Comissiong",
    },
  ],
  hashtags: [
    "BlessedLoveVoiceOfAfrica",
    "DavidComissiong",
    "GlobalAfrica",
    "ReparativeJustice",
    "LagosToBarbados",
    "Afreximbank",
    "CARICOM",
    "RepatriationWithCompensation",
    "Rastafari",
  ],
};
