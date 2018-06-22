const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({ok: true})
})

app.listen(port, () => console.log(`Listening on port ${port}`))
https.createServer({
  cert: fs.readFileSync('./ssl/localhost.crt'),
  key: fs.readFileSync('./ssl/localhost.key'),
}, app).listen(8443)
