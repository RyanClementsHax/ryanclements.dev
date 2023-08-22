module.exports = {
  '*.@(ts|tsx|js|jsx)': [
    filenames => `npm run lint:js -- --file ${filenames.join(' --file ')}`,
    'npm run format'
  ],
  'posts/**/*.md': ['npm run post:mark-updated', 'npm run format'],
  'public/posts/**/*.gif': [
    filenames => `echo "Do not commit gif files\n\t${filenames.join('\n\t')}"`,
    'exit 1'
  ],
  'public/posts/**/banner.@(jpg|png)': ['npm run post:validate-banner'],
  '*.json|*.*rc!.browserslistrc': ['npm run format'],
  '*.@(css|scss)': ['npm run lint:styles', 'npm run format']
}
