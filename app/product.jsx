import React from 'react'

export default class Product extends React.Component {
  render () {
    const { id, name, picture } = this.props,
          link = `/details/${id}`
    return (
      <a href={link}>
        <img src={picture}></img>
        <p className='productName'>{name}</p> 
      </a>
    )
  }
}
