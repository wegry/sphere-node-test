import express from 'express'
import path from 'path'

const app = express(),
      htmlDir = path.join(__dirname, '../public');

app.get('/', function (req, res) {
  res.sendFile(`${htmlDir}/index.html`)
})

app.get('/app.js', function (req, res) {
  res.sendFile(`${htmlDir}/app.min.js`)
})

app.get('/product/:productID', function(req, res) {
  res.send(`Product ID is ${req.params.productID}.`)
})

const server = app.listen(3000, function () {
  const host = server.address().address,
        port = server.address().port

  console.log(`Example app listening at http://${host}:${port}`)
})
