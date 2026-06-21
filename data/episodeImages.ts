/**
 * Episode Background Image Mapper
 * Maps each episode id to the most thematically fitting heritage image
 * in /public/backgrounds. Used for the per-episode share pages and the
 * dynamic Open Graph image.
 *
 * Theme rules:
 *  - Venezuela episodes (9, 10, 11, 13) -> maduro-venezuela.jpg
 *  - Caribbean Under Siege (12)         -> half-way-tree-clock.jpg
 *  - Episode 35 (Comissiong / Barbados / Africa) -> renaissance-monument-dakar.jpg
 *  - Everything else is spread across the remaining heritage images in a
 *    deterministic rotation so each show gets a distinct, stable picture.
 */

const DEFAULT_IMAGE = "/backgrounds/piton-peak.jpg";

// Pool of heritage images used for the general rotation (excludes the
// special-case images so the themed shows stay visually distinct).
const ROTATION: string[] = [
  "/backgrounds/pitons-soufriere-town.jpg",
  "/backgrounds/makola-market.jpg",
  "/backgrounds/angel-falls-venezuela.jpg",
  "/backgrounds/kaieteur-falls.jpg",
  "/backgrounds/victoria-falls.jpg",
  "/backgrounds/table-mountain.jpg",
  "/backgrounds/great-mosque-djenne.jpg",
  "/backgrounds/lekki-ikoyi-bridge.jpg",
  "/backgrounds/piton-peak.jpg",
  "/backgrounds/pitons-st-lucia.jpg",
  "/backgrounds/petit-piton.jpg",
];

// Explicit thematic overrides keyed by episode id.
const OVERRIDES: Record<string, string> = {
  // Venezuela "Up In Arms" / "Hijacked" episodes
  "9": "/backgrounds/maduro-venezuela.jpg",
  "10": "/backgrounds/maduro-venezuela.jpg",
  "11": "/backgrounds/maduro-venezuela.jpg",
  "13": "/backgrounds/maduro-venezuela.jpg",
  // Caribbean Under Siege
  "12": "/backgrounds/half-way-tree-clock.jpg",
  // Featured guest: David Comissiong — Barbados / Pan-African bridge to Africa
  "35": "/backgrounds/renaissance-monument-dakar.jpg",
};

/**
 * Returns the public path of the best-fitting background image for an
 * episode id, e.g. "/backgrounds/table-mountain.jpg".
 */
export function getEpisodeImage(id: string): string {
  if (OVERRIDES[id]) {
    return OVERRIDES[id];
  }

  const n = Number.parseInt(id, 10);
  if (!Number.isNaN(n)) {
    // Stable rotation so the same episode always shows the same image.
    return ROTATION[n % ROTATION.length];
  }

  return DEFAULT_IMAGE;
}

export default getEpisodeImage;
