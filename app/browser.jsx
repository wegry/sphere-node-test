var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.jsx');

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document);
});