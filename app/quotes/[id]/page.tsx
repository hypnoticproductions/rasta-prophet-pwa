import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllQuotes, getQuoteById } from '@/data/quotes';
import { getGuestBySlug } from '@/data/guests';
import { getEpisodeById } from '@/data/episodes';
import { BASE_URL, SITE_NAME } from '@/lib/siteConfig';
import ShareButtons from '@/components/ShareButtons';
import FacebookPagePlugin from '@/components/FacebookPagePlugin';

export function generateStaticParams() {
  return getAllQuotes().map((q) => ({ id: q.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const quote = getQuoteById(params.id);
  if (!quote) return { title: 'Quote Not Found' };

  const pageUrl = `${BASE_URL}/quotes/${quote.id}`;
  const ogImage = `${pageUrl}/opengraph-image`;
  const desc = `“${quote.text}” — ${quote.attribution}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: `“${quote.text.slice(0, 60)}${quote.text.length > 60 ? '…' : ''}”`,
    description: desc,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'article',
      title: 'Blessed Love Voice of Africa',
      description: desc,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: quote.attribution, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blessed Love Voice of Africa',
      description: desc,
      images: [ogImage],
    },
  };
}

export default function QuotePage({ params }: { params: { id: string } }) {
  const quote = getQuoteById(params.id);
  if (!quote) notFound();

  const pageUrl = `${BASE_URL}/quotes/${quote.id}`;
  const guest = quote.guestSlug ? getGuestBySlug(quote.guestSlug) : undefined;
  const episode = quote.episodeId ? getEpisodeById(quote.episodeId) : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: quote.text,
    spokenByCharacter: quote.attribution,
    url: pageUrl,
  };

  return (
    <main className="relative min-h-screen bg-black text-stone-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative max-w-3xl mx-auto px-6 md:px-8 pt-10 pb-32">
        <div className="flex items-center justify-between mb-16">
          <Link
            href="/"
            className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase hover:text-shadow-glow transition-colors"
          >
            ← The Rasta Prophet
          </Link>
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
            Quote
          </span>
        </div>

        {/* The card */}
        <div className="relative rounded-2xl overflow-hidden border border-gold/30 bg-gradient-to-br from-red/15 via-black to-green/15 p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <div className="text-gold text-6xl font-serif leading-none mb-2">“</div>
          <blockquote className="text-2xl md:text-4xl font-serif italic leading-snug text-stone-100">
            {quote.text}
          </blockquote>
          <p className="mt-8 text-gold font-bold uppercase tracking-[0.2em] text-sm">
            — {quote.attribution}
          </p>
          {quote.context && (
            <p className="mt-3 text-stone-400 text-sm italic">{quote.context}</p>
          )}
        </div>

        {/* Share */}
        <div className="mt-10">
          <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            Share This Truth
          </p>
          <ShareButtons url={pageUrl} title={`“${quote.text}” — ${quote.attribution}`} />
        </div>

        {/* Cross-links */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          {guest && (
            <Link
              href={`/guests/${guest.slug}`}
              className="flex-1 p-4 bg-zinc-900/60 border border-gold/20 rounded-lg hover:border-gold/60 transition-colors"
            >
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                Who said it
              </p>
              <p className="text-gold font-bold">
                {guest.honorific ? guest.honorific + ' ' : ''}
                {guest.name} →
              </p>
            </Link>
          )}
          {episode && (
            <Link
              href={`/episodes/${episode.id}`}
              className="flex-1 p-4 bg-zinc-900/60 border border-gold/20 rounded-lg hover:border-gold/60 transition-colors"
            >
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                Hear the full reasoning
              </p>
              <p className="text-gold font-bold">Episode {episode.episode_number} →</p>
            </Link>
          )}
        </div>

        {/* Facebook widget */}
        <div className="mt-12">
          <FacebookPagePlugin />
        </div>
      </section>
    </main>
  );
}
