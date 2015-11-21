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

const client         = new SphereClient(opts);
      console.log(Object.getOwnPropertyNames(client))

      // productService = client.products(),

const app            = express(),
      htmlDir        = path.join(__dirname, '../public'),

      port           = process.env.PORT || 5000;


app.get('/', function (req, res) {
  // const products = productService.all().fetch()
  // console.log(products)
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
