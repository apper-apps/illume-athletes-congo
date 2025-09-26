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
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0066CC',
          600: '#0052a3',
          700: '#004182',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#FFCC00',
          600: '#d69e0f',
          700: '#a16207',
        },
        accent: {
          500: '#DC143C',
          600: '#b91c3c',
          700: '#9f1239',
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
        background: '#F5F7FA',
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