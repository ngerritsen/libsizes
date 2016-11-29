var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './client/main.js',
  output: {
		path: './public',
    filename: 'bundle.js',
    publicPath: '/public'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /client/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'libsizes - library sizes generated with webpack',
      template: './client/index.html',
      inject: true,
      hash: true
    })
  ]
};
