/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        label: ['Fira Sans', 'Inter', 'sans-serif'],
        code: ['Fira Code', 'JetBrains Mono', 'monospace'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#f3f6fc',
        surface: '#f3f6fc',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f8faff',
        'surface-container': '#eef3fb',
        'surface-container-high': '#e4ebf6',
        'surface-container-highest': '#d8e2f0',
        'on-surface': '#17213b',
        'on-surface-variant': '#53617a',
        'outline-variant': '#c7d2e3',
        tertiary: '#4cd7f6',
        'on-tertiary': '#003640',
        'tertiary-container': '#e1f8fc',
        error: '#ffb4ab',
        secondary: '#50617d',
        slate: {
          100: '#17213b',
          200: '#263454',
          300: '#44516c',
          400: '#62708a',
          500: '#74809a',
          600: '#52617a',
          700: '#b8c5d8',
          800: '#d9e2ef',
          850: '#edf2fb',
          900: '#ffffff',
          950: '#f3f6fc',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
