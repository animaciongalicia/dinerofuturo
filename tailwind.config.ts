import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:      '#0F1B12',
        ink2:     '#2D3F32',
        ink3:     '#5C7060',
        forest:   '#1A3D2B',
        moss:     '#2D6A4F',
        sage:     '#52B788',
        mint:     '#95D5B2',
        mist:     '#D8F3DC',
        cream:    '#F6FAF0',
        paper:    '#FAFCF7',
        gold:     '#B8963E',
        'gold-light': '#F5EDD0',
        border:   '#DDE8D8',
        border2:  '#EBF2E7',
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:     ['var(--font-instrument)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1320px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(15,27,18,.07)',
        'card-lg': '0 8px 40px rgba(15,27,18,.12)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up':   'fadeUp .6s ease both',
        'fade-up-2': 'fadeUp .6s .12s ease both',
        'fade-up-3': 'fadeUp .6s .24s ease both',
        'fade-up-4': 'fadeUp .6s .36s ease both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
