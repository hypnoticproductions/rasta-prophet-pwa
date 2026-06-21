'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * VibesLayer — Heavy Rotation engagement overlay.
 *
 * Reggae-roots "keep it alive" layer that rides on top of the whole site:
 *  - The Lion of Judah strides across the bottom of the screen on a loop,
 *    trailing sparks of dust.
 *  - Ambient roots emojis (ganja leaf, fire, stars, hearts) drift up the
 *    screen for that "vibes are flowing" feel.
 *  - Tapping anything pops a burst of Rasta emojis at the pointer.
 *  - Hovering any link/button hops a 🦁 above it so every CTA feels roots.
 *
 * Everything is purely decorative (pointer-events: none) and is disabled
 * automatically for users who prefer reduced motion.
 */

const ROOTS_EMOJI = ['🦁', '🔥', '🌿', '💛', '💚', '❤️', '⭐', '🥁', '🇪🇹'];
const FLOATER_EMOJI = ['🌿', '🔥', '⭐', '💛', '💚', '❤️', '🦁'];

interface Ephemeral {
  id: number;
  emoji: string;
  style: React.CSSProperties;
  className: string;
}

let uid = 0;
const nextId = () => ++uid;

export default function VibesLayer() {
  const [items, setItems] = useState<Ephemeral[]>([]);
  const [enabled, setEnabled] = useState(false);
  const trailTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Remove an ephemeral element once its animation has finished.
  const reap = useCallback((id: number, ttl: number) => {
    window.setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }, ttl);
  }, []);

  const add = useCallback(
    (item: Omit<Ephemeral, 'id'>, ttl: number) => {
      const id = nextId();
      setItems((prev) => [...prev, { ...item, id }]);
      reap(id, ttl);
    },
    [reap]
  );

  // Respect reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!mq.matches);
    const onChange = () => setEnabled(!mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Ambient floaters drifting up the screen.
  useEffect(() => {
    if (!enabled) return;
    const spawn = () => {
      const emoji = FLOATER_EMOJI[Math.floor(Math.random() * FLOATER_EMOJI.length)];
      const dur = 8 + Math.random() * 6; // 8–14s
      add(
        {
          emoji,
          className: 'vibes-floater',
          style: {
            left: `${Math.random() * 100}vw`,
            ['--dur' as string]: `${dur}s`,
            ['--drift' as string]: `${(Math.random() - 0.5) * 160}px`,
            fontSize: `${20 + Math.random() * 16}px`,
          },
        },
        dur * 1000 + 200
      );
    };
    const interval = setInterval(spawn, 2600);
    spawn();
    return () => clearInterval(interval);
  }, [enabled, add]);

  // Spark trail dropped behind the striding lion.
  useEffect(() => {
    if (!enabled) return;
    const STRIDE_MS = 18000; // must match .vibes-lion animation duration
    const start = performance.now();
    trailTimer.current = setInterval(() => {
      const t = ((performance.now() - start) % STRIDE_MS) / STRIDE_MS;
      const x = -90 + t * (window.innerWidth + 90);
      add(
        {
          emoji: Math.random() > 0.5 ? '✨' : '·',
          className: 'vibes-trail',
          style: { left: `${x}px` },
        },
        900
      );
    }, 220);
    return () => {
      if (trailTimer.current) clearInterval(trailTimer.current);
    };
  }, [enabled, add]);

  // Click burst at the pointer.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const count = 7;
      for (let i = 0; i < count; i++) {
        const emoji = ROOTS_EMOJI[Math.floor(Math.random() * ROOTS_EMOJI.length)];
        const angle = (Math.PI * 2 * i) / count + Math.random();
        const dist = 40 + Math.random() * 60;
        add(
          {
            emoji,
            className: 'vibes-burst',
            style: {
              left: `${e.clientX}px`,
              top: `${e.clientY}px`,
              ['--bx' as string]: `${Math.cos(angle) * dist}px`,
              ['--by' as string]: `${Math.sin(angle) * dist - 30}px`,
              ['--br' as string]: `${(Math.random() - 0.5) * 240}deg`,
            },
          },
          800
        );
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [enabled, add]);

  // Lion hop above any link / button on hover.
  useEffect(() => {
    if (!enabled) return;
    let last = 0;
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a, button, [role="button"]');
      if (!el) return;
      const now = performance.now();
      if (now - last < 350) return; // throttle
      last = now;
      const rect = (el as HTMLElement).getBoundingClientRect();
      add(
        {
          emoji: '🦁',
          className: 'vibes-hover-lion',
          style: {
            left: `${rect.left + rect.width / 2}px`,
            top: `${rect.top}px`,
          },
        },
        850
      );
    };
    window.addEventListener('mouseover', onOver);
    return () => window.removeEventListener('mouseover', onOver);
  }, [enabled, add]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      {/* The Lion of Judah striding across the bottom */}
      <div className="vibes-lion">
        <span>🦁</span>
      </div>

      {/* Ephemeral floaters, bursts, trails, hover-lions */}
      {items.map((it) => (
        <div key={it.id} className={it.className} style={it.style}>
          {it.emoji}
        </div>
      ))}
    </div>
  );
}
