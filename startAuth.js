const { stringIsnullOrEmpty } = require('./method')
const { StartAuth } = require('./auth')
const { RunPulsoid } = require('./main')
const maxconsolelog = Number(ReadFile('maxconsolelog.txt'))

StartAuth().then(token => {
  if (stringIsnullOrEmpty(token)) {
    // 当用户按下回车键时，process.exit()
    console.log('no Enter.')
    process.exit(1)
  }
  RunPulsoid(token, maxconsolelog)
})
