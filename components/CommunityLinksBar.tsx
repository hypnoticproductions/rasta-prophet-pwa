'use client';

import { MessageCircle, Users, Send } from 'lucide-react';

/**
 * CommunityLinksBar — Persistent bar for Discord/Telegram/WhatsApp Community
 *
 * Place this above the email capture or in the footer.
 * Gives users a clear path to join the movement beyond just listening.
 *
 * TODO: Add your actual community links
 */

const COMMUNITY_LINKS = [
  {
    name: 'WhatsApp Community',
    icon: MessageCircle,
    url: 'https://wa.me/17584863825?text=Blessings%20Rodniel%2C%20I%20want%20to%20join%20the%20community.',
    description: 'Direct line to Prophet Alem & the family',
  },
  {
    name: 'Telegram Channel',
    icon: Send,
    url: '#', // TODO: Add Telegram link
    description: 'Daily reasoning & real-time updates',
  },
  {
    name: 'Discord Server',
    icon: Users,
    url: '#', // TODO: Add Discord link
    description: 'The Reasoning Room — organize with the movement',
  },
];

export default function CommunityLinksBar() {
  return (
    <div className="bg-black/90 border-t border-gold/20 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-gold font-bold uppercase tracking-[0.25em] text-sm mb-1">
          Join the Movement
        </h3>
        <p className="text-stone-400 text-sm mb-6">
          This is not passive listening — this is organizing. Link up with the family.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMMUNITY_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 bg-zinc-900/60 border border-gold/20 rounded-lg hover:border-gold/60 hover:bg-zinc-900 transition-all"
            >
              <link.icon className="text-gold mt-1 group-hover:scale-110 transition-transform" size={24} />
              <div>
                <p className="text-gold font-bold uppercase tracking-[0.15em] text-xs mb-1 group-hover:text-shadow-glow">
                  {link.name}
                </p>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
