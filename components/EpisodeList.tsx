'use client';

import { Episode } from '@/lib/store';
import { EpisodeCard } from './EpisodeCard';

interface EpisodeListProps {
  episodes: Episode[];
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎙️</div>
        <h3 className="font-heading text-2xl text-gray-400 mb-2">
          No Episodes Yet
        </h3>
        <p className="font-body text-gray-500">
          The vault is empty. Check back soon for new content.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode, index) => (
        <EpisodeCard key={episode.id} episode={episode} index={index} />
      ))}
    </div>
  );
}
