'use client';

import { useEffect, useState } from 'react';
import { Facebook, Twitter, MessageCircle, Link2, Check } from 'lucide-react';

/**
 * ShareButtons — multi-platform share with built-in referral tracking.
 *
 * Referral loop:
 *  - On mount we read ?ref=<code> from the URL and persist it (localStorage).
 *  - If no code exists yet we mint one and store it.
 *  - Every outgoing share link carries ?ref=<code> so we can later attribute
 *    traffic + reward top sharers. (Attribution read happens in ReferralTracker.)
 *
 * Static-export safe: pure client component, no server calls.
 */

interface ShareButtonsProps {
  url: string; // absolute URL to share
  title: string; // share text / tweet copy
  className?: string;
}

function getOrCreateRefCode(): string {
  if (typeof window === 'undefined') return '';
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get('ref');
    if (incoming) {
      localStorage.setItem('rp_ref', incoming);
      return incoming;
    }
    const existing = localStorage.getItem('rp_ref');
    if (existing) return existing;
    const minted =
      'r' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
    localStorage.setItem('rp_ref', minted);
    return minted;
  } catch {
    return '';
  }
}

export default function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [ref, setRef] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRef(getOrCreateRefCode());
  }, []);

  // Append the referral code to the shared URL.
  const shareUrl = (() => {
    if (!ref) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}ref=${encodeURIComponent(ref)}`;
  })();

  const enc = encodeURIComponent;
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(title)}`,
    whatsapp: `https://wa.me/?text=${enc(title + ' ' + shareUrl)}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — fall back to a prompt.
      window.prompt('Copy this link:', shareUrl);
    }
  };

  const btn =
    'flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-[0.15em] transition-all';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} border-gold/40 text-gold hover:bg-gold hover:text-black`}
        aria-label="Share on Facebook"
      >
        <Facebook size={16} /> Facebook
      </a>
      <a
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} border-gold/40 text-gold hover:bg-gold hover:text-black`}
        aria-label="Share on X / Twitter"
      >
        <Twitter size={16} /> Post
      </a>
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} border-green/50 text-green hover:bg-green hover:text-black`}
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className={`${btn} border-stone-600 text-stone-300 hover:border-gold hover:text-gold`}
        aria-label="Copy link"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
