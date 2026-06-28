/**
 * Black Star Roots — Roots Tonic Wine
 * Marketing data for the promo-hour episodes so the product taglines ride
 * along with the show's share previews (Open Graph + Twitter) and on-page.
 *
 * 100% all natural. Manufactured at La Clery, Castries, St. Lucia, W.I.
 */

// The promo-hour episodes that carry the Black Star Roots segment.
export const BLACK_STAR_PROMO_IDS = ["8", "11", "16"] as const;

export const isBlackStarPromo = (id: string): boolean =>
  (BLACK_STAR_PROMO_IDS as readonly string[]).includes(id);

// Short catch phrases from the bottle label.
export const BLACK_STAR_TAGLINES = [
  "Stamina For Life",
  "The Natural Machine",
  "Look Out For It",
];

// One-line tagline appended to share descriptions for promo episodes.
export const BLACK_STAR_SHARE_TAGLINE =
  "Featuring the Black Star Roots Tonic Wine promo — 100% all natural. " +
  "Stamina For Life · The Natural Machine · Look out for it.";

// Branding line for the OG preview image bottom strip.
export const BLACK_STAR_OG_STRIP =
  "Black Star Roots · Roots Tonic Wine · Stamina For Life";
