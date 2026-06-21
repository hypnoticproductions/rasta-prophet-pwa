import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllGuests, getGuestBySlug } from '@/data/guests';
import { getEpisodeById } from '@/data/episodes';
import { getQuotesForGuest } from '@/data/quotes';
import { BASE_URL, SITE_NAME } from '@/lib/siteConfig';
import ShareButtons from '@/components/ShareButtons';
import FacebookPagePlugin from '@/components/FacebookPagePlugin';

export function generateStaticParams() {
  return getAllGuests().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guest = getGuestBySlug(params.slug);
  if (!guest) {
    return { title: 'Guest Not Found' };
  }

  const fullName = `${guest.honorific ? guest.honorific + ' ' : ''}${guest.name}`.trim();
  const pageUrl = `${BASE_URL}/guests/${guest.slug}`;
  const ogImage = `${pageUrl}/opengraph-image`;

  return {
    metadataBase: new URL(BASE_URL),
    title: `${fullName} — ${guest.title}`,
    description: guest.metaDescription,
    keywords: guest.keywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'profile',
      title: `${fullName} on Blessed Love Voice of Africa`,
      description: guest.metaDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullName, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fullName} on Blessed Love Voice of Africa`,
      description: guest.metaDescription,
      images: [ogImage],
    },
  };
}

export default function GuestPage({ params }: { params: { slug: string } }) {
  const guest = getGuestBySlug(params.slug);
  if (!guest) notFound();

  const fullName = `${guest.honorific ? guest.honorific + ' ' : ''}${guest.name}`.trim();
  const pageUrl = `${BASE_URL}/guests/${guest.slug}`;
  const episodes = guest.episodeIds
    .map((id) => getEpisodeById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const quotes = getQuotesForGuest(guest.slug);

  // Person + cited-source structured data so Google can build a knowledge panel.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: guest.name,
    honorificPrefix: guest.honorific || undefined,
    jobTitle: guest.title,
    description: guest.metaDescription,
    image: guest.image ? `${BASE_URL}${guest.image}` : undefined,
    url: pageUrl,
    sameAs: guest.sources.map((s) => s.url),
    subjectOf: episodes.map((ep) => ({
      '@type': 'RadioEpisode',
      name: ep.title,
      url: `${BASE_URL}/episodes/${ep.id}`,
      datePublished: ep.published_date,
    })),
  };

  return (
    <main className="relative min-h-screen bg-black text-stone-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={guest.heroImage}
            alt={fullName}
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.25) saturate(1.4) brightness(0.8)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-10 pb-16">
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase hover:text-shadow-glow transition-colors"
            >
              ← The Rasta Prophet
            </Link>
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
              Guest
            </span>
          </div>

          <div className="pt-16 md:pt-24 flex items-end gap-6">
            {guest.image && (
              <div className="hidden sm:block shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={guest.image}
                  alt={fullName}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-gold/60 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                />
              </div>
            )}
            <div>
              <p className="text-red text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase mb-3">
                Featured on Blessed Love · Voice of Africa
              </p>
              <h1 className="text-3xl md:text-5xl font-black uppercase italic leading-tight tracking-tight drop-shadow-2xl">
                {fullName}
              </h1>
              <p className="mt-3 text-gold font-serif text-base md:text-xl italic leading-snug">
                {guest.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-32 -mt-4">
        <p className="text-lg md:text-xl text-stone-200 leading-relaxed">{guest.lead}</p>

        {/* On-point facts */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-5">
            The Record — Verified
          </h2>
          <ul className="space-y-4">
            {guest.facts.map((fact, i) => (
              <li key={i} className="flex gap-3 text-stone-300 leading-relaxed">
                <span className="text-red font-bold shrink-0">▸</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quotes */}
        {quotes.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-5">
              In Their Own Words
            </h2>
            <div className="space-y-4">
              {quotes.map((q) => (
                <Link
                  key={q.id}
                  href={`/quotes/${q.id}`}
                  className="block group border-l-2 border-gold/50 pl-5 py-2 hover:border-gold transition-colors"
                >
                  <p className="text-stone-200 font-serif italic text-lg leading-snug group-hover:text-gold transition-colors">
                    “{q.text}”
                  </p>
                  <p className="mt-2 text-[11px] text-gold/70 uppercase tracking-widest">
                    Share this quote →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Episodes */}
        {episodes.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-5">
              Hear the Reasoning
            </h2>
            <div className="space-y-3">
              {episodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/episodes/${ep.id}`}
                  className="block p-4 bg-zinc-900/60 border border-gold/20 rounded-lg hover:border-gold/60 transition-colors"
                >
                  <p className="text-[10px] text-stone-400 font-mono uppercase tracking-widest mb-1">
                    Episode {ep.episode_number} · {ep.published_date}
                  </p>
                  <p className="text-gold font-bold">{ep.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {guest.sources.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-stone-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Sources
            </h2>
            <ul className="space-y-2">
              {guest.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-sm text-gold/80 hover:text-gold underline break-words"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            Spread the Word
          </p>
          <ShareButtons url={pageUrl} title={`${fullName} on Blessed Love Voice of Africa`} />
        </div>

        {/* Facebook widget — closes the loop */}
        <div className="mt-12">
          <FacebookPagePlugin />
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="inline-block text-gold text-[11px] font-bold tracking-[0.25em] uppercase border border-gold/40 px-6 py-3 hover:bg-gold hover:text-black transition-colors"
          >
            ← Back to the Archive
          </Link>
        </div>
      </section>
    </main>
  );
}
