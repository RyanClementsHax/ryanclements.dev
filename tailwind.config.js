module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
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
