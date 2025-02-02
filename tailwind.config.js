/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00003f',
          secondary: '#800000',
          accent: '#cccce7',
          neutral: '#f0f0f0',
          'base-100': '#ffffff',
          info: '#8080c5',
          success: '#899979',
          warning: '#DAA520',
          error: '#cc0000',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
