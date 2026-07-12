'use client';

import { useEffect, useState } from 'react';

export interface CarouselCard {
  img: string;
  gist: string;
}

export default function EpisodeCarousel({ cards }: { cards: CarouselCard[] }) {
  const [i, setI] = useState(0);
  const n = cards.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);

  if (!n) return null;
  const card = cards[i];

  return (
    <div className="relative w-full rounded-xl overflow-hidden border-2 border-gold/40 bg-black shadow-[0_0_50px_rgba(212,175,55,0.18)]">
      <div className="relative w-full flex items-center justify-center bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={card.img}
          src={card.img}
          alt={card.gist}
          className="max-h-[80vh] w-auto max-w-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/85 to-transparent px-5 pt-16 pb-5">
          <p className="text-gold text-sm md:text-lg font-bold leading-snug text-center max-w-3xl mx-auto">
            {card.gist}
          </p>
        </div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => setI((x) => (x - 1 + n) % n)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-gold/40 text-gold text-xl hover:bg-gold hover:text-black transition-colors"
      >
        &#8249;
      </button>
      <button
        aria-label="Next"
        onClick={() => setI((x) => (x + 1) % n)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-gold/40 text-gold text-xl hover:bg-gold hover:text-black transition-colors"
      >
        &#8250;
      </button>

      <div className="absolute top-3 left-0 right-0 flex justify-center gap-2">
        {cards.map((_, d) => (
          <button
            key={d}
            aria-label={'Slide ' + (d + 1)}
            onClick={() => setI(d)}
            className={'h-1.5 rounded-full transition-all ' + (d === i ? 'w-6 bg-gold' : 'w-1.5 bg-white/40')}
          />
        ))}
      </div>
    </div>
  );
}
