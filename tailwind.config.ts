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
      padding: '2rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1520',
          light: '#132033',
          50: '#F0F2F5',
        },
        gold: {
          DEFAULT: '#9E7A3F',
          light: '#BFA06A',
          dark: '#7A5C28',
        },
        paper: '#F8F6F1',
        charcoal: '#292C31',
        slate: {
          DEFAULT: '#5A626F',
          light: '#8C94A0',
        },
        border: '#DEDAD2',
        success: '#285C44',
        danger: '#7A2828',
        warning: '#8A5E1C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        /* Escala tipografica para el display: Cormorant rinde mejor en tamaños grandes */
        'display-xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.005em', fontWeight: '600' }],
        'display-sm': ['1.75rem', { lineHeight: '1.15', fontWeight: '600' }],
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '5px',
        lg: '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(11,21,32,0.06), 0 6px 20px rgba(11,21,32,0.05)',
        elevated: '0 12px 40px rgba(11,21,32,0.14)',
        'gold-glow': '0 0 0 1px rgba(158,122,63,0.2), 0 20px 50px -10px rgba(158,122,63,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
