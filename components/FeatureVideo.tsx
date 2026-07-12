'use client';

import { useEffect, useRef, useState } from 'react';

export default function FeatureVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border-2 border-gold/50 bg-black shadow-[0_0_70px_rgba(212,175,55,0.25)]">
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="w-full h-auto max-h-[80vh] object-contain bg-black"
      />
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full pointer-events-none">
        <span className="w-2 h-2 bg-red rounded-full animate-pulse" />
        <span className="text-[10px] text-gold font-bold uppercase tracking-[0.2em]">This Week On Air</span>
      </div>
      <button
        onClick={toggle}
        className="absolute bottom-4 right-4 px-4 py-2 bg-gold text-black text-xs font-bold uppercase tracking-[0.15em] rounded-lg hover:bg-gold/90 transition-colors"
      >
        {muted ? 'Tap for Sound' : 'Sound On'}
      </button>
    </div>
  );
}
