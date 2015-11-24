import React from 'react'
import { Link } from 'react-router'
import request from 'superagent'
import {isEmpty, first, extend} from 'underscore'

import downscaleImage from './picture-wrangler'

class Details extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      list: [] 
    }
  }

  componentDidMount () {
    request.get(`/details/${this.state.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err) {
          let {images, ...details} = JSON.parse(res.text)
          let downscaledImage = downscaleImage(first(images), '-medium')
          let downscaledDetails = extend(details, {image: downscaledImage})
          this.setState(downscaledDetails)
        }
      })
  }

  formatPrice (price) {
    if (isEmpty(price)) {
      return ''
    }

    let cents = price.centAmount / 100
    return cents.toLocaleString([], {style: 'currency', currency: price.currencyCode})
  }

  render () {
    const state = this.state;

    if (isEmpty(state)) {
      return <div className='item-details'></div>
    }

    let price = this.formatPrice(state.price)

    var displayImage
    if (state.image) {
      displayImage = <img src={state.image} ></img>
    }

    return (
      <div className='item-details'>
        {displayImage}
        <div>
          <h2>{state.name}</h2>
          <h3>{price}</h3>
          <p>{state.description}</p>
        </div>
      </div>
    )
  }
}

export default Details