const { ReadFile, stringIsnullOrEmpty } = require('./method')
const { StartAuth } = require('./auth')
const { RunPulsoid } = require('./main')
const token = ReadFile('token.txt')
const maxconsolelog = Number(ReadFile('maxconsolelog.txt'))
if (stringIsnullOrEmpty(token)) {
  StartAuth().then(_token => {
    if (stringIsnullOrEmpty(_token)){
      console.log('no Enter.')
      process.exit(1)
    }
    RunPulsoid(token, maxconsolelog)
  })
}
else {
  RunPulsoid(token, maxconsolelog)
}
