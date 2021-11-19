module.exports = {
  '*.@(ts|tsx|js|jsx)': [
    filenames =>
      `yarn lint:js --file ${filenames
        .map(file => file.split(process.cwd())[1])
        .join(' --file ')}`,
    'yarn format'
  ],
  '*.json|*.*rc!.browserslistrc': ['yarn format'],
  '*.@(css|scss)': ['yarn lint:styles', 'yarn format']
}
