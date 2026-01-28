import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vamp: {
          darker: '#0a0a0f',
          dark: '#12121a',
          purple: '#8b5cf6',
          fuchsia: '#d946ef',
          pink: '#ec4899',
          glow: '#a855f7',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
