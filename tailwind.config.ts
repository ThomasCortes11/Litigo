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
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E1A2B',
          light: '#16263D',
          50: '#F2F4F7',
        },
        gold: {
          DEFAULT: '#A9844C',
          light: '#C7A668',
          dark: '#8A6A38',
        },
        paper: '#F7F5F0',
        charcoal: '#2B2E33',
        slate: {
          DEFAULT: '#5B6472',
          light: '#8A91A0',
        },
        border: '#E2DED4',
        success: '#2F6B4F',
        danger: '#8C2F2F',
        warning: '#9A6A22',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,26,43,0.06), 0 4px 16px rgba(14,26,43,0.06)',
        elevated: '0 8px 30px rgba(14,26,43,0.12)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
