import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllEpisodes,
  getEpisodeById,
  type Episode,
} from "@/data/episodes";
import { getPostById } from "@/data/posts/index";
import { featuredGuest } from "@/data/featured";
import { getGuestsForEpisode } from "@/data/guests";
import { getEpisodeImage } from "@/data/episodeImages";
import {
  isBlackStarPromo,
  BLACK_STAR_TAGLINES,
  BLACK_STAR_SHARE_TAGLINE,
} from "@/data/blackStarRoots";
import { BASE_URL, SITE_NAME } from "@/lib/siteConfig";
import ShareButtons from "@/components/ShareButtons";
import FacebookPagePlugin from "@/components/FacebookPagePlugin";
import EpisodeCarousel from "@/components/EpisodeCarousel";
import { getEpisodeMedia } from "@/data/episodeMedia";

// Pre-render all 35 episode pages at build time.
export function generateStaticParams() {
  return getAllEpisodes().map((ep) => ({ id: ep.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const episode = getEpisodeById(params.id);

  if (!episode) {
    return {
      title: "Episode Not Found — The Rasta Prophet",
      description: "This broadcast could not be found.",
    };
  }

  const post = getPostById(params.id);
  const baseDescription = post?.teaser ?? episode.description;
  // Promo-hour shows carry the Black Star Roots tagline in their preview.
  const description = isBlackStarPromo(episode.id)
    ? `${baseDescription} ${BLACK_STAR_SHARE_TAGLINE}`
    : baseDescription;
  const pageUrl = `${BASE_URL}/episodes/${episode.id}`;
  const ogImage = `${pageUrl}/opengraph-image`;

  // Pull guest names + keywords into the episode's SEO so searches for the
  // guest (e.g. "David Comissiong CARICOM") surface this broadcast.
  const episodeGuests = getGuestsForEpisode(episode.id);
  const guestNames = episodeGuests.map((g) => g.name);
  const seoTitle = guestNames.length
    ? `${episode.title} — ft. ${guestNames.join(" & ")}`
    : episode.title;
  const keywords = [
    "Blessed Love Voice of Africa",
    "The Rasta Prophet",
    "Prophet Alem",
    "Blazin 99.3",
    ...episodeGuests.flatMap((g) => g.keywords),
  ];

  return {
    metadataBase: new URL(BASE_URL),
    title: seoTitle,
    description,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "music.song",
      title: episode.title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: episode.title,
          type: "image/png",
        },
      ],
      audio: [
        {
          url: episode.archive_url,
          type: "audio/mpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description,
      images: [ogImage],
    },
  };
}

// Format the published date in a readable form.
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Split a long body string into readable paragraphs.
function toParagraphs(body: string): string[] {
  return body
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function EpisodePage({
  params,
}: {
  params: { id: string };
}) {
  const episode: Episode | undefined = getEpisodeById(params.id);

  if (!episode) {
    notFound();
  }

  const post = getPostById(params.id);
  const teaser = post?.teaser ?? episode.description;
  const hook = post?.hook ?? "The Vibration of Truth";
  const bodyParagraphs = post ? toParagraphs(post.body) : [];
  const hashtags = post?.hashtags ?? [];
  const heroImage = getEpisodeImage(episode.id);
  const pageUrl = `${BASE_URL}/episodes/${episode.id}`;
  const isFeatured = episode.id === featuredGuest.episodeId;
  const isPromo = isBlackStarPromo(episode.id);
  const episodeGuests = getGuestsForEpisode(episode.id);

  // RadioEpisode structured data so Google understands this as an episode with
  // an audio enclosure and (when present) named guests.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioEpisode",
    name: episode.title,
    datePublished: episode.published_date,
    description: teaser,
    url: pageUrl,
    partOfSeries: {
      "@type": "RadioSeries",
      name: "Blessed Love Voice of Africa",
    },
    associatedMedia: {
      "@type": "AudioObject",
      contentUrl: episode.archive_url,
      encodingFormat: "audio/mpeg",
    },
    actor: episodeGuests.map((g) => ({
      "@type": "Person",
      name: g.name,
      url: `${BASE_URL}/guests/${g.slug}`,
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
            src={heroImage}
            alt={episode.title}
            className="w-full h-full object-cover"
            style={{
              filter: "contrast(1.25) saturate(1.4) brightness(0.85)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-10 pb-16">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-16">
            <Link
              href="/"
              className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase hover:text-shadow-glow transition-colors"
            >
              ← The Rasta Prophet
            </Link>
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
              Episode {episode.episode_number}
            </span>
          </div>

          <div className="pt-20 md:pt-28">
            <p className="text-red text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase mb-4">
              Blessed Love · Voice of Africa
            </p>
            <h1 className="text-3xl md:text-5xl font-black uppercase italic leading-tight tracking-tight drop-shadow-2xl mb-5">
              {episode.title}
            </h1>
            <p className="text-gold font-serif text-lg md:text-2xl italic leading-snug max-w-3xl">
              {hook}
            </p>
            <p className="mt-6 text-[11px] text-stone-400 font-mono uppercase tracking-widest">
              {formatDate(episode.published_date)}
              {episode.duration ? ` · ${episode.duration}` : ""}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-32 -mt-6">
        {/* Featured guest tagline for episode 35 */}
        {isFeatured && (
          <div className="mb-8 border-l-2 border-gold pl-5 py-2">
            <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
              Featured Guest — {featuredGuest.honorific} {featuredGuest.name}
            </p>
            <p className="text-gold font-serif text-base md:text-lg italic leading-snug">
              {featuredGuest.tagline}
            </p>
          </div>
        )}

        {getEpisodeMedia(episode.id) && (
          <div className="mb-8">
            <EpisodeCarousel cards={getEpisodeMedia(episode.id)!.cards} />
          </div>
        )}

        {/* AUDIO PLAYER — server-rendered native element so it works without JS */}
        <div className="bg-zinc-900/70 border border-gold/30 rounded-xl p-5 md:p-6 backdrop-blur-sm shadow-[0_0_40px_rgba(212,175,55,0.12)]">
          <p className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
            Listen to the Reasoning
          </p>
          <audio
            controls
            preload="none"
            src={episode.archive_url}
            className="w-full"
          >
            Your browser does not support the audio element.{" "}
            <a href={episode.archive_url} className="text-gold underline">
              Download the show
            </a>
            .
          </audio>
        </div>

        {/* BLACK STAR ROOTS PROMO STRIP — promo-hour episodes only */}
        {isPromo && (
          <div className="mt-8 rounded-xl overflow-hidden border border-gold/30 bg-gradient-to-r from-red/20 via-black to-green/20 p-5 md:p-6">
            <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
              Promo Hour · Black Star Roots
            </p>
            <h3 className="text-gold font-black uppercase tracking-widest text-lg md:text-xl mb-3">
              Roots Tonic Wine — 100% All Natural
            </h3>
            <div className="flex flex-wrap gap-2">
              {BLACK_STAR_TAGLINES.map((phrase) => (
                <span
                  key={phrase}
                  className="px-4 py-1.5 border border-gold/40 rounded-full text-gold text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] bg-black/40"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* TEASER */}
        <p className="mt-10 text-lg md:text-xl text-stone-200 leading-relaxed">
          {teaser}
        </p>

        {/* COLLAPSIBLE ARTICLE */}
        {bodyParagraphs.length > 0 && (
          <details className="group mt-8 border-t border-white/10 pt-6">
            <summary className="cursor-pointer list-none flex items-center gap-3 text-gold font-bold uppercase tracking-[0.2em] text-sm select-none">
              <span className="inline-block transition-transform group-open:rotate-90">
                ▶
              </span>
              Read the Full Reasoning
            </summary>
            <div className="mt-5 space-y-4">
              {bodyParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-stone-300 text-base md:text-[17px] leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </details>
        )}

        {/* HASHTAGS */}
        {hashtags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-gold border border-gold/30 rounded-full px-3 py-1 hover:bg-gold hover:text-black transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* GUEST CROSS-LINKS — drive SEO juice + deeper sessions */}
        {episodeGuests.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              Featured Guests
            </p>
            <div className="space-y-3">
              {episodeGuests.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guests/${g.slug}`}
                  className="flex items-center gap-4 p-4 bg-zinc-900/60 border border-gold/20 rounded-lg hover:border-gold/60 transition-colors"
                >
                  {g.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={g.image}
                      alt={g.name}
                      className="w-14 h-14 rounded-full object-cover border border-gold/40"
                    />
                  )}
                  <div>
                    <p className="text-gold font-bold">
                      {g.honorific ? g.honorific + " " : ""}
                      {g.name} →
                    </p>
                    <p className="text-stone-400 text-xs">{g.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SHARE */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            Share This Show
          </p>
          <p className="text-stone-400 text-sm mb-4 leading-relaxed">
            Spread the word and let Jah light reach the family. Every share
            carries a big-picture preview — and credits you in the movement.
          </p>
          <ShareButtons url={pageUrl} title={`${episode.title} — Blessed Love Voice of Africa`} />
          <code className="mt-4 block bg-zinc-900 border border-gold/20 rounded-lg px-4 py-3 text-sm text-gold break-all">
            {pageUrl}
          </code>
        </div>

        {/* FACEBOOK WIDGET — closes the share loop */}
        <div className="mt-12">
          <FacebookPagePlugin />
        </div>

        {/* Back link */}
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
