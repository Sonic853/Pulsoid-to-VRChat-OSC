
const { WS } = require('./method')
const { Client } = require('node-osc')
/**
 * 
 * @param {string} token 
 */
const RunPulsoid = (token, maxconsolelog = NaN) => {
  const wspath = `/api/v1/data/real_time?access_token=${token}`
  const ws = new WS("dev.pulsoid.net", "", wspath, true)
  let hbToggle = false
  let logCount = 0
  ws.message(ev => {
    /**
     * @type {{
     * measured_at: number
     * data: {
     *  heart_rate: number
     * }
     * }}
     */
    let data
    try {
      data = JSON.parse(ev)
    } catch (error) {
      console.log(`data: ${ev}`)
      console.error('Failed to parse data from Pulsoid. Skipping parameter update...')
      return
    }
    const heartRate = data?.data?.heart_rate
    if (!heartRate) return console.log('Got heart rate: 0 bpm, skipping parameter update...')
    logCount++
    if (maxconsolelog !== NaN && logCount >= maxconsolelog) {
      logCount = 0
      console.clear()
    }
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
          value: heartRate / 127 - 1
        }
      },
      {
        address: "/avatar/parameters/HeartRateFloat",
        args:
        {
          type: "f",
          value: heartRate / 127 - 1
        }
      },
      {
        address: "/avatar/parameters/Heartrate2",
        args:
        {
          type: "f",
          value: heartRate / 255
        }
      },
      {
        address: "/avatar/parameters/HeartRateFloat01",
        args:
        {
          type: "f",
          value: heartRate / 255
        }
      },
      {
        address: "/avatar/parameters/Heartrate3",
        args:
        {
          type: "i",
          value: heartRate
        }
      },
      {
        address: "/avatar/parameters/HeartRateInt",
        args:
        {
          type: "i",
          value: heartRate
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
exports.RunPulsoid = RunPulsoid