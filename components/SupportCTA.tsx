'use client';

import { DollarSign, Heart, Share2 } from 'lucide-react';

/**
 * SupportCTA — Donation / Support Card
 *
 * Gives listeners a clear path to financially support the show.
 * Place at the bottom of episode pages or in the footer.
 *
 * TODO: Add your Patreon, Ko-fi, or direct payment links
 */

export default function SupportCTA() {
  return (
    <div className="bg-gradient-to-br from-red/10 via-black to-green/10 border border-gold/30 rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <Heart className="text-red mt-1" size={32} fill="currentColor" />
        <div>
          <h3 className="text-gold font-bold uppercase tracking-[0.2em] text-base md:text-lg mb-2">
            Support the Voice of Africa
          </h3>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            This show is funded by the people, not advertisers. If the reasoning moves you, if the truth hits
            home, if you want Prophet Alem to keep chanting down Babylon — support the mission.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Patreon / recurring */}
        <a
          href="#" // TODO: Add Patreon link
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-4 bg-gold/10 border border-gold/40 rounded-lg hover:bg-gold hover:text-black transition-all"
        >
          <DollarSign className="text-gold group-hover:text-black" size={24} />
          <div>
            <p className="font-bold uppercase tracking-[0.15em] text-xs text-gold group-hover:text-black">
              Monthly Support
            </p>
            <p className="text-xs text-stone-400 group-hover:text-black/80">
              Patreon — $5/mo & up
            </p>
          </div>
        </a>

        {/* One-time / Ko-fi */}
        <a
          href="#" // TODO: Add Ko-fi or direct payment link
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-4 bg-green/10 border border-green/40 rounded-lg hover:bg-green hover:text-black transition-all"
        >
          <Share2 className="text-green group-hover:text-black" size={24} />
          <div>
            <p className="font-bold uppercase tracking-[0.15em] text-xs text-green group-hover:text-black">
              One-Time Gift
            </p>
            <p className="text-xs text-stone-400 group-hover:text-black/80">
              Ko-fi, PayPal, or Cash App
            </p>
          </div>
        </a>
      </div>

      <p className="mt-6 text-stone-500 text-xs text-center italic">
        Every contribution keeps the frequency alive. Blessed Love.
      </p>
    </div>
  );
}
