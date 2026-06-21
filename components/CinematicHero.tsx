/*
 * CinematicHero Component
 *
 * Cinematic crossfading hero banner featuring 13 heritage images from across
 * the African diaspora with Ken-Burns effect (slow zoom + pan).
 *
 * TODO: User needs to provide marquee marketing keywords for the revolving text overlay.
 * These keywords should highlight key themes like:
 * - Pan-African Unity
 * - Cultural Heritage
 * - Voice of Truth
 * - Political Reasoning
 * - Liberation & Freedom
 *
 * Once provided, update the placeholder text in the hero section below.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Heritage images from /public/backgrounds/ - celebrating the African diaspora
const HERITAGE_IMAGES = [
  '/backgrounds/pitons-st-lucia.jpg',
  '/backgrounds/petit-piton.jpg',
  '/backgrounds/victoria-falls.jpg',
  '/backgrounds/table-mountain.jpg',
  '/backgrounds/great-mosque-djenne.jpg',
  '/backgrounds/kaieteur-falls.jpg',
  '/backgrounds/lekki-ikoyi-bridge.jpg',
  '/backgrounds/half-way-tree-clock.jpg',
  '/backgrounds/pitons-soufriere-town.jpg',
  '/backgrounds/piton-peak.jpg',
  '/backgrounds/makola-market.jpg',
  '/backgrounds/renaissance-monument-dakar.jpg',
  '/backgrounds/lalibela-st-george-cross.jpg',
  '/backgrounds/bwindi-silverback-gorilla.jpg',
  '/backgrounds/lalibela-bete-giyorgis.jpg',
  '/backgrounds/bwindi-mountain-gorilla.jpg',
];

const CROSSFADE_DURATION = 7000; // 7 seconds per image

interface CinematicHeroProps {
  onPlayClick: () => void;
  isPlaying: boolean;
}

export default function CinematicHero({ onPlayClick, isPlaying }: CinematicHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERITAGE_IMAGES.length);
    }, CROSSFADE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Cinematic crossfading background with Ken-Burns effect */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div
              className="ken-burns-container w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${HERITAGE_IMAGES[currentImageIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <nav className="p-6 md:p-10 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-[2px] bg-red" />
            <div>
              <h3 className="text-gold font-bold tracking-[0.2em] text-sm md:text-lg uppercase text-shadow-glow">
                The Rasta Prophet
              </h3>
              <p className="text-[9px] text-stone-400 uppercase tracking-widest">
                Blessed Love Voice of Africa
              </p>
            </div>
          </div>
          <img
            src="https://www.blazin993.com/uploads/1/2/5/0/125013032/editor/blazin-logo.png?1661003091"
            alt="Blazin Logo"
            className="w-20 md:w-28 opacity-90 hover:opacity-100 transition-opacity"
          />
        </nav>

        {/* Main hero text - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <h2 className="text-gold text-sm md:text-base font-serif tracking-[0.5em] uppercase mb-4 opacity-80">
              The Vibration of Truth
            </h2>

            {/* TODO: Add revolving text overlay here once user provides marquee marketing keywords */}
            {/* Example: "Pan-African Unity • Cultural Heritage • Voice of the People" */}
            <div className="mb-6 text-stone-300 text-xs md:text-sm tracking-[0.3em] uppercase opacity-70 italic">
              {/* PLACEHOLDER - awaiting marketing keywords from user */}
              Pan-African Unity • Cultural Heritage • Voice of Truth
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 italic leading-none drop-shadow-2xl">
              Join the <br /> <span className="text-red">Movement</span>
            </h1>
          </motion.div>

          <button
            onClick={onPlayClick}
            className="group relative px-14 py-5 bg-transparent overflow-hidden border border-gold/40 hover:border-gold transition-colors"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-gold group-hover:text-black font-bold text-xl uppercase tracking-[0.25em]">
              {isPlaying ? 'Pause Session' : 'Begin The Reasoning'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
