const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './client/main.js'
  ],
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
      process: {
        env: {
          NODE_ENV: JSON.stringify(env)
        }
      }
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      title: 'libsizes - library sizes generated with webpack',
      template: './client/index.html',
      inject: true,
      hash: true
    })
  ]
};

if (env === 'development') {
  config.devtool = 'source-map';
  config.watch = true;
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false
      }
    })
  );
}

module.exports = config;
