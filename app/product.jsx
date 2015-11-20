import React from 'react'
import ReactDOM from 'react-dom'

const mountPoint = document.getElementById('app')

const Product = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<Product name="Top Kek" />, mountPoint);