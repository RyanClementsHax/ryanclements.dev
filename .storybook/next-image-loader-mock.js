module.exports = function nextImageLoader() {
  return `export default ${JSON.stringify({
    src: 'test src',
    height: 400,
    width: 400,
    blurDataURL: 'test'
  })};`
}
