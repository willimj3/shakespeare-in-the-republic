import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1F3763',
          50: '#E8EDF5',
          100: '#D1DBEB',
          200: '#A3B7D7',
          300: '#7593C3',
          400: '#4A6FA6',
          500: '#1F3763',
          600: '#1A2F54',
          700: '#152645',
          800: '#101E36',
          900: '#0B1527',
        },
        gold: {
          DEFAULT: '#C7953C',
          50: '#FBF5EA',
          100: '#F6EBD5',
          200: '#EDD7AB',
          300: '#E4C381',
          400: '#DBAF57',
          500: '#C7953C',
          600: '#A07830',
          700: '#795A24',
          800: '#523D19',
          900: '#2B1F0D',
        },
        cream: '#FDF8F0',
      },
      fontFamily: {
        serif: ['Georgia', 'Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
