/**
 * React Modal Box
 */
var path    = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "index.min.js",
    library: ["slide-it"],
    libraryTarget: "umd",
    publicPath: "/dist/"
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /.jsx?$/,  loader: 'babel-loader',  exclude: /node_modules/},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
    })
  ]
};