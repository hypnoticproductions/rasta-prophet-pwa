/**
 * Per-episode rich media (video + image carousel) for featured broadcasts.
 * Keyed by episode id (matches data/episodes.ts).
 */

export interface MediaCard {
  img: string;
  gist: string;
}

export interface EpisodeMedia {
  videoUrl: string;
  cards: MediaCard[];
}

const MEDIA: Record<string, EpisodeMedia> = {
  "39": {
    videoUrl: "/media/july12.mp4",
    cards: [
      { img: "/media/cards/they-cut-the-mic.png", gist: "THEY CUT THE MIC — Al Jazeera pressed the PM on two Saint Lucians killed at sea, and the signal died. CARICOM's antics, exposed." },
      { img: "/media/cards/killed-at-sea.png", gist: "TWO OF OUR SONS — killed by a U.S. strike in Caribbean waters. No trial, no charge. We are demanding answers." },
      { img: "/media/cards/cip-sellout.png", gist: "THE GREAT SELLOUT — when the passport becomes a product, the citizen becomes a customer, and the nation becomes somebody else's asset." },
      { img: "/media/cards/digital-slavery.png", gist: "NEW CHAINS, SAME MASTER — the plantation went from cotton field to server farm. The chain is now made of code." },
      { img: "/media/cards/king-of-kings.png", gist: "KING OF KINGS — Mandela stood before Haile Selassie I and saw 'a vision of what lay in the future.' Remember your crown." },
      { img: "/media/cards/decolonize-mind.png", gist: "COLORISM IS COLONIALISM WEARING OUR OWN FACE — emancipate yourselves from mental slavery. Black is divine." },
      { img: "/media/cards/wicked-fall.png", gist: "BABYLON REAPS WHAT IT SOWS — every empire meets its reckoning. Jah keeps the accounts." },
    ],
  },
};

export const getEpisodeMedia = (id: string): EpisodeMedia | undefined => MEDIA[id];
