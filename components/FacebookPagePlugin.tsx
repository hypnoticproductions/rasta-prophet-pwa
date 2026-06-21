'use client';

import { FACEBOOK_PAGE_URL } from '@/lib/siteConfig';

/**
 * FacebookPagePlugin — embeds the official Facebook Page feed on-site.
 *
 * This is the "widget for Facebook": the same shows and quote cards you push
 * OUT to Facebook get pulled back IN here, so visitors see the live page,
 * recent posts, and a Follow button without leaving the site. Closes the loop:
 *   share quote card -> friend lands on site -> sees the FB feed -> follows.
 *
 * Implementation: the official Page Plugin via an <iframe> (no SDK/script
 * needed, so it works in a static export and won't block the main thread).
 * Configure the page in lib/siteConfig.ts (FACEBOOK_PAGE_URL).
 */

interface FacebookPagePluginProps {
  width?: number;
  height?: number;
  showFeed?: boolean; // timeline tab vs. just the header/CTA
  className?: string;
}

export default function FacebookPagePlugin({
  width = 500,
  height = 600,
  showFeed = true,
  className = '',
}: FacebookPagePluginProps) {
  if (!FACEBOOK_PAGE_URL) return null;

  const tabs = showFeed ? 'timeline' : '';
  const params = new URLSearchParams({
    href: FACEBOOK_PAGE_URL,
    tabs,
    width: String(width),
    height: String(height),
    smallheader: 'false',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'true',
  });

  const src = `https://www.facebook.com/plugins/page.php?${params.toString()}`;

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="w-full max-w-[500px] rounded-xl overflow-hidden border border-gold/30 bg-zinc-900/60 shadow-[0_0_40px_rgba(212,175,55,0.12)]">
        <div className="bg-gradient-to-r from-red/20 via-black to-green/20 px-5 py-3 border-b border-gold/20">
          <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
            Follow on Facebook
          </p>
          <p className="text-stone-400 text-xs mt-0.5">
            Catch every reasoning, clip & quote card as it drops.
          </p>
        </div>
        <iframe
          title="The Rasta Prophet on Facebook"
          src={src}
          width={width}
          height={height}
          style={{ border: 'none', overflow: 'hidden', width: '100%' }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          loading="lazy"
        />
      </div>
    </div>
  );
}
