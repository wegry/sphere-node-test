import express from 'express'
import path from 'path'

const app = express(),
      htmlDir = path.join(__dirname, '../public');

const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.sendFile(`${htmlDir}/index.html`)
})

app.get('/app.js', function (req, res) {
  res.sendFile(`${htmlDir}/app.min.js`)
})

app.get('/app.css', function (req, res) {
  res.sendFile(`${htmlDir}/app.css`)
})

app.get('/product/:productID', function(req, res) {
  res.send(`Product ID is ${req.params.productID}.`)
})

const server = app.listen(port, () => {
  console.log('Node app is running on port', port);
})
