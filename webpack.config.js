module.exports = {

  entry: __dirname + '/app/' + 'details.js',
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