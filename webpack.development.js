/**
 * React Modal Box
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'horizontal-slide': './examples/scripts/horizontal-slide',
    'vertical-slide': './examples/scripts/vertical-slide'
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, './examples/dist/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /.jsx?$/,  loader: 'babel-loader',  exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true, minimize: false })
  ]
};