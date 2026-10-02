/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tokens semánticos: su valor real vive en index.css y cambia con el tema.
        bg: token('--c-bg'),
        surface: token('--c-surface'),
        raised: token('--c-raised'),
        line: token('--c-line'),
        fg: token('--c-fg'),
        muted: token('--c-muted'),
        accent: token('--c-accent'),
        'accent-soft': token('--c-accent-soft'),
        ok: token('--c-ok'),
        bad: token('--c-bad'),
        warn: token('--c-warn'),
        brand: {
          50: '#eefbf3',
          100: '#d6f5e2',
          200: '#b0eac9',
          300: '#7dd8a9',
          400: '#47bf84',
          500: '#23a468',
          600: '#158353',
          700: '#116945',
          800: '#105338',
          900: '#0e4530',
          950: '#06271b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.94)' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 240ms ease-out both',
        pop: 'pop 220ms ease-out both',
        'slide-in': 'slide-in 260ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
