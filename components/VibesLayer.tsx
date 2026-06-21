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
const CELEBRATE_EMOJI = ['🦁', '🔥', '🦁', '🔥', '⭐', '💛', '💚', '❤️'];
const VIBES_PREF_KEY = 'rastaprophet:vibes';

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
  const [reducedMotion, setReducedMotion] = useState(true);
  const [vibesOn, setVibesOn] = useState(true);
  const trailTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Active when the user hasn't muted vibes and isn't in reduced-motion mode.
  const enabled = !reducedMotion && vibesOn;

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
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Load the saved on/off preference (defaults to on).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(VIBES_PREF_KEY);
      if (saved === 'off') setVibesOn(false);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleVibes = useCallback(() => {
    setVibesOn((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(VIBES_PREF_KEY, next ? 'on' : 'off');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Track pointer so play-celebration bursts originate near the user.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Big celebration burst when an episode starts playing.
  useEffect(() => {
    if (!enabled) return;
    const onCelebrate = () => {
      const cx = pointer.current.x || window.innerWidth / 2;
      const cy = pointer.current.y || window.innerHeight / 2;
      const count = 18;
      for (let i = 0; i < count; i++) {
        const emoji = CELEBRATE_EMOJI[Math.floor(Math.random() * CELEBRATE_EMOJI.length)];
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const dist = 70 + Math.random() * 110;
        add(
          {
            emoji,
            className: 'vibes-burst',
            style: {
              left: `${cx}px`,
              top: `${cy}px`,
              fontSize: `${24 + Math.random() * 14}px`,
              ['--bx' as string]: `${Math.cos(angle) * dist}px`,
              ['--by' as string]: `${Math.sin(angle) * dist - 40}px`,
              ['--br' as string]: `${(Math.random() - 0.5) * 320}deg`,
            },
          },
          850
        );
      }
    };
    window.addEventListener('vibes:celebrate', onCelebrate as EventListener);
    return () => window.removeEventListener('vibes:celebrate', onCelebrate as EventListener);
  }, [enabled, add]);

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

  // Users who prefer reduced motion get nothing at all — not even the toggle.
  if (reducedMotion) return null;

  return (
    <>
      {/* Listener-controlled vibes toggle */}
      <button
        type="button"
        onClick={toggleVibes}
        aria-pressed={vibesOn}
        aria-label={vibesOn ? 'Turn vibes off' : 'Turn vibes on'}
        title={vibesOn ? 'Vibes ON — tap to calm the page' : 'Vibes OFF — tap to bring the fire'}
        className="vibes-toggle"
      >
        <span style={{ opacity: vibesOn ? 1 : 0.35, filter: vibesOn ? 'none' : 'grayscale(1)' }}>
          🦁
        </span>
      </button>

      {enabled && (
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
      )}
    </>
  );
}
