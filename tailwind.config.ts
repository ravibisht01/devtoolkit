import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        surface: {
          DEFAULT: '#0f1117',
          card:    '#161b27',
          border:  '#1e2535',
          hover:   '#1a2236',
        },
        accent: {
          cyan:   '#22d3ee',
          purple: '#a78bfa',
          green:  '#4ade80',
          orange: '#fb923c',
          pink:   '#f472b6',
          yellow: '#facc15',
        },
      },
      boxShadow: {
        card:       '0 0 0 1px rgba(30,37,53,1), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':'0 0 0 1px rgba(14,165,233,0.3), 0 8px 32px rgba(14,165,233,0.1)',
        'glow-sm':  '0 0 20px rgba(14,165,233,0.15)',
        'glow-md':  '0 0 40px rgba(14,165,233,0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14,165,233,0.15), transparent)',
        'grid-pattern':  'linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config
