module.exports = [
{
  entry: {
    browser: __dirname + '/app/' + 'browser.jsx'
  },
  target: 'web',
  devtool: 'source-map',

  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },

  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader' 
    }
    ]
  },
}
]