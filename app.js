
const { Client } = require('node-osc')
const WebSocket = require('ws')
const readline = require('readline')
const { stdin: input, stdout: output } = require('node:process')
const open = require('open')
const rl = readline.createInterface({ input, output })
const { WS } = require('./method')
const { pulsoidApi } = require('./pulsoidApi')
const pulsoidAuthPage = () => {
  return `${pulsoidApi.baseUrl}?client_id=${pulsoidApi.client_id}&redirect_uri=${pulsoidApi.redirect_uri}&response_type=${pulsoidApi.response_type}&scope=${pulsoidApi.scope}&state=${pulsoidApi.state}&response_mode=${pulsoidApi.response_mode}`
}
console.log('Open Pulsoid Auth Page...')
open(pulsoidAuthPage())
/**
 * @type {string}
 */
rl.question('Enter Pulsoid Auth Token: ', (token) => {
  if (token == '') {
    console.log('no Enter.')
    return
  }
  let Start = () => {
    const wspath = `/api/v1/data/real_time?access_token=${token}`
    const ws = new WS("dev.pulsoid.net", "", wspath, true)
    let hbToggle = false
    ws.message(ev => {
      /**
       * @type {{
       *  data: {
       *   heartRate: number
       * }
       * }}
       */
      const data = JSON.parse(ev)
      const heartRate = data?.data?.heartRate
      if (!heartRate) return console.log('Got heart rate: 0 bpm, skipping parameter update...')
      console.log('Got heart rate: %s bpm', heartRate)
      const client = new Client('localhost', 9000)
      // 参考自该代码：
      // https://github.com/vard88508/vrc-osc-miband-hrm/blob/f60c3422c36921d317168ed38b1362528e8364e9/app.js#L24-L50
      const Heartrates = [
        {
          address: '/avatar/parameters/Heartrate',
          args:
          {
            type: 'f',
            value: data.data.heartRate / 127 - 1
          }
        },
        {
          address: "/avatar/parameters/HeartRateFloat",
          args:
          {
            type: "f",
            value: data.data.heartRate / 127 - 1
          }
        },
        {
          address: "/avatar/parameters/Heartrate2",
          args:
          {
            type: "f",
            value: data.data.heartRate / 255
          }
        },
        {
          address: "/avatar/parameters/HeartRateFloat01",
          args:
          {
            type: "f",
            value: data.data.heartRate / 255
          }
        },
        {
          address: "/avatar/parameters/Heartrate3",
          args:
          {
            type: "i",
            value: data.data.heartRate
          }
        },
        {
          address: "/avatar/parameters/HeartRateInt",
          args:
          {
            type: "i",
            value: data.data.heartRate
          }
        },
        {
          address: "/avatar/parameters/HeartBeatToggle",
          args:
          {
            type: "b",
            value: hbToggle
          }
        }
      ]
      Heartrates.forEach(element => {
        client.send(element)
        if (element.address === "/avatar/parameters/HeartBeatToggle") {
          hbToggle = !hbToggle
        }
      });
    })
    ws.realclose = false
    ws.connect().then(() => {
      console.log('Connected to Pulsoid.')
    })
  }
  Start()
})

