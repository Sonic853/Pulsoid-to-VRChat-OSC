const WebSocket = require('ws')
const fs = require('fs')
class WS {
  ip = ""
  port = ""
  path = ""
  wss = false
  /** @type {WebSocket} */
  ws
  get url() {
    return `${this.wss ? "wss://" : "ws://"}${this.ip}${stringIsnullOrEmpty(this.port) ? "" : ":" + this.port}${stringIsnullOrEmpty(this.path) ? "" : this.path}`
  }
  #delegats = new Delegates()
  #retry = 0
  realclose = true
  #hbData = ""
  #hbTime = 30000
  /** @type {NodeJS.Timer|null} */
  #hbInterval = null
  constructor(ip = "", port = "", path = "", wss = false) {
    this.ip = ip
    this.port = port
    this.path = path
    this.wss = wss
  }
  async connect(callback) {
    this.ws = new WebSocket(this.url)
    this.ws.onmessage = e => {
      this.#delegats.run(e.data.toString())
    }
    this.ws.onclose = async e => {
      if (!this.realclose) {
        clearInterval(this.#hbInterval)
        this.#hbInterval = null
        if (this.#retry >= 5) await RList.Push()
        this.#retry++
        this.connect()
      }
    }
    this.ws.onopen = e => {
      this.#retry = 0
      if (this.#hbData !== "") this.#hbInterval = setInterval(() => {
        this.ws.send(this.#hbData)
      }, this.#hbTime)
      return callback ? callback() : Promise.resolve()
    }
  }
  send(data) {
    this.ws.send(data)
  }
  message(callback) {
    return this.#delegats.push(callback)
  }
  close() {
    this.realclose = true
    this.ws.close()
  }
  setHeartbeat({ data = "", time = 0 }) {
    if (typeof data == "object") data = JSON.stringify(data)
    this.#hbTime = time
    this.#hbData = data
  }
}
// // 建立连接对象
// let socket = new WS("127.0.0.1", "8080")

// // 写入收到消息的方法
// socket.message(data => {
//     console.log(data)
// })

// // 开始连接
// socket.connect()

// // 发送消息
// socket.send("Hello")
/**
 * 生成随机 Uuid
 * @returns {string}
 */
const getUuid = (lowercase = false) => {
  let s = []
  let hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  for (let i = 0; i < 36; i++) {
    const random = Math.floor(Math.random() * 0x10)
    s[i] = hexDigits.substring(random, random + 1)
  }
  s[14] = "4"
  s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, (s[19] & 0x3) | 0x8 + 1)
  s[8] = s[13] = s[18] = s[23] = "-"
  let uuid = s.join("")
  if (lowercase) {
    uuid = uuid.toLowerCase()
  }
  return uuid
}
class Delegates {
  /** 
   * @type {{
   * id: string,
   * e: Function
   * }[]}
   */
  list
  item = class {
    /** @type {string} */
    id
    /** @type {Function} */
    e
    /**
     * 
     * @param {Function} e 
     */
    constructor(e) {
      this.id = getUuid()
      this.e = e
    }
  }
  constructor() {
    this.list = new Array()
  }
  run(...t) {
    if (this.list.length != 0) for (let i = 0; i < this.list.length; i++) {
      this.list[i].e(...arguments)
    }
  }
  /**
   * 
   * @param {Function} e 
   * @returns 
   */
  push(e) {
    let z = new this.item(e)
    this.list.push(z)
    return z.id
  }
  /**
   * 
   * @param {string|number} e 
   * @returns 
   */
  remove(e) {
    i = this.check(e)
    if (typeof i === "number") {
      this.list.splice(i, 1)
      return true
    } else {
      return false
    }
  }
  /**
   * 
   * @param {string|number} e 
   * @returns 
   */
  check(e) {
    let i
    if (typeof e == "number") {
      i = e
    } else {
      let z = -1
      for (let a = 0; a < this.list.length; a++) {
        const q = this.list[a]
        if (q.id != e) continue
        z = i = a
        break
      }
      if (z == -1) {
        return false
      }
    }
    return i
  }
}
/**
 * 
 * @param {number} ms 
 * @returns 
 */
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms))
const RList = new class {
  time = 3000
  #list = -1
  snooze = snooze
  async Push() {
    this.#list++
    await this.snooze(this.#list * this.time)
    Promise.resolve().finally(() => {
      setTimeout(() => { this.#list-- }, (this.#list + 1) * this.time)
    })
  }
}
const stringIsnullOrEmpty = (str) => {
  if (str == null || str == undefined || str == "") return true
  return false
}
/**
 * 
 * @param {string} path 
 * @returns {string}
 */
const ReadFile = (path) => {
  // 判断文件是否存在
  if (!fs.existsSync(path)) {
    return ""
  }
  // 读取文件
  const main = fs.readFileSync(path, "utf-8")
  return main
}
exports.getUuid = getUuid
exports.WS = WS
exports.stringIsnullOrEmpty = stringIsnullOrEmpty
exports.ReadFile = ReadFile
exports.snooze = snooze