var MemoryFS = require("memory-fs");
var webpack = require("webpack");
var path = require('path');
var gzipSize = require('gzip-size');
var q = require('q');

process.env.NODE_ENV = 'production';

var uglifyOpts = {
  global: true
};

module.exports = function getBundleSizes (lib) {
  var deferred = q.defer();
  var sizesPromises = [getNormalSize(lib), getMinGzipSize(lib)];

  q.all(sizesPromises).then(function (sizes) {
    deferred.resolve(Object.assign({ name: lib }, sizes[0], sizes[1]))
  });

  return deferred.promise;
}

function getNormalSize (lib) {
  var deferred = q.defer();
  var fs = new MemoryFS();
  var config = generateWebpackBaseConfig(lib)

  var compiler = webpack(config);

  compiler.outputFileSystem = fs;

  compiler.run(function(err, stats) {
    if (err) throw err;
    var fileContent = fs.readFileSync('/' + lib + '.js');
    deferred.resolve({ normal: bytesToKbs(fileContent.length) });
  });

  return deferred.promise;
}

function getMinGzipSize (lib) {
  var deferred = q.defer();
  var fs = new MemoryFS();
  var config = generateWebpackBaseConfig(lib)

  var compiler = webpack(
    Object.assign(config, {
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
    ]
  }));

  compiler.outputFileSystem = fs;

  compiler.run(function(err, stats) {
    if (err) throw err;
    var fileContent = fs.readFileSync('/' + lib + '.js');
    deferred.resolve({
      min: bytesToKbs(fileContent.length),
      mingzip: bytesToKbs(gzipSize.sync(fileContent))
    });
  });

  return deferred.promise;
}

function generateWebpackBaseConfig (lib) {
  return {
    entry: lib,
    output: {
      path: path.join('/'),
      filename: lib + '.js',
      libraryTarget: 'umd'
    }
  }
}

function bytesToKbs (bytes) {
  return Math.round(bytes / 1024);
}
