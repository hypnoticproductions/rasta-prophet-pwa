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
    description: "INTERVIEW: Mary Gilbertha St. Rose, Gloria Dorsius - Special guests share their stories and insights.",
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
