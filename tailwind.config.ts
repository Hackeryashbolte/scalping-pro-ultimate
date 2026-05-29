import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        quantum: {
          black: '#03050f',
          panel: '#090d1d',
          glass: 'rgba(12, 18, 38, 0.72)',
          gold: '#ffd76a',
          blue: '#00d4ff',
          cyan: '#61f4ff',
          green: '#00f5a0',
          red: '#ff3d71',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 212, 255, 0.22)',
        gold: '0 0 36px rgba(255, 215, 106, 0.22)',
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at top left, rgba(0,212,255,.22), transparent 34%), radial-gradient(circle at 70% 0%, rgba(255,215,106,.15), transparent 30%), linear-gradient(135deg,#03050f 0%,#07101f 55%,#02030a 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
