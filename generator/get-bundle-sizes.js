var browserify = require('browserify');
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
  var bundler = getNewBundler(lib);
  var bundle = bundler.bundle();

  getBundleSize(bundle).then(function (buff) {
    deferred.resolve({ normal: bytesToKbs(buff.length) });
  });

  return deferred.promise;
}

function getMinGzipSize (lib) {
  var deferred = q.defer();
  var bundler = getNewBundler(lib);

  bundler.transform(uglifyOpts, 'uglifyify');

  var bundle = bundler.bundle();

  getBundleSize(bundle).then(function (buff) {
    deferred.resolve({
      min: bytesToKbs(buff.length),
      mingzip: bytesToKbs(gzipSize.sync(buff))
    })
  });

  return deferred.promise;
}

function getBundleSize (bundle, type) {
  var deferred = q.defer();
  var buff;
  var string = '';

  bundle.on('data', function (chunck) {
    buff += chunck;
  });

  bundle.on('end', function () {
    deferred.resolve(buff);
  });

  return deferred.promise
}

function getNewBundler (lib) {
  var bundler = browserify();
  bundler.require(lib);
  return bundler;
}

function bytesToKbs (bytes) {
  return Math.round(bytes / 1024);
}
