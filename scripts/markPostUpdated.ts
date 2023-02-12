import { log } from 'lib/utils/logs'

void (async () => {
  const [, , ...postFilePaths] = process.argv

  log.log('-------------------------------------')
  log.log('this is a test', postFilePaths)
  log.log('-------------------------------------')
})()
