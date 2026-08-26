import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '3rem' },
      screens: { '2xl': '1120px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0D0F',
          light: '#163A5F',
          50: '#F5F5F3',
        },
        gold: {
          DEFAULT: '#C5A46D',
          light: '#D7BD8E',
          dark: '#9A7B4D',
        },
        paper: '#F5F5F3',
        charcoal: '#0B0D0F',
        slate: {
          DEFAULT: '#8A8F98',
          light: '#B0B4BA',
        },
        border: '#D9D9D4',
        success: '#1F5C3A',
        danger: '#F87171',
        warning: '#7A5218',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        /* Escala de display — Cormorant Garamond rinde mejor en tamaños grandes */
        'hero':    ['clamp(3.25rem, 7.5vw, 6rem)',  { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '300' }],
        'section': ['clamp(2rem,   4vw,  3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.01em', fontWeight: '400' }],
        'title':   ['clamp(1.2rem, 2vw,  1.4rem)',  { lineHeight: '1.25', fontWeight: '500' }],
      },
      borderRadius: {
        sm:  '2px',
        DEFAULT: '4px',
        lg:  '8px',
        xl:  '14px',
      },
      boxShadow: {
        'card':      '0 1px 1px rgba(8,15,26,0.04), 0 4px 16px rgba(8,15,26,0.04)',
        'elevated':  '0 16px 48px rgba(8,15,26,0.10)',
        'gold-glow': '0 0 0 1px rgba(197,164,109,0.2), 0 16px 40px -8px rgba(197,164,109,0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
