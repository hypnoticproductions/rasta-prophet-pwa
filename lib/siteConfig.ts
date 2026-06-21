/**
 * Central site configuration — single source of truth for the absolute base URL
 * used to build share previews (Open Graph / Twitter cards).
 *
 * Why this matters: OG image and canonical URLs MUST be absolute and point at the
 * live domain, or Facebook/Twitter can't fetch the preview image. Resolution order:
 *
 *   1. NEXT_PUBLIC_BASE_URL          — explicit override (set this for a custom domain)
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's STABLE production domain (auto, best
 *                                      for share links that shouldn't change per deploy)
 *   3. VERCEL_URL                    — the per-deployment URL (auto fallback)
 *   4. https://therastaprophet.com   — final fallback so local builds still resolve
 *
 * All of these are read at build time (metadata is statically generated), so the
 * VERCEL_* vars that Vercel injects during `next build` are available here.
 */

function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return normalize(explicit);

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return normalize(vercelProd);

  const vercelDeploy = process.env.VERCEL_URL;
  if (vercelDeploy) return normalize(vercelDeploy);

  return "https://therastaprophet.com";
}

// Accepts "example.com", "https://example.com", or "https://example.com/" and
// always returns "https://example.com" (scheme present, no trailing slash).
function normalize(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export const BASE_URL = resolveBaseUrl();

export const SITE_NAME = "The Rasta Prophet — Blessed Love Voice of Africa";

/**
 * Official Facebook Page URL — powers the on-site Facebook Page Plugin widget
 * and the "Follow on Facebook" calls to action. Set NEXT_PUBLIC_FACEBOOK_PAGE_URL
 * to the real page (e.g. https://www.facebook.com/TheRastaProphet) to activate it.
 * Empty string hides the widget so nothing broken ever renders.
 */
export const FACEBOOK_PAGE_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL?.trim() || "";

export const SITE_DESCRIPTION =
  "Blessed Love Voice of Africa — the vibration of truth. Listen to every broadcast of The Rasta Prophet: Pan-African reasoning, roots, and enlightenment.";
