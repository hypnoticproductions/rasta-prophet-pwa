/**
 * Shareable Quote Cards — the virality engine
 *
 * Each quote becomes a static page at /quotes/[id] with its own striking
 * Open Graph image (rendered at build time). When someone shares the quote
 * link to Facebook, the card image IS the post — designed to stop the scroll.
 *
 * Loop: quote card shared on Facebook -> click drives to /quotes/[id] ->
 * page links to the full episode + the on-site Facebook widget -> follow.
 *
 * Only verified, attributable quotes belong here. Keep the brand clean.
 */

export interface Quote {
  id: string; // url-safe slug
  text: string;
  attribution: string;
  guestSlug?: string; // links to a guest landing page when available
  episodeId?: string; // links to the episode
  context?: string; // optional one-line setup shown on the page
}

export const quotes: Quote[] = [
  {
    id: "comissiong-power-concedes-nothing",
    text: "Power concedes nothing without a demand. If there is no struggle, there is no progress.",
    attribution:
      "His Excellency David Comissiong, before the UN Permanent Forum on People of African Descent",
    guestSlug: "david-comissiong",
    episodeId: "35",
    context: "On why reparative justice must be demanded, not requested.",
  },
  {
    id: "comissiong-colonialism-aberration",
    text: "Colonialism is an unnatural state. It is an aberration that is to be avoided at all costs.",
    attribution: "His Excellency David Comissiong",
    guestSlug: "david-comissiong",
    episodeId: "35",
  },
  {
    id: "comissiong-reparations-transformation",
    text: "Reparations is not merely about a money payment. It is a revolutionary programme of transformation designed to eradicate the structures, practices and consequences of anti-black and anti-Indigenous racism.",
    attribution: "His Excellency David Comissiong",
    guestSlug: "david-comissiong",
    episodeId: "35",
    context: "Reframing reparations as systemic transformation, not a cheque.",
  },
];

const quotesById: Record<string, Quote> = Object.fromEntries(
  quotes.map((q) => [q.id, q])
);

export const getQuoteById = (id: string): Quote | undefined => quotesById[id];

export const getAllQuotes = (): Quote[] => quotes;

export const getQuotesForGuest = (guestSlug: string): Quote[] =>
  quotes.filter((q) => q.guestSlug === guestSlug);
