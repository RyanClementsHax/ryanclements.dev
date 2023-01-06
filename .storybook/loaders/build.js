/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

require('esbuild').build({
  target: 'es6',
  // would need to replace __dirname with import.meta.url when converting to esm
  entryPoints: [path.join(__dirname, './postLoader.ts')],
  platform: 'node',
  bundle: true,
  // *.node native binary modules aren't supported
  // https://esbuild.github.io/api/#packages
  external: ['sharp'],
  outfile: path.join(__dirname, './dist/postLoader.js'),
  plugins: [
    // starry-night uses import.meta.url, but that needs an extra transformation
    // to work in cjs since it is a esm concept
    // https://github.com/evanw/esbuild/issues/1492#issuecomment-891676215
    {
      name: 'import.meta.url',
      setup({ onLoad }) {
        let fs = require('fs')
        let url = require('url')
        onLoad({ filter: /()/, namespace: 'file' }, args => {
          let code = fs.readFileSync(args.path, 'utf8')
          code = code.replace(
            /\bimport\.meta\.url\b/g,
            JSON.stringify(url.pathToFileURL(args.path))
          )
          return { contents: code, loader: 'default' }
        })
      }
    }
  ]
})
