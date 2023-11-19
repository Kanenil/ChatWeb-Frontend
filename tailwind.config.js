/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        'sm': '540px',
        'md': '720px',
        'lg': '960px',
        'xl': '1140px',
        '2xl': '1320px',
      },
      keyframes: {
        animationOpacity: {
          from: {opacity: 0.2}, to: {opacity: 1}
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        },
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0,20px,0)'
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0,0,0)'
          },
        }
      },
      animation: {
        opacity: 'animationOpacity .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
        fadeInUp: 'fadeInUp .65s ease-in-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

