import { Route, IndexRoute } from 'react-router'
import React from 'react'

import App from './app.jsx'
import Details from './details.jsx'
import NoMatch from './no-match.jsx'
import Products from './products.jsx'


export default <Route path='/' component={App} >
  <IndexRoute component={Products} />
  <Route path='/#/details/:id' component={Details} />
  <Route path='/#/*' component={NoMatch} />
</Route>