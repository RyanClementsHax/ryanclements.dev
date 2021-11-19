module.exports = {
  plugins: {
    tailwindcss: {},
    // nextjs defaults https://nextjs.org/docs/advanced-features/customizing-postcss-config#customizing-plugins
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    }
  }
}
