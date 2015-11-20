import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

import Details from './details.jsx'
import NoMatch from './no-match.jsx'

const App = React.createClass({
  render: () => {
    return (
      <div>
        <h1>
          Product Listing Demo
        </h1>
        <Link to="/details/777">Details</Link>
      </div>
    )
  }
})

render(<Router>
    <Route path="/" component={App} />
    <Route path="details/:id" component={Details} />
    <Route path="*" component={NoMatch} />
  </Router>, document.getElementById('app'));