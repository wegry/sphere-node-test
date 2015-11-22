import React from 'react'

export default class Product extends React.Component {
  render () {
    const props = this.props
    return (
      <a href="/#details/77">
        <img src={props.picture}></img>
        <div>{props.name}</div>
      </a>
    )
  }
}
