/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0B2C47',
        accent: '#81c784',
      },
      fontFamily: {
        NunitoRegular: ['NunitoRegular'],
        NunitoMedium: ['NunitoMedium'],
        NunitoSemiBold: ['NunitoSemiBold'],
        NunitoBold: ['NunitoBold'],
      },
    },
  },
  plugins: [],
};
