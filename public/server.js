'use strict';

var _underscore = require('underscore');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sphereNodeSdk = require('sphere-node-sdk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {
  config: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    project_key: process.env.PROJECT_KEY
  }
};

var client = new _sphereNodeSdk.SphereClient(opts),
    app = (0, _express2.default)(),
    port = process.env.PORT || 5000,
    publicDir = _path2.default.join(__dirname, '../public');

function extractProducts(response) {
  var products = response.body.results,
      theEssentials = (0, _underscore.map)(products, function (product) {
    var data = product.masterData.current;
    return {
      name: data.name.en,
      description: data.description.en,
      id: product.id,
      image: (0, _underscore.first)(data.masterVariant.images).url
    };
  });
  return Promise.resolve(theEssentials);
}

app.get('/', function (req, res) {
  res.sendFile(publicDir + '/index.html');
});

app.get('/app.js', function (req, res) {
  res.sendFile(publicDir + '/app.min.js');
});

app.get('/app.css', function (req, res) {
  res.sendFile(publicDir + '/app.css');
});

app.get('/products', function (req, res) {
  client.products.all().fetch().then(extractProducts).then(function (products) {
    return res.json(products);
  });
});

app.get('/product/:productID', function (req, res) {
  res.send('Product ID is ' + req.params.productID + '.');
});

var server = app.listen(port, function () {
  console.log('Node app is running on port', port);
});