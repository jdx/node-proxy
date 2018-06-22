const fs = require('fs')
const https = require('https')
const http = require('http')
const log = msg => process.stdout.write(msg + '\n')

const server = proto => (req, res) => {
  // log(`headers: ${Object.entries(req.headers)}`)
  const host = req.headers.host
  log(`${req.method} ${proto}://${host}${req.url}`)
  const proxy = http.request({
    hostname: 'localhost',
    port: 3000,
    path: req.url,
    method: req.method
  }, remote => {
    remote.pipe(res, {end: true})
  })
  req.pipe(proxy, {end: true})
}

const httpPort = process.env.HTTP_PORT || 80
const httpsPort = process.env.HTTP_PORT || 443

http.createServer(server('http')).listen(httpPort, '127.0.0.1', () => log(`🚀 proxying http traffic on 127.0.0.1:${httpPort}`))
https.createServer({
  cert: fs.readFileSync('./ssl/localhost.crt'),
  key: fs.readFileSync('./ssl/localhost.key')
}, server('https')).listen(httpsPort, '127.0.0.1', () => log(`🚀 proxying https traffic on 127.0.0.1:${httpsPort}`))
