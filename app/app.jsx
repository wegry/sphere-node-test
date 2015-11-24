import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Route, Router, Link } from 'react-router'

import Products from './products.jsx'
import NoMatch from './no-match.jsx'
import Details from './details.jsx'

class App extends React.Component {
  render () {
    return (
            <div>
              <h1>
              Demo
              </h1>
              {this.props.children}
            </div>
      )
  }
}

render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Products} />
      <Route path='/details/:id' component={Details} />
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>
  ), document.getElementById('app'))
