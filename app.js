
const { Client } = require('node-osc');
const WebSocket = require('ws');

// 编辑这里：
const wsURL = 'wss://ramiel.pulsoid.net/listen/436ygggg-4tre-35gd-3fge-asdqntgfv219'

let Start = () => {
    const ws = new WebSocket(wsURL)
    ws.on('open', e => {
        console.log('Open,', e);
        ws.on('message', ev => {
            const data = JSON.parse(ev)
            const client = new Client('localhost', 9000);
            const Heartrate = {
                address: '/avatar/parameters/Heartrate',
                args:
                {
                    type: 'f',
                    // 参考自该代码：
                    // https://github.com/vard88508/vrc-osc-miband-hrm/blob/030f757dc540955e8f42fdbd603c341e333b27ef/app.js#L26
                    value: data.data.heartRate / 127 - 1
                }
            };
            console.log(Heartrate);
            client.send(Heartrate);

        })
    })
    ws.on('close', e => {
        Start();
    })
}
Start();