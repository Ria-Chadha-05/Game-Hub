/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)', // near-black
        foreground: 'var(--color-foreground)', // white
        card: {
          DEFAULT: 'var(--color-card)', // dark-gray
          foreground: 'var(--color-card-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // dark-gray
          foreground: 'var(--color-popover-foreground)', // white
        },
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-500
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // zinc-800
          foreground: 'var(--color-secondary-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // zinc-950
          foreground: 'var(--color-muted-foreground)', // white-60
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // indigo-500
          foreground: 'var(--color-accent-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        border: 'var(--color-border)', // white-10
        input: 'var(--color-input)', // white-5
        ring: 'var(--color-ring)', // white-20
        game: {
          tictactoe: 'var(--color-game-tictactoe)', // blue-500
          snake: 'var(--color-game-snake)', // green-500
          whack: 'var(--color-game-whack)', // amber-500
          memory: 'var(--color-game-memory)', // purple-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'slide-in-blur': 'slideInBlur 0.8s ease-out forwards',
        'scale-in-blur': 'scaleInBlur 1.2s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
        'shake': 'shake 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}