module.exports = {
  '*.@(ts|tsx|js|jsx)': [
    filenames =>
      `yarn lint:js --file ${filenames
        .map(file => file.split(process.cwd())[1])
        .join(' --file ')}`,
    'yarn format'
  ],
  'posts/**/*.md': ['yarn post:mark-updated', 'yarn format'],
  'public/posts/**/*.gif': [
    filenames => `echo "Do not commit gif files\n\t${filenames.join('\n\t')}"`,
    'exit 1'
  ],
  'public/posts/**/banner.@(jpg|png)': ['yarn post:validate-banner'],
  '*.json|*.*rc!.browserslistrc': ['yarn format'],
  '*.@(css|scss)': ['yarn lint:styles', 'yarn format']
}
