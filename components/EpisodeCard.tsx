'use client';

import { Play, Pause, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Episode } from '@/lib/store';
import { useAudioStore } from '@/lib/store';

interface EpisodeCardProps {
  episode: Episode;
  index: number;
}

export function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentEpisode, isPlaying, setCurrentEpisode, setIsPlaying } = useAudioStore();

  const isCurrentEpisode = currentEpisode?.id === episode.id;
  const isActuallyPlaying = isCurrentEpisode && isPlaying;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrentEpisode) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(episode);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="episode-card flex items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Episode Thumbnail */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
        <img
          src="/gold-mic.png"
          alt={episode.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePlay}
            className="play-button w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center"
          >
            {isActuallyPlaying ? (
              <Pause className="w-6 h-6 text-black" />
            ) : (
              <Play className="w-6 h-6 text-black ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Episode Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-lg mb-1 truncate">
          {episode.title}
        </h3>
        <p className="text-[#B3B3B3] text-sm mb-3 line-clamp-2">
          {episode.description}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#B3B3B3] text-xs">
            <Calendar className="w-3 h-3" />
            <span>{new Date(episode.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1 text-[#B3B3B3] text-xs">
            <Clock className="w-3 h-3" />
            <span>{episode.duration}</span>
          </div>
        </div>
      </div>

      {/* Play Button (visible on hover or when playing) */}
      <button
        onClick={handlePlay}
        className={`play-button w-14 h-14 rounded-full bg-[#1a1a1a] hover:bg-[#282828] flex items-center justify-center flex-shrink-0 ${
          isCurrentEpisode ? 'opacity-100 scale-100' : ''
        }`}
      >
        {isActuallyPlaying ? (
          <div className="flex items-center gap-1">
            <span className="w-1 h-4 bg-[#FFD700] rounded animate-pulse" />
            <span className="w-1 h-4 bg-[#FFD700] rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
            <span className="w-1 h-4 bg-[#FFD700] rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        ) : (
          <Play className="w-6 h-6 text-[#FFD700]" />
        )}
      </button>
    </motion.div>
  );
}
