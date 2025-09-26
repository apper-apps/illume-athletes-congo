/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
        },
secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#E2E8F0',
          600: '#CBD5E1',
          700: '#94A3B8',
        },
accent: {
          500: '#E11D48',
          600: '#BE185D',
          700: '#9D174D',
        },
        success: {
          500: '#22C55E',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        info: {
          500: '#3B82F6',
        },
surface: '#FFFFFF',
        background: '#FEFEFE',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}