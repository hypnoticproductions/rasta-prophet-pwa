'use client';

import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAudioStore, formatTime } from '@/lib/store';

export function AudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    progress,
    duration,
    volume,
    setIsPlaying,
    setProgress,
    setDuration,
    setVolume,
  } = useAudioStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = currentEpisode.archive_url;
      audioRef.current.load();
    }
  }, [currentEpisode]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
    }
  };

  if (!currentEpisode) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onCanPlay={() => setIsLoading(false)}
        preload="metadata"
      />
      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-50 audio-player"
      >
        {/* Progress Bar */}
        <div 
          className="w-full h-1 bg-[#4d4d4d] cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * duration;
            if (audioRef.current) {
              audioRef.current.currentTime = percent;
              setProgress(percent);
            }
          }}
        >
          <div 
            className="h-full bg-[#FFD700] relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Episode Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src="/gold-mic.png"
                  alt={currentEpisode.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-medium text-sm truncate hover:underline cursor-pointer">
                  {currentEpisode.title}
                </h3>
                <p className="text-[#B3B3B3] text-xs truncate">
                  Rodniel Theodore
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={skipBackward}
                className="text-[#B3B3B3] hover:text-white transition-colors"
                aria-label="Skip 15 seconds back"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={isLoading}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              
              <button
                onClick={skipForward}
                className="text-[#B3B3B3] hover:text-white transition-colors"
                aria-label="Skip 15 seconds forward"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume & Time */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-[#B3B3B3] text-xs font-mono">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#B3B3B3] hover:text-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 accent-white bg-[#4d4d4d] rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${(isMuted ? 0 : volume) * 100}%, #4d4d4d ${(isMuted ? 0 : volume) * 100}%)`
                }}
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Spacer for player */}
      <div className="h-20" />
    </>
  );
}
