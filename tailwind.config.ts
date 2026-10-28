import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CarePoint Healthcare Color System
        navy: {
          DEFAULT: '#123B66',      // Primary navy blue
          primary: '#123B66',
          dark: '#0B2545',         // Secondary dark navy
          secondary: '#0B2545',
          light: '#1B4D82',
          surface: '#F1F7FB',      // Alternate section background
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',          // Accent teal
          600: '#0D9488',          // Accessible action teal / hover
          700: '#0F766E',          // High-contrast teal for text
          800: '#115E59',
          900: '#134E4A',
          DEFAULT: '#14B8A6',
          accent: '#14B8A6',
          hover: '#0D9488',
        },
        carepoint: {
          bg: '#FFFFFF',           // Main background
          section: '#F1F7FB',      // Alternate section background
          border: '#DCE5ED',       // Borders
          text: '#334155',         // Body text
          navy: '#123B66',         // Primary navy blue
          darkNavy: '#0B2545',     // Secondary dark navy
          teal: '#14B8A6',         // Accent teal
          tealHover: '#0D9488',
        },
        // Backward-compatible semantic mappings
        medical: {
          50: '#F1F7FB',           // Alternate section background #F1F7FB
          100: '#E4EEF5',
          200: '#DCE5ED',          // Borders #DCE5ED
          300: '#B6CFE5',
          400: '#649AC9',
          500: '#14B8A6',          // Accent teal
          600: '#123B66',          // Primary navy blue #123B66
          700: '#0E2E50',
          800: '#123B66',          // Primary navy blue #123B66
          900: '#0B2545',          // Secondary dark navy #0B2545
          950: '#061628',
        },
        cyanHealth: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',          // Accent teal #14B8A6
          600: '#0D9488',
          700: '#0F766E',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F1F7FB',
          200: '#DCE5ED',
          muted: '#334155',
          dark: '#0B2545',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 2px 8px -1px rgba(11, 37, 69, 0.05), 0 1px 3px 0 rgba(11, 37, 69, 0.03)',
        'card-hover': '0 8px 20px -3px rgba(18, 59, 102, 0.08), 0 3px 8px -2px rgba(18, 59, 102, 0.04)',
        'nav-fixed': '0 2px 12px -2px rgba(11, 37, 69, 0.05)',
      },
      borderColor: {
        DEFAULT: '#DCE5ED',
      },
    },
  },
  plugins: [],
};

export default config;
