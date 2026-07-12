'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getAllEpisodes, getEpisodeById, Episode } from '@/data/episodes';
import { featuredGuest } from '@/data/featured';
import CinematicHero from '@/components/CinematicHero';
import EpisodeCarousel from '@/components/EpisodeCarousel';
import FeatureVideo from '@/components/FeatureVideo';
import { getEpisodeMedia } from '@/data/episodeMedia';

// --- CONFIGURATION & ASSETS ---
const ASSETS = {
  prophetImg: "/prophet-alem.png",
  blazinLogo: "https://www.blazin993.com/uploads/1/2/5/0/125013032/editor/blazin-logo.png?1661003091",
  whatsappLink: "https://wa.me/17584863825?text=Blessings%20Rodniel%2C%20I%20am%20reaching%20out%20from%20The%20Rasta%20Prophet%20App.",
  bottleVideo: "https://res.cloudinary.com/dd6z9fx5m/video/upload/v1769210282/grok-video-ec8ab583-f70a-4ae5-9f75-f7de21d4dced_q1kceu.mp4"
};

const COLORS = {
  red: "#FF0000",
  gold: "#D4AF37",
  green: "#006400",
  black: "#050505"
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Helper function to extract category from title
const getCategory = (title: string) => {
  if (title.includes('CARIBBEAN')) return 'Political Reasoning';
  if (title.includes('VENEZUELA')) return 'Global Truth';
  if (title.includes('BLACK') || title.includes('ROOTS')) return 'Cultural Heritage';
  if (title.includes('INTERVIEW')) return 'Special Interview';
  return 'Voice of Africa';
};

// Helper function to format time (seconds -> H:MM:SS or M:SS)
const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const ProphetCanvas = ({ isPlaying }: { isPlaying: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number, animationFrameId: number;

    const particles: Particle[] = [];
    const particleCount = isPlaying ? 120 : 30;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      decay: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 0;
        this.color = '';
        this.life = 0;
        this.decay = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 50;
        this.vx = (Math.random() - 0.5) * (isPlaying ? 2.5 : 1);
        this.vy = -Math.random() * (isPlaying ? 4 : 1.5) - 0.5;
        this.size = Math.random() * (isPlaying ? 5 : 2) + 1;
        this.color = [COLORS.red, COLORS.gold, COLORS.green][Math.floor(Math.random() * 3)];
        this.life = 1;
        this.decay = Math.random() * 0.004 + 0.001;
      }

      update() {
        this.x += this.vx + Math.sin(this.y * 0.01) * 0.5;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
      }

      draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = this.life * 0.6;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const barCount = 100;
      const barWidth = width / barCount;
      for (let i = 0; i < barCount; i++) {
        const multiplier = isPlaying ? 80 : 15;
        const h = Math.abs(Math.sin(time * 0.002 + i * 0.1)) * multiplier;
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = i % 3 === 0 ? COLORS.red : i % 3 === 1 ? COLORS.gold : COLORS.green;
        ctx.fillRect(i * barWidth, height - h, barWidth - 1, h);
      }

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [featureTab, setFeatureTab] = useState<'overview' | 'feature' | 'quotes'>('overview');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get all episodes
  const episodes = getAllEpisodes();

  // The episode tied to this week's featured guest
  const featuredEpisode = getEpisodeById(featuredGuest.episodeId);
  const thisWeekMedia = getEpisodeMedia("39");
  const featuredIsActive = activeTrack?.id === featuredGuest.episodeId;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Deep-link support: ?ep=<id> selects the shared episode on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const epId = params.get('ep');
    if (epId) {
      const ep = episodes.find((e) => e.id === epId);
      if (ep) {
        setActiveTrack(ep);
        // Scroll to the archive so the listener sees the show
        setTimeout(() => {
          document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' });
        }, 1600);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlay = (track: Episode) => {
    if (activeTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
        celebrateVibes();
      }
    } else {
      setCurrentTime(0);
      setDuration(0);
      setActiveTrack(track);
      setIsPlaying(true);
      celebrateVibes();
    }
  };

  // Fire a big lion+fire celebration burst (handled by VibesLayer).
  const celebrateVibes = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vibes:celebrate'));
    }
  };

  // Skip forward / rewind by a number of seconds
  const skip = (amount: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = duration || audio.duration || 0;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + amount), max);
    setCurrentTime(audio.currentTime);
  };

  // Seek via the scrubber
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Share a specific show (native share sheet, falls back to clipboard)
  const handleShare = async (episode: Episode, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const shareUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/?ep=${episode.id}`
        : episode.archive_url;
    const shareData = {
      title: episode.title,
      text: `Listen to "${episode.title}" on The Rasta Prophet — Blessed Love Voice of Africa 🦁`,
      url: shareUrl,
    };
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setToast('Link copied to clipboard!');
        setTimeout(() => setToast(null), 2500);
      }
    } catch (err) {
      // User cancelled the share sheet — no action needed
    }
  };

  useEffect(() => {
    if (activeTrack && audioRef.current) {
      // Only reset the source when the track actually changes
      if (audioRef.current.src !== activeTrack.archive_url) {
        audioRef.current.src = activeTrack.archive_url;
      }
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [activeTrack, isPlaying]);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden text-stone-100 font-sans">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <motion.img
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              src={ASSETS.blazinLogo}
              alt="Blazin Logo"
              className="w-32"
            />
            <h2 className="text-gold tracking-[0.8em] font-serif uppercase mt-8 text-sm">Reasoning Imminent...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <ProphetCanvas isPlaying={isPlaying} />

      <div className="relative z-20">

        {/* CINEMATIC HERO SECTION - 13 image crossfade with Ken-Burns effect */}
        <CinematicHero
          onPlayClick={() => episodes.length > 0 && handlePlay(episodes[0])}
          isPlaying={isPlaying}
        />

        {/* IDENTITY STRIP - Prophet Alem */}
        <section className="px-6 py-16 bg-gradient-to-b from-black to-[#0a0a0a] border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative rounded-lg overflow-hidden border-2 border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                  <img
                    src={ASSETS.prophetImg}
                    alt="Prophet Alem - Rodneil Theodore"
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-[3px] bg-red" />
                  <div>
                    <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase">The Voice</p>
                    <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tight text-white">
                      Prophet Alem
                    </h3>
                  </div>
                </div>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                  Broadcasting the unfiltered truth from the heart of the African diaspora.
                  Rodneil Theodore, known as Prophet Alem, brings political reasoning, cultural heritage,
                  and Pan-African consciousness to the airwaves every week on Blazin 99.3 FM.
                </p>
                <p className="text-gold font-serif text-sm md:text-base italic">
                  &quot;The truth shall make you free, but first it will make you uncomfortable.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROMOS SECTION - Black Star Roots Video */}
        <section className="px-8 py-20 bg-black/40 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-10">
              <div className="h-8 w-[3px] bg-gold" />
              <div>
                <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase">Featured Content</p>
                <h2 className="text-2xl md:text-3xl font-bold uppercase italic tracking-tight text-white/90">
                  Promos & Highlights
                </h2>
              </div>
            </div>
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <div className="w-full aspect-video rounded-lg overflow-hidden border-2 border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative group">
                <video
                  className="w-full h-full object-cover"
                  src={ASSETS.bottleVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 text-left">
                  <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Black Star Roots</p>
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xl mb-1">Roots Tonic Wine</h3>
                  <p className="text-white font-black uppercase tracking-[0.2em] text-sm">Stamina For Life</p>
                </div>
              </div>

              {/* Black Star Roots — marketing catch phrases */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {['Stamina For Life', 'The Natural Machine', 'Look Out For It'].map((phrase) => (
                  <span
                    key={phrase}
                    className="px-5 py-2 border border-gold/40 rounded-full text-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] bg-black/30"
                  >
                    {phrase}
                  </span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-6 text-stone-400 text-sm md:text-base italic max-w-2xl text-center leading-relaxed"
              >
                &quot;100% all natural roots tonic wine — Bois Bande, Gomier, Kalkuh roots and
                more. Nourish the temple. The Natural Machine. Look out for it.&quot;
              </motion.p>
            </div>
          </div>
        </section>

        {/* FEATURED GUEST SPOTLIGHT */}
        {thisWeekMedia && (
          <section id="this-week" className="px-6 md:px-8 pt-16 pb-8 bg-gradient-to-b from-black to-[#0a0a0a]">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-[3px] bg-red" />
                <div>
                  <p className="text-red text-[10px] font-bold tracking-[0.35em] uppercase">This Week On Air</p>
                  <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tight text-white">One Day Nearer Home — The Antics Exposed</h2>
                </div>
              </div>
              <FeatureVideo src={thisWeekMedia.videoUrl} />
              <div className="mt-6">
                <EpisodeCarousel cards={thisWeekMedia.cards} />
              </div>
              <div className="mt-6 text-center">
                <a href="/episodes/39" className="inline-block px-8 py-3 bg-gold text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold/90 transition-colors rounded-lg">Hear the Full Reasoning</a>
              </div>
            </div>
          </section>
        )}

        {featuredEpisode && (
          <section id="featured" className="px-6 md:px-8 py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black border-y border-gold/20">
            <div className="max-w-7xl mx-auto">
              {/* Section heading */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-[3px] bg-gold" />
                  <div>
                    <p className="text-red text-[10px] font-bold tracking-[0.3em] uppercase">Featured Reasoning</p>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase italic tracking-tight text-white/90">This Week&apos;s Reasoning — {featuredGuest.showDate}</h2>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red rounded-full animate-pulse" />
                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">Special Broadcast</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* LEFT — Guest portrait + player */}
                <div className="lg:col-span-2">
                  <div className="relative rounded-xl overflow-hidden border-2 border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.18)]">
                    <div className="w-full bg-black flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredGuest.image}
                        alt={featuredGuest.name}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    {featuredIsActive && isPlaying && (
                      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 px-3 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
                        <span className="text-[9px] text-gold font-bold uppercase tracking-widest">On Air</span>
                      </div>
                    )}
                    <div className="bg-black/60 px-4 py-3 border-t border-gold/20">
                      <p className="text-gold text-[13px] font-black uppercase tracking-[0.15em] mb-1">{featuredGuest.name}</p>
                      <p className="text-stone-300 text-[11px] leading-snug">{featuredGuest.title}</p>
                    </div>
                  </div>

                  {/* Player + share for the featured show */}
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => handlePlay(featuredEpisode)}
                      className="group relative flex-1 px-6 py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 hover:bg-gold/90 transition-colors"
                    >
                      <span className="text-lg">{featuredIsActive && isPlaying ? '⏸' : '▶'}</span>
                      {featuredIsActive && isPlaying ? 'Pause The Reasoning' : 'Play This Show'}
                    </button>
                    <button
                      onClick={(e) => handleShare(featuredEpisode, e)}
                      aria-label="Share this show"
                      className="px-5 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-3 text-[9px] text-stone-600 italic">{featuredGuest.imageCredit}</p>
                </div>

                {/* RIGHT — Tabbed write-up */}
                <div className="lg:col-span-3">
                  <p className="text-gold font-serif text-lg md:text-xl italic mb-6 leading-snug">
                    {featuredGuest.tagline}
                  </p>

                  {/* Tabs */}
                  <div className="flex space-x-1 border-b border-white/10 mb-6">
                    {([
                      { key: 'overview', label: 'Overview' },
                      { key: 'feature', label: 'Full Feature' },
                      { key: 'quotes', label: 'In His Words' },
                    ] as const).map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setFeatureTab(tab.key)}
                        className={`relative px-4 md:px-6 py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors ${
                          featureTab === tab.key ? 'text-gold' : 'text-stone-500 hover:text-stone-300'
                        }`}
                      >
                        {tab.label}
                        {featureTab === tab.key && (
                          <motion.div layoutId="featureTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="min-h-[18rem]">
                    <AnimatePresence mode="wait">
                      {featureTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          {featuredGuest.intro.map((p, i) => (
                            <p key={i} className="text-stone-300 text-sm md:text-base leading-relaxed">{p}</p>
                          ))}
                        </motion.div>
                      )}

                      {featureTab === 'feature' && (
                        <motion.div
                          key="feature"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-7"
                        >
                          {featuredGuest.sections.map((sec, i) => (
                            <div key={i}>
                              <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-3">{sec.heading}</h4>
                              <div className="space-y-3">
                                {sec.body.map((p, j) => (
                                  <p key={j} className="text-stone-300 text-sm md:text-[15px] leading-relaxed">{p}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {featuredGuest.hashtags.map((tag) => (
                              <span key={tag} className="text-[10px] text-green-500/80 font-mono">#{tag}</span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {featureTab === 'quotes' && (
                        <motion.div
                          key="quotes"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6"
                        >
                          {featuredGuest.quotes.map((q, i) => (
                            <blockquote key={i} className="border-l-2 border-gold pl-5 py-1">
                              <p className="text-white/90 text-base md:text-lg font-serif italic leading-snug mb-2">&ldquo;{q.text}&rdquo;</p>
                              <footer className="text-[11px] text-stone-500 uppercase tracking-widest">— {q.attribution}</footer>
                            </blockquote>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ARCHIVE SECTION */}
        <section id="episodes" className="px-8 pb-32 bg-black/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12 pt-16">
              <h2 className="text-3xl font-bold uppercase italic tracking-tight text-white/90">The Archive of Wisdom</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red rounded-full animate-pulse" />
                <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">Broadcast Feed</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {episodes.map((ep) => (
                <Link key={ep.id} href={`/episodes/${ep.id}`} className="block">
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", y: -5 }}
                    className={`border border-white/5 p-6 transition-all cursor-pointer relative ${activeTrack?.id === ep.id ? 'border-gold/60 bg-white/5' : ''}`}
                  >
                    <p className="text-red text-[9px] font-bold tracking-[0.2em] mb-1 uppercase">{getCategory(ep.title)}</p>
                    <h4 className="text-xl font-bold mb-6 min-h-[3.5rem] leading-tight">{ep.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-mono uppercase">
                        {formatDate(ep.published_date)} {ep.duration ? `— ${ep.duration}` : ''}
                      </span>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => handleShare(ep, e)}
                          aria-label="Share this show"
                          className="text-stone-400 hover:text-gold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePlay(ep);
                          }}
                          aria-label={activeTrack?.id === ep.id && isPlaying ? "Pause" : "Play"}
                          className="text-gold text-lg hover:scale-110 transition-transform"
                        >
                          {activeTrack?.id === ep.id && isPlaying ? '⏸' : '▶'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PERSISTENT FOOTER PLAYER */}
        <AnimatePresence>
          {activeTrack && (
            <motion.div
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              exit={{ y: 120 }}
              className="fixed bottom-0 left-0 w-full z-50 bg-black/98 backdrop-blur-2xl border-t border-gold/30 shadow-[0_-10px_40px_rgba(0,0,0,0.9)]"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex flex-col gap-3">

                {/* SEEK BAR ROW */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-stone-400 font-mono w-12 text-right tabular-nums">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    step="any"
                    onChange={handleSeek}
                    aria-label="Seek"
                    className="seek-bar flex-1"
                    style={{
                      background: `linear-gradient(to right, ${COLORS.gold} 0%, ${COLORS.gold} ${
                        duration ? (currentTime / duration) * 100 : 0
                      }%, rgba(255,255,255,0.12) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.12) 100%)`,
                    }}
                  />
                  <span className="text-[10px] text-stone-400 font-mono w-12 tabular-nums">{formatTime(duration)}</span>
                </div>

                {/* CONTROLS ROW */}
                <div className="flex items-center justify-between gap-3">
                  {/* Track info */}
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-zinc-900 border border-gold/20 flex items-center justify-center text-[9px] font-bold text-gold shrink-0">
                      {isPlaying ? 'LIVE' : 'PLAY'}
                    </div>
                    <div className="overflow-hidden">
                      <h5 className="font-bold text-xs uppercase truncate">{activeTrack.title}</h5>
                      <p className="text-[9px] text-stone-500 uppercase tracking-widest">Rodneil Theodore / Prophet Alem</p>
                    </div>
                  </div>

                  {/* Transport controls */}
                  <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
                    {/* Rewind 15s */}
                    <button
                      onClick={() => skip(-15)}
                      aria-label="Rewind 15 seconds"
                      className="relative text-stone-300 hover:text-gold transition-colors"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9l5 4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9h7a5 5 0 0 1 0 10h-1" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold mt-1">15</span>
                    </button>

                    {/* Play / Pause */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="w-11 h-11 rounded-full bg-gold text-black flex items-center justify-center text-xl hover:scale-110 transition-transform shrink-0"
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>

                    {/* Forward 15s */}
                    <button
                      onClick={() => skip(15)}
                      aria-label="Forward 15 seconds"
                      className="relative text-stone-300 hover:text-gold transition-colors"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l5 4-5 4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9h-7a5 5 0 0 0 0 10h1" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold mt-1">15</span>
                    </button>

                    {/* Share current show */}
                    <button
                      onClick={(e) => handleShare(activeTrack, e)}
                      aria-label="Share this show"
                      className="text-stone-300 hover:text-gold transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </button>

                    {/* Connect */}
                    <a
                      href={ASSETS.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:block text-[10px] font-bold text-green-500 border border-green-500/50 px-5 py-2 hover:bg-green-500 hover:text-black transition-all uppercase tracking-widest"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[60] bg-gold text-black text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
