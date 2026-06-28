/**
 * Episode Marketing Posts — Aggregator
 * Combines all share-ready Facebook posts for the 35 shows and exposes
 * a lookup keyed by episode id (matches data/episodes.ts).
 */

import { EpisodePost } from "./posts-1-12";
import { posts_1_12 } from "./posts-1-12";
import { posts_13_24 } from "./posts-13-24";
import { posts_25_35 } from "./posts-25-35";

export type { EpisodePost };

export const allPosts: EpisodePost[] = [
  ...posts_1_12,
  ...posts_13_24,
  ...posts_25_35,
];

const postsById: Record<string, EpisodePost> = Object.fromEntries(
  allPosts.map((p) => [p.id, p])
);

export const getPostById = (id: string): EpisodePost | undefined =>
  postsById[id];
