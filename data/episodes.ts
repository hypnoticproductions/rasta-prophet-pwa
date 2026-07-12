/**
 * Local Episode Data
 * Store all podcast episodes here for instant loading
 * No database required - deploy anywhere!
 * 
 * UPDATING: When new episodes release, simply add them to this list!
 */

export interface Episode {
  id: string;
  title: string;
  description: string;
  archive_url: string;
  published_date: string;
  duration?: string;
  episode_number: number;
}

export const episodes: Episode[] = [
  {
    id: "1",
    episode_number: 1,
    title: "Blessed Love: Voice of Africa - Segment 1",
    description: "SEGMENT ONE: The journey begins with wisdom and enlightenment. A powerful message of hope and transformation.",
    archive_url: "https://archive.org/download/BLESSEDLOVESEG1EPISODE21122025/save%20on%201%20a.mp3",
    published_date: "2025-12-21",
    duration: "3:34:14"
  },
  {
    id: "2",
    episode_number: 2,
    title: "Blessed Love: Voice of Africa - Segment 2",
    description: "SEGMENT TWO: Continuing the message with deeper insights and profound teachings for the soul.",
    archive_url: "https://archive.org/download/blessedloveseg2episode21122025/save%20on%201%20b.mp3",
    published_date: "2025-12-21",
    duration: "3:23:50"
  },
  {
    id: "3",
    episode_number: 3,
    title: "Blessed Love: Voice of Africa - Segment 3",
    description: "SEGMENT THREE: More wisdom shared with the world. Experience the vibrations of truth.",
    archive_url: "https://archive.org/download/BLESSEDLOVESEG3EPISODE21122025/save%20on%201%20c.mp3",
    published_date: "2025-12-21",
    duration: "49:04"
  },
  {
    id: "4",
    episode_number: 4,
    title: "Blessed Love: Voice of Africa - Segment 4",
    description: "SEGMENT FOUR: The journey continues with more profound insights and teachings.",
    archive_url: "https://archive.org/download/BLESSEDLOVESEG4EPISODE21122025/save%20on2-001.mp3",
    published_date: "2025-12-21",
    duration: "50:54"
  },
  {
    id: "5",
    episode_number: 5,
    title: "Blessed Love: Voice of Africa - Final Segment",
    description: "LAST SEGMENT: Concluding message of the day. Take with you the wisdom shared.",
    archive_url: "https://archive.org/download/last-segment/last%20segment%20.mp3",
    published_date: "2025-12-21",
    duration: "26:24"
  },
  {
    id: "6",
    episode_number: 6,
    title: "Blessed Love: Voice of Africa - December 28, Segment 1",
    description: "A new week, a new message. Part 1 of the December 28th broadcast.",
    archive_url: "https://archive.org/download/blessedlovevoiceofafricashow12-28-2025-sgm-one/show%20on%2012%2028%202025%20sgm%20one.mp3",
    published_date: "2025-12-28",
    duration: "1:01:18"
  },
  {
    id: "7",
    episode_number: 7,
    title: "Blessed Love: Voice of Africa - December 28, Segment 2",
    description: "Part 2 of the December 28th broadcast. Continuing the week's message.",
    archive_url: "https://archive.org/download/blessedlovevoiceofafricashow12-28-2025-sgm2/show%20on%2012%2028%202025%20sgm%20two.mp3",
    published_date: "2025-12-28",
    duration: "1:42:25"
  },
  {
    id: "8",
    episode_number: 8,
    title: "Blessed Love: Voice of Africa - Black Roots Promo Hour",
    description: "Black Roots Promo Hour special segment. Celebrating heritage and culture.",
    archive_url: "https://archive.org/download/show-on-12-28-2025-sgm-three-black-roots-promo-hr/show%20on%2012%2028%202025%20sgm%20THREE%20black%20roots%20promo%20hr.mp3",
    published_date: "2025-12-28",
    duration: "1:42:35"
  },
  // January 4, 2026 Episodes
  {
    id: "9",
    episode_number: 9,
    title: "Blessed Love Africa Show - Segment Three Venezuela Up In Arms",
    description: "SEGMENT THREE: Venezuela Up In Arms - Continuing the powerful discussion on current events affecting our people.",
    archive_url: "https://archive.org/download/show-on-1-4-2026-segment-three-venezuela-up-in-arms/show%20on%201%204%202026%20segment%20three%20%20venezuela%20up%20in%20arms.mp3",
    published_date: "2026-01-04"
  },
  {
    id: "10",
    episode_number: 10,
    title: "Blessed Love Voice of Africa - Segment Four Venezuela Up In Arms",
    description: "SEGMENT FOUR: Venezuela Up In Arms - Further insights and analysis on the situation.",
    archive_url: "https://archive.org/download/show-on-1-4-2026-segment-four-venezuela-up-in-arms/show%20on%201%204%202026%20segment%20four%20%20venezuela%20up%20in%20arms.mp3",
    published_date: "2026-01-04"
  },
  {
    id: "11",
    episode_number: 11,
    title: "Blessed Love Voice of Africa Show - Segment Five Venezuela Up In Arms BLACKROOTS PROMO",
    description: "SEGMENT FIVE: Venezuela Up In Arms - BLACKROOTS PROMO. A powerful message with special Black Roots promotion.",
    archive_url: "https://archive.org/download/show-on-1-4-2026-segment-five-venezuela-up-in-arms-blkroots-promo-hr/show%20on%201%204%202026%20segment%20five%20%20venezuela%20up%20in%20arms.mp3",
    published_date: "2026-01-04"
  },
  // January 11, 2026 Episodes
  {
    id: "12",
    episode_number: 12,
    title: "Blessed Love Voice of Africa Show - Segment One CARIBBEAN UNDER SIEGE",
    description: "SEGMENT ONE: CARIBBEAN UNDER SIEGE - A powerful examination of the challenges facing our Caribbean nations.",
    archive_url: "https://archive.org/download/show-1-11-2026-segment-one/show%201%2011%202026%20segment%20one.mp3",
    published_date: "2026-01-11"
  },
  {
    id: "13",
    episode_number: 13,
    title: "Blessed Love Voice of Africa - Segment VENEZUELA HIJACKED CARIBBEAN UNDER SIEGE",
    description: "INTERVIEW SEGMENT: Ambassador Reveals Bombshell - An exclusive interview exposing critical information about Venezuela.",
    archive_url: "https://archive.org/download/show-1-11-2026-segment-venezuela-hijacked/show%201%2011%202026%20segment%20VENEZUELA%20HIJACKED.mp3",
    published_date: "2026-01-11"
  },
  // January 18, 2026 Episodes
  {
    id: "14",
    episode_number: 14,
    title: "Blessed Love Voice of Africa Show - Segment One",
    description: "SEGMENT ONE: Opening segment of the January 18th broadcast with wisdom and enlightenment.",
    archive_url: "https://archive.org/download/show-1-18-2026-segment-one/show%20%201%2018%202026%20segment%20one.mp3",
    published_date: "2026-01-18"
  },
  {
    id: "15",
    episode_number: 15,
    title: "Blessed Love Voice of Africa Show - Interview Segment",
    description: "INTERVIEW: Dr. Mary Gilbertha St. Rose — integrative doctor and herbalist, the St. Lucian who beat the Medical & Dental Council in court after they fined her for prescribing Ivermectin — launches the World Council for Health Country Council in St. Lucia. With Gloria Dorsius of the Freedom Coalition St. Lucia, she turns a critical eye on the WHO and argues that food and botanical medicine are not 'alternative' but PRIMARY care. A reasoning on health autonomy and natural sovereignty.",
    archive_url: "https://archive.org/download/show-1-18-2026-segment-interview/show%20%201%2018%202026%20segment%20two.mp3",
    published_date: "2026-01-18"
  },
  {
    id: "16",
    episode_number: 16,
    title: "Blessed Love Voice of Africa Show - Segment Three Black Star Roots Promo Hour",
    description: "SEGMENT THREE: Black Star Roots Promo Hour - Celebrating African heritage and cultural pride.",
    archive_url: "https://archive.org/download/show-1-18-2026-segment-three-black-star-roots-promo-hour/show%20%201%2018%202026%20segment%20three%20black%20star%20roots%20promo%20hour.mp3",
    published_date: "2026-01-18"
  },
  // January 25, 2026 Episodes
  {
    id: "17",
    episode_number: 17,
    title: "Blessed Love Voice of Africa Show - January 25, 2026",
    description: "Today's broadcast - Bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/blessed-love-program-voice-africa-show-1-25-2026/blessed%20love%20program%20voice%20africa%20show%201%2025%202026.mp3",
    published_date: "2026-01-25"
  },
  {
    id: "18",
    episode_number: 18,
    title: "Blessed Love Voice of Africa Show - January 25, 2026 Segment 2",
    description: "SEGMENT TWO: Continuation of today's powerful message and teachings.",
    archive_url: "https://archive.org/download/blessed-love-program-voice-africa-show-1-25-2026-segment-2/blessed%20love%20program%20voice%20africa%20show%201%2025%202026%20SEGMENT%202.mp3",
    published_date: "2026-01-25"
  },
  // February 1, 2026 Episodes
  {
    id: "19",
    episode_number: 19,
    title: "Blessed Love Voice of Africa Show - February 1, 2026",
    description: "Today's broadcast - Bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-2-1-2026/show%20on%202%201%202026.mp3",
    published_date: "2026-02-01"
  },
  {
    id: "20",
    episode_number: 20,
    title: "Blessed Love Voice of Africa Show - February 1, 2026 Segment 2",
    description: "SEGMENT TWO: Continuation of today's powerful message and teachings.",
    archive_url: "https://archive.org/download/show-on-2-1-2026-segment-2/show%20on%202%201%202026%20SEGMENT%202.mp3",
    published_date: "2026-02-01"
  },
  // February 8, 2026 Episodes
  {
    id: "21",
    episode_number: 21,
    title: "Blessed Love Voice of Africa Show - February 8, 2026 Full Show",
    description: "Today's complete broadcast - Full show bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-2-8-2026-full-show/show%202%208%202026%20full%20show.mp3",
    published_date: "2026-02-08"
  },
  // February 22, 2026 Episodes
  {
    id: "22",
    episode_number: 22,
    title: "Blessed Love Voice of Africa Show - February 22, 2026",
    description: "We are back! Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-2-22-2026/show%202%2022%202026.mp3",
    published_date: "2026-02-22"
  },
  // March 8, 2026 Episodes
  {
    id: "23",
    episode_number: 23,
    title: "Blessed Love Voice of Africa Show - March 8, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-3-8-2026/show%20%203%208%202026.mp3",
    published_date: "2026-03-08"
  },
  // March 15, 2026 Episodes
  {
    id: "24",
    episode_number: 24,
    title: "Blessed Love Voice of Africa Show - March 15, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-3-15-2026/show%20on%203%2015%202026.mp3",
    published_date: "2026-03-15"
  },
  // March 22, 2026 Episodes
  {
    id: "25",
    episode_number: 25,
    title: "Blessed Love Voice of Africa Show - March 22, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-3-22-2026/show%20on%20%203%2022%202026%20.mp3",
    published_date: "2026-03-22"
  },
  // March 29, 2026 Episodes
  {
    id: "26",
    episode_number: 26,
    title: "Blessed Love Voice of Africa Show - March 29, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-3-29-2026/show%20on%20%203%2029%202026%20.mp3",
    published_date: "2026-03-29"
  },
  // April 12, 2026 Episodes
  {
    id: "27",
    episode_number: 27,
    title: "Blessed Love Voice of Africa Show - April 12, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-4-12-2026/show%20on%20%204%2012%202026%20FIX.mp3",
    published_date: "2026-04-12"
  },
  // April 19, 2026 Episodes
  {
    id: "28",
    episode_number: 28,
    title: "Blessed Love Voice of Africa Show - April 19, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-4-19-2026/show%20on%20%204%2019%202026%20.mp3",
    published_date: "2026-04-19"
  },
  // April 26, 2026 Episodes
  {
    id: "29",
    episode_number: 29,
    title: "Blessed Love Voice of Africa Show - April 26, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-4-26-2026/show%20on%20%204%20%2026%202026.mp3",
    published_date: "2026-04-26"
  },
  // May 3, 2026 Episodes
  {
    id: "30",
    episode_number: 30,
    title: "Blessed Love Voice of Africa Show - May 3, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-may-3-2026-full/show%20on%20may%203%202026%20%20full%20.mp3",
    published_date: "2026-05-03"
  },
  // May 10, 2026 Episodes
  {
    id: "31",
    episode_number: 31,
    title: "Blessed Love Voice of Africa Show - May 10, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-5-10-2026-full-show-001/show%20on%20%205%2010%202026%20full%20show-001.mp3",
    published_date: "2026-05-10"
  },
  // May 17, 2026 Episodes
  {
    id: "32",
    episode_number: 32,
    title: "Blessed Love Voice of Africa Show - May 17, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-on-may-17-2026-fulll-1/show%20on%20%20may%2017%202026%20fulll%201.mp3",
    published_date: "2026-05-17"
  },
  // May 24, 2026 Episodes
  {
    id: "33",
    episode_number: 33,
    title: "Blessed Love Voice of Africa Show - May 24, 2026",
    description: "FEATURED GUESTS: Andre \"Poncho\" DeCaires & Dr. Marshall Immanuel — The ganja fight comes home. DeCaires spent a decade as chairman of the Cannabis Movement, pushing Saint Lucia's government on legalization while they stalled and dragged their feet. When reform finally came in 2020, he walked away from the chair to build a growers' Cooperative — because he saw the trap: foreign investors ready to cash in while the original farmers who risked prison stay criminalized. This is the reasoning on Rastafari sacramental rights, social equity, restorative justice, ganja tourism, and who really owns the herb when the law finally changes.",
    archive_url: "https://archive.org/download/show-5-24-202-full-show/show%205%2024%20202%20full%20show.mp3",
    published_date: "2026-05-24"
  },
  // May 31, 2026 Episodes
  {
    id: "34",
    episode_number: 34,
    title: "Blessed Love Voice of Africa Show - May 31, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-5-31-2026-full-show/show%20%205%2031%202026%20full%20show.mp3",
    published_date: "2026-05-31"
  },
  // June 7, 2026 Episodes — Featuring H.E. David Comissiong
  {
    id: "35",
    episode_number: 35,
    title: "Blessed Love Voice of Africa Show - June 7, 2026",
    description: "FEATURED GUEST: His Excellency David Comissiong, Barbados' Ambassador to CARICOM — Pan-African warrior on reparative justice, the Lagos-to-Barbados air bridge, and the reawakening of Global Africa.",
    archive_url: "https://archive.org/download/show-on-6-7-2026-full-show-001/show%20on%206%207%202026%20full%20show-001.mp3",
    published_date: "2026-06-07"
  },
  // June 21, 2026 Episode
  {
    id: "36",
    episode_number: 36,
    title: "Blessed Love Voice of Africa Show - June 21, 2026",
    description: "Today's full broadcast bringing wisdom, truth, and enlightenment to the people.",
    archive_url: "https://archive.org/download/show-6-21-2026-full-show-001/show%206%2021%202026%20full%20show-001.mp3",
    published_date: "2026-06-21"
  },
  // June 28, 2026 Episode
  {
    id: "37",
    episode_number: 37,
    title: "Blessed Love Voice of Africa Show - June 28, 2026",
    description: "A deep reggae current and a sermon-like word: Prophet Alem chants Marcus Garvey's gospel of black self-reliance, exposes the false 'leaders' Babylon parades — entertainers and athletes handed crumbs while the people starve for direction — and warns of the coming clash of civilizations. Callers reason on 'skinfolk who are not kinfolk,' the colonial trap hidden in our education, and a generation losing its power to think. Closes on the anthem 'Black Star Roots.'",
    archive_url: "https://archive.org/download/show-on-6-28-2026-full/show%20on%20%206%2028%202026%20full.mp3",
    published_date: "2026-06-28"
  },
  // July 5, 2026 Episode
  {
    id: "38",
    episode_number: 38,
    title: "Blessed Love Voice of Africa Show - July 5, 2026",
    description: "\"Masters of our faith, owners of our wealth\" — Prophet Alem opens like a trumpet at the gate with Emperor Haile Selassie I's charge on education, calling for a reset of the Black mind and lifting the island's young scholars, especially Princess Aida, as a sacred battlefield. The broadcast's heaviest chamber returns to Dr. Gilbertha St. Rose of Eden Herbs — the St. Lucian doctor suspended, fined $10,000 EC and stripped of her licence after prescribing ivermectin, reinstated by the High Court yet still pursued by the Medical & Dental Council in April 2026. She calls in herself, without shame: \"No complicity, no compromise.\" Plus the COVID questions the island was never allowed to ask, and one law above all — great health is great wealth. Jah Rastafari.",
    archive_url: "https://archive.org/download/show-7-5-2026-the-full-show/show%20%207%205%202026%20the%20full%20show.mp3",
    published_date: "2026-07-05"
  },
  // July 12, 2026 Episode
  {
    id: "39",
    episode_number: 39,
    title: "Blessed Love Voice of Africa Show - July 12, 2026",
    description: "ONE DAY NEARER HOME — THE ANTICS EXPOSED. Prophet Alem opens on Rastafari, King Emmanuel VII, Selassie I and the Universal Declaration of Human Rights, then turns the fire on CARICOM: Saint Lucia's PM takes the chair while the island fills with 'talking shops as usual' — and an Al Jazeera correspondent has his mic cut for pressing the PM on two Saint Lucian men killed in a U.S. strike at sea. From there: the muzzled press, the Sahel rising, empire's impunity, the CIP passport sellout, and the people's burden of taxes and food insecurity. No justice, no peace. Selassie I. Blessed Love.",
    archive_url: "https://archive.org/download/show-7-12-2026-full-show/show%207%2012%202026%20%20full%20show.mp3",
    published_date: "2026-07-12"
  }
];

// Export helper functions
export const getEpisodeById = (id: string): Episode | undefined => {
  return episodes.find(ep => ep.id === id);
};

export const getLatestEpisodes = (count: number = 3): Episode[] => {
  return episodes.slice(0, count);
};

export const getAllEpisodes = (): Episode[] => {
  return episodes;
};
