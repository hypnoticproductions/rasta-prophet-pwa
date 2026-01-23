import { create } from 'zustand';

export interface Episode {
  id: string;
  title: string;
  description: string;
  archive_url: string;
  published_date: string;
  duration?: string;
  episode_number: number;
}

interface AudioState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  setCurrentEpisode: (episode: Episode | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentEpisode: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 1,
  setCurrentEpisode: (episode) => set({ currentEpisode: episode, isPlaying: !!episode }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  reset: () => set({ currentEpisode: null, isPlaying: false, progress: 0, duration: 0 }),
}));

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
