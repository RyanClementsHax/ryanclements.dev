/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

require('esbuild').build({
  target: 'es6',
  format: 'cjs',
  platform: 'node',
  bundle: true,
  external: ['sharp'],
  entryPoints: [path.join(__dirname, './markPostUpdated.ts')],
  outfile: path.join(__dirname, './dist/markPostUpdated.js')
})
