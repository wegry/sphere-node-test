import React from 'react'

export default class Product extends React.Component {
  render () {
    const { id, name, picture } = this.props,
          link = `/#details/${id}`

    return (
      <div className='product'>
        <a href={link}>
          <img src={picture}></img>
          <p>{name}</p> 
        </a>
      </div>
      )
  }
}
