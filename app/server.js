import {first, map, pluck} from 'underscore'
import express from 'express'
import path from 'path'

import {SphereClient} from 'sphere-node-sdk'

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

function flattenProduct (product) {
  const data = product.masterData.current

  let images = data.masterVariant.images,
      imageURLs = pluck(images, 'url')

  return {
    name: data.name.en,
    description: data.description.en,
    id: product.id,
    images: imageURLs,
    price: first(data.masterVariant.prices).value
  }
}

function extractProducts (response) {
  const products = response.body.results,
        theEssentials = map(products, flattenProduct)
  return Promise.resolve(theEssentials)
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${publicDir}/index.html`)
})

app.get('/details/:id', (req, res) => {
  const id = req.params.id

  client.products.byId(id)
    .fetch()
    .then(result => {
      return Promise.resolve(result.body)
    })
    .then(product => Promise.resolve(flattenProduct(product, false)))
    .then(product => res.json(product))
})

app.get('/products', (req, res) => {
  client.products.all().fetch()
      .then(extractProducts)
      .then(products => res.json(products))
})

const server = app.listen(port, () => {
  console.log('Node app is running on port', port)
})
