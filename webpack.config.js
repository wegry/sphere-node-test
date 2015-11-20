module.exports = {

  entry: __dirname + '/app/' + 'app.jsx',
  devtool: 'source-map',

  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader' 
    }
    ]
  },

  output: {
    path: __dirname + '/public',
    filename: 'app.min.js'
  }
}