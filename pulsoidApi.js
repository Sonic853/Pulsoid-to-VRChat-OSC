const { getUuid } = require('./method')
const pulsoidApi = {
  baseUrl: Buffer.from("aHR0cHM6Ly9wdWxzb2lkLm5ldC9vYXV0aDIvYXV0aG9yaXpl", "base64").toString(),
  client_id: Buffer.from("ZGZhY2U5Y2EtMGZjYi00YjMxLTg4NzQtZGQ0YWRhZGJiYjA3", "base64").toString(),
  redirect_uri: "",
  response_type: "token",
  scope: "data:heart_rate:read",
  state: getUuid(true),
  response_mode: "web_page"
}
exports.pulsoidApi = pulsoidApi
