import express from 'express'
import path from 'path'

import {SphereClient} from 'sphere-node-sdk'

const opts = {
  config: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    project_key: process.env.PROJECT_KEY
  }
};

const client         = new SphereClient(opts),
      
      app            = express(),
      port           = process.env.PORT || 5000,
      publicDir      = path.join(__dirname, '../public');

function extractProducts (response) {
  let products = response.body.results
  console.log(products)
  return products
}

app.get('/', function (req, res) {
  client.products.all().fetch()
      .then(results => console.log(results))
  res.sendFile(`${publicDir}/index.html`)
})

app.get('/app.js', function (req, res) {
  res.sendFile(`${publicDir}/app.min.js`)
})

app.get('/app.css', function (req, res) {
  res.sendFile(`${publicDir}/app.css`)
})

app.get('/product/:productID', function(req, res) {
  res.send(`Product ID is ${req.params.productID}.`)
})

const server = app.listen(port, () => {
  console.log('Node app is running on port', port);
})
