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
        NunitoRegular: ['Nunito-Regular'],
        NunitoMedium: ['Nunito-Medium'],
        NunitoSemiBold: ['Nunito-SemiBold'],
        NunitoBold: ['Nunito-Bold'],
      },
    },
  },
  plugins: [],
};
