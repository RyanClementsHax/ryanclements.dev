/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'orange'
      }
    },
    themes: {
      dark: {
        colors: {
          primary: 'purple'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('./styles/tailwindPlugins/multiThemePlugin')]
}
