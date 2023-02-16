/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs/promises')
const esbuild = require('esbuild')

void (async () => {
  const files = await fs.readdir(__dirname, {
    withFileTypes: true
  })
  const scriptFilePaths = files
    .filter(x => !x.isDirectory())
    .filter(x => x.name !== path.basename(__filename))
    .map(x => path.join(__dirname, x.name))
  await esbuild.build({
    target: 'es6',
    format: 'cjs',
    platform: 'node',
    bundle: true,
    external: ['sharp'],
    entryPoints: scriptFilePaths,
    outdir: path.join(__dirname, 'dist')
  })
})()
