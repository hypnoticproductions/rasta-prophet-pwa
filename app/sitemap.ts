import type { MetadataRoute } from 'next';
import { getAllEpisodes } from '@/data/episodes';
import { getAllGuests } from '@/data/guests';
import { getAllQuotes } from '@/data/quotes';
import { BASE_URL } from '@/lib/siteConfig';

// Static-export friendly sitemap: enumerates every prerendered route so search
// engines can discover episodes, guest landing pages, and quote cards.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ];

  const episodes: MetadataRoute.Sitemap = getAllEpisodes().map((ep) => ({
    url: `${BASE_URL}/episodes/${ep.id}`,
    lastModified: ep.published_date ? new Date(ep.published_date) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guests: MetadataRoute.Sitemap = getAllGuests().map((g) => ({
    url: `${BASE_URL}/guests/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const quotes: MetadataRoute.Sitemap = getAllQuotes().map((q) => ({
    url: `${BASE_URL}/quotes/${q.id}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...home, ...episodes, ...guests, ...quotes];
}
