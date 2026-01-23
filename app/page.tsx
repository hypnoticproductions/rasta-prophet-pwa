'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllEpisodes, Episode } from '@/data/episodes';

// --- CONFIGURATION & ASSETS ---
const ASSETS = {
  prophetImg: "https://res.cloudinary.com/dd6z9fx5m/image/upload/v1769202027/Generated_Image_January_23_2026_-_4_44PM_i9awnk.jpg",
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
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get all episodes
  const episodes = getAllEpisodes();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (track: Episode) => {
    if (activeTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (activeTrack && audioRef.current) {
      audioRef.current.src = activeTrack.archive_url;
      if (isPlaying) {
        audioRef.current.play();
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

      {/* BACKGROUND IMAGE - POSITIONED FOR CLEAR FACE VISIBILITY */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{ scale: isPlaying ? 1.05 : 1, opacity: isPlaying ? 0.8 : 0.65 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
          className="w-full h-full bg-cover bg-[center_15%]"
          style={{ backgroundImage: `url(${ASSETS.prophetImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      <ProphetCanvas isPlaying={isPlaying} />

      <div className="relative z-20 flex flex-col min-h-screen">

        {/* NAV */}
        <nav className="p-6 md:p-10 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-[2px] bg-red" />
            <div>
              <h3 className="text-gold font-bold tracking-[0.2em] text-sm md:text-lg uppercase text-shadow-glow">The Rasta Prophet</h3>
              <p className="text-[9px] text-stone-400 uppercase tracking-widest">Blessed Love Voice of Africa</p>
            </div>
          </div>
          <img src={ASSETS.blazinLogo} alt="Blazin Logo" className="w-20 md:w-28 opacity-90 hover:opacity-100 transition-opacity" />
        </nav>

        {/* HERO SECTION */}
        <section className="px-8 mt-auto mb-20 md:mb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-gold text-sm md:text-base font-serif tracking-[0.5em] uppercase mb-4 opacity-80">The Vibration of Truth</h2>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 italic leading-none drop-shadow-2xl">
              Join the <br/> <span className="text-red">Movement</span>
            </h1>
          </motion.div>

          <button
            onClick={() => episodes.length > 0 && handlePlay(episodes[0])}
            className="group relative px-14 py-5 bg-transparent overflow-hidden border border-gold/40 hover:border-gold transition-colors"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-gold group-hover:text-black font-bold text-xl uppercase tracking-[0.25em]">
              {isPlaying ? 'Pause Session' : 'Begin The Reasoning'}
            </span>
          </button>
        </section>

        {/* NEW VIDEO SPOTLIGHT SECTION */}
        <section className="px-8 py-20 bg-black/40 backdrop-blur-sm border-y border-white/5">
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
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xl mb-1">Prophetic Sustenance</h3>
                  <p className="text-stone-300 text-xs italic">Pure Energy for the Royal Order</p>
                </div>
             </div>
             <motion.p
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="mt-8 text-stone-400 text-sm md:text-base italic max-w-2xl text-center leading-relaxed"
             >
               &quot;Nourishing the temple is the first step to liberation. Observe the vessel of strength.&quot;
             </motion.p>
           </div>
        </section>

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
                <motion.div
                  key={ep.id}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", y: -5 }}
                  className={`border border-white/5 p-6 transition-all cursor-pointer relative ${activeTrack?.id === ep.id ? 'border-gold/60 bg-white/5' : ''}`}
                  onClick={() => handlePlay(ep)}
                >
                  <p className="text-red text-[9px] font-bold tracking-[0.2em] mb-1 uppercase">{getCategory(ep.title)}</p>
                  <h4 className="text-xl font-bold mb-6 min-h-[3.5rem] leading-tight">{ep.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-stone-500 font-mono uppercase">
                      {formatDate(ep.published_date)} {ep.duration ? `— ${ep.duration}` : ''}
                    </span>
                    <div className="text-gold text-lg">
                      {activeTrack?.id === ep.id && isPlaying ? '⏸' : '▶'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PERSISTENT FOOTER PLAYER */}
        <AnimatePresence>
          {activeTrack && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-0 left-0 w-full z-50 bg-black/98 backdrop-blur-2xl border-t border-gold/30 p-5 md:px-12 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center space-x-4 max-w-[50%]">
                <div className="w-10 h-10 bg-zinc-900 border border-gold/20 flex items-center justify-center text-[10px] font-bold text-gold">LIVE</div>
                <div className="overflow-hidden">
                  <h5 className="font-bold text-xs uppercase truncate">{activeTrack.title}</h5>
                  <p className="text-[9px] text-stone-500 uppercase tracking-widest">Rodniel Theodore</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <button onClick={() => setIsPlaying(!isPlaying)} className="text-gold text-2xl hover:scale-110 transition-transform">
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <div className="hidden lg:block w-72 h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"
                  />
                </div>
                <a href={ASSETS.whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden sm:block text-[10px] font-bold text-green-500 border border-green-500/50 px-5 py-2 hover:bg-green-500 hover:text-black transition-all uppercase tracking-widest">
                  Connect
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
