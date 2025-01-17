module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#fbf7f2',
          neutral: '#aba98d',
          sand: '#b69779',
          peach: '#d3b89d',
          dark: '#11100f',
          bronze: '#a67d44',
          cream: '#fcf8f0',
          taupe: '#e2d9cd',
          beige: '#b6a593',
          gray: '#6b5b4d',
          brown: '#392e26',
          moss: '#5e6c5b',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};