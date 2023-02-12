const readline = require('readline')
const { stdin: input, stdout: output } = require('node:process')
const open = require('open')
const rl = readline.createInterface({ input, output })
const { pulsoidApi } = require('./pulsoidApi')
const fs = require('fs')
const pulsoidAuthPage = () => {
  return `${pulsoidApi.baseUrl}?client_id=${pulsoidApi.client_id}&redirect_uri=${pulsoidApi.redirect_uri}&response_type=${pulsoidApi.response_type}&scope=${pulsoidApi.scope}&state=${pulsoidApi.state}&response_mode=${pulsoidApi.response_mode}`
}
/**
 * 
 * @param {*} callback 
 * @returns {Promise<string>}
 */
const StartAuth = async (callback) => {
  return new Promise((resolve, reject) => {
    console.log('Open Pulsoid Auth Page...')
    open(pulsoidAuthPage())
    /**
     * @type {string}
     */
    rl.question('Enter Pulsoid Auth Token: ', (token) => {
      if (token == '') {
        console.log('no Enter.')
        return reject()
      }
      // 写入到 token.txt
      fs.writeFile('token.txt', token, (err) => {
        if (err) {
          console.log(err)
          return reject()
        }
        console.log('token.txt saved.')
        callback && callback(token)
        return resolve(token)
      })
    })
  })
}
exports.StartAuth = StartAuth