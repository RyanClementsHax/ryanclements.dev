module.exports = {
  '*.@(ts|tsx|js|jsx)': [
    filenames =>
      `yarn lint:js --file ${filenames
        .map(file => file.split(process.cwd())[1])
        .join(' --file ')}`,
    'yarn format'
  ],
  'posts/**/*.md': ['yarn post:mark-updated', 'yarn format'],
  'public/posts/**/banner.@(jpg|png)': ['yarn post:validate-banner'],
  '*.json|*.*rc!.browserslistrc': ['yarn format'],
  '*.@(css|scss)': ['yarn lint:styles', 'yarn format']
}
