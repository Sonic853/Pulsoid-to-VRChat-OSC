
const { Client } = require('node-osc');
const WebSocket = require('ws');
const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
/**
 * @type {string}
 */
rl.question('Enter your wsURL: ', (wsURL) => {
  if (wsURL == '') return console.log('no Enter.');
  let Start = () => {
    const ws = new WebSocket(wsURL)
    ws.on('open', e => {
      console.log('Open,', e);
      ws.on('message', ev => {
        const data = JSON.parse(ev)
        if (!data.data.heartRate) return console.log('Got heart rate: 0 bpm, skipping parameter update...');
        console.log('Got heart rate: %s bpm', data.data.heartRate);
        const client = new Client('localhost', 9000);
        // 参考自该代码：
        // https://github.com/vard88508/vrc-osc-miband-hrm/blob/f60c3422c36921d317168ed38b1362528e8364e9/app.js#L24-L50
        const Heartrate = {
          address: '/avatar/parameters/Heartrate',
          args:
          {
            type: 'f',
            value: data.data.heartRate / 127 - 1
          }
        };
        const HeartRateFloat = {
          address: "/avatar/parameters/HeartRateFloat",
          args:
          {
            type: "f",
            value: data.data.heartRate / 127 - 1
          }
        };
        const Heartrate2 = {
          address: "/avatar/parameters/Heartrate2",
          args:
          {
            type: "f",
            value: data.data.heartRate / 255
          }
        };
        const HeartRateFloat01 = {
          address: "/avatar/parameters/HeartRateFloat01",
          args:
          {
            type: "f",
            value: data.data.heartRate / 255
          }
        };
        const Heartrate3 = {
          address: "/avatar/parameters/Heartrate3",
          args:
          {
            type: "f",
            value: data.data.heartRate
          }
        };
        const HeartRateInt = {
          address: "/avatar/parameters/HeartRateInt",
          args:
          {
            type: "f",
            value: data.data.heartRate
          }
        };
        client.send(Heartrate);
        client.send(Heartrate2);
        client.send(Heartrate3);
        client.send(HeartRateFloat);
        client.send(HeartRateFloat01);
        client.send(HeartRateInt);

      })
    })
    ws.on('close', e => {
      Start();
    })
  }
  Start();
})

