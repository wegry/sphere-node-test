import React from 'react'
import request from 'superagent'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Details from './details.jsx'
import Products from './products.jsx'
import NoMatch from './no-match.jsx'


class App extends React.Component {
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

  render () {
    const list = this.state.list
    return (
      <div>
      <h1>
      Product Listing Demo
      </h1>
      <Products list={list} />
      </div>
      )
  }
}

let history = createBrowserHistory()

render(<Router history={history}>
  <Route path="/" component={App} />
  <Route path="details" component={Details} />
  <Route path="*" component={NoMatch} />
  </Router>, document.getElementById('app'))