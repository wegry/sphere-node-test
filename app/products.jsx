import React from 'react'
import request from 'superagent'
import {map, chain, extend} from 'underscore'

import Product from './product.jsx'


export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [] 
    }
  }

  componentDidMount () {
    request.get('/products')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err) {
          let list = JSON.parse(res.text)
          this.setState({list: list})
        }
      })
  }

  downscaleImage (product) {
    let {image} = product,
        downscaled = image.replace('.jpg', '-small.jpg')
    return extend(product, {picture: downscaled}) 
  }


  render () {
    const list = this.state.list;
    const products = chain(list)
      .map(this.downscaleImage)
      .map(product => {
        var { id } = product
        return <Product { ...product } key={id} />
      })
      .value()
    return <div>{products}</div>
  }
}