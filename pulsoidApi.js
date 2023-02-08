const { getUuid } = require('./method')
const pulsoidApi = {
  // base64 编码后的 baseUrl 以防止 Github 源码检索
  baseUrl: Buffer.from("aHR0cHM6Ly9wdWxzb2lkLm5ldC9vYXV0aDIvYXV0aG9yaXpl", "base64").toString(),
  // TODO: waiting for get client_id
  client_id: Buffer.from("", "base64").toString(),
  redirect_uri: "http://localhost",
  response_type: "token",
  scope: "data:heart_rate:read",
  state: getUuid(true),
  response_mode: "web_page"
}
exports.pulsoidApi = pulsoidApi