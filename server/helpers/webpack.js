const webpack = require('webpack');
const BPromise = require('bluebird');
const path = require('path');

const { NODE_MODULES_DIR, OUTPUT_FILENAME, OUTPUT_FILENAME_MINIFIED } = require('../constants');

const webpackAsync = BPromise.promisify(webpack);

function buildLibrary(library, dir, environment) {
  return webpackAsync({
    entry: path.resolve(dir, NODE_MODULES_DIR, library.name),
    output: {
      path: dir,
      filename: environment === 'production' ? OUTPUT_FILENAME_MINIFIED : OUTPUT_FILENAME
    },
    plugins: createWebpackPlugins(environment)
  });
}

function createWebpackPlugins(environment) {
  if (environment === 'production') {
    return [
      createWebpackEnviromentPlugin(environment),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ];
  }

  return [createWebpackEnviromentPlugin(environment)];
}

function createWebpackEnviromentPlugin(environment) {
  return new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${environment}"`
    }
  });
}

module.exports = {
  buildLibrary
};
