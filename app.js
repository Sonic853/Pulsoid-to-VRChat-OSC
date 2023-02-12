const { ReadFile, stringIsnullOrEmpty } = require('./method')
const { StartAuth } = require('./auth')
const { RunPulsoid } = require('./main')
const token = ReadFile('token.txt')
if (stringIsnullOrEmpty(token)) {
  StartAuth().then(_token => {
    if (stringIsnullOrEmpty(_token)){
      console.log('no Enter.')
      process.exit(1)
    }
    RunPulsoid(token)
  })
}
else {
  RunPulsoid(token)
}
