import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FFD700',
          500: '#FFC000',
          600: '#E6B800',
        },
        rasta: {
          green: '#009B3A',
          red: '#CE1126',
          gold: '#FFD700',
        },
        background: '#121212',
        surface: '#1E1E1E',
      },
      fontFamily: {
        heading: ['var(--font-bebas-neue)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
