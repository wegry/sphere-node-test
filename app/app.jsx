import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

export default class App extends React.Component {
  render () {
    return (
      <html>
      <head>
        <title>Test</title>
        <link rel="stylesheet" type="text/css" href="/app.css" />
      </head>
      <body>
        <div id="app">
            <div>
              <Link to="/#sobroke">Is broken</Link>
              <h1>
              Product Listing Demo
              </h1>
            </div>
        </div>
        <script src="/app.js"></script>
      </body>
      </html>
      )
  }
}

let history = createBrowserHistory()

render(<Router history={history}>
  <Route path='/' component={App} />
  <Route path='/#details' component={Details} />
  <Route path='*' component={NoMatch} />
  </Router>, document.getElementById('app'))
