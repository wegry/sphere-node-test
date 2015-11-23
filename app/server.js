import {map, first} from 'underscore'
import Router from 'react-router'
import ReactDOM from 'react-dom'
import express from 'express'
import path from 'path'

import {SphereClient} from 'sphere-node-sdk'

import routes from './routes.jsx'

const opts = {
  config: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    project_key: process.env.PROJECT_KEY
  }
}

const client         = new SphereClient(opts),
      app            = express(),
      port           = process.env.PORT || 5000,
      publicDir      = path.join(__dirname, '../public')


function extractProducts (response) {
  const products = response.body.results,
        theEssentials = map(products, product => {
          const data = product.masterData.current 
          return {
            name: data.name.en,
            description: data.description.en,
            id: product.id,
            image: first(data.masterVariant.images).url
          }
        })
  return Promise.resolve(theEssentials)
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${publicDir}/index.html`)
})

app.get('/products', (req, res) => {
  client.products.all().fetch()
      .then(extractProducts)
      .then(products => res.json(products))
})

app.get('/product/:productID', function(req, res) {
  res.send(`Product ID is ${req.params.productID}.`)
})

const server = app.listen(port, () => {
  console.log('Node app is running on port', port)
})
