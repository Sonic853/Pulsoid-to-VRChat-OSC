const { getUuid } = require('./method')
const pulsoidApi = {
  baseUrl: "https://pulsoid.net/oauth2/authorize",
  client_id: Buffer.from("ZGZhY2U5Y2EtMGZjYi00YjMxLTg4NzQtZGQ0YWRhZGJiYjA3", "base64").toString(),
  redirect_uri: "",
  response_type: "token",
  scope: "data:heart_rate:read",
  state: getUuid(true),
  response_mode: "web_page"
}
exports.pulsoidApi = pulsoidApi
