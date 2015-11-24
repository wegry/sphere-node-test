import React from 'react'
import request from 'superagent'
import {map, chain, extend, first} from 'underscore'

import Product from './product.jsx'
import downscaleImage from './picture-wrangler'


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
          let list = JSON.parse(res.text),
              downscaledList = map(list, product => {
                let image = first(product.images),
                    downscaledImage = downscaleImage(image)
                return extend(product, {picture: downscaledImage})
              })

          this.setState({list: downscaledList})
        }
      })
  }

  render () {
    const list = this.state.list;
    const products = list.map(product => {
        return <Product { ...product } key={product.id} />
      })
    return <div className='product-grid'>{products}</div>
  }
}