'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

export function RotatingMic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.5, 0.5, 0.3]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-0"
      style={{ opacity }}
    >
      <motion.div
        style={{
          rotate: rotation,
          scale: scale,
        }}
        className="relative"
      >
        {/* Use uploaded gold-mic.png if available, otherwise use fallback */}
        {!imageError ? (
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 relative">
            <Image
              src="/gold-mic.png"
              alt="Golden Microphone"
              fill
              className="object-contain"
              priority
              onError={() => setImageError(true)}
              unoptimized
            />
          </div>
        ) : (
          /* Fallback CSS-based microphone */
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 relative">
            {/* Mic head */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 glow-gold flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-yellow-200 via-gold-400 to-yellow-600 border-4 border-gold-300/30" />
            </div>
            
            {/* Mic grille lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
                    <stop offset="100%" stopColor="rgba(255,215,0,0.1)" />
                  </linearGradient>
                </defs>
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="1"
                    transform={`rotate(${i * 22.5} 50 50)`}
                  />
                ))}
              </svg>
            </div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-white to-gold-300 shadow-lg" />
            </div>
            
            {/* Mic stand connection */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-12 bg-gradient-to-b from-gold-500 to-gold-700 rounded-b-lg" />
            </div>
          </div>
        )}
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-3xl bg-gold-400/20 -z-10" />
      </motion.div>
    </motion.div>
  );
}
