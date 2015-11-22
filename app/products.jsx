import React from 'react'
import {map, chain, extend} from 'underscore'

import Product from './product.jsx'


export default class Products extends React.Component {
  downscaleImage (product) {
    let {image} = product,
        downscaled = image.replace('.jpg', '-small.jpg')
    return extend(product, {picture: downscaled}) 
  }


  render () {
    const list = this.props.list;
    const products = chain(list)
      .map(this.downscaleImage)
      .map(product => {
        var { id, ...other } = product
        return <Product { ...other } key={id} />
      })
      .value()
    return <div>{products}</div>
  }
}