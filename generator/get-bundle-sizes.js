var browserify = require('browserify');
var gzipSize = require('gzip-size');
var q = require('q');

process.env.NODE_ENV = 'production';

var uglifyOpts = {
  global: true
};

module.exports = function getBundleSizes (lib) {
  var deferred = q.defer();
  var sizesPromises = [getNormalSize(lib), getMinSize(lib), getMinGzipSize(lib)];

  q.all(sizesPromises).then(function (sizes) {
    deferred.resolve(mapSizes(sizes, lib))
  });

  return deferred.promise;
}

function getNormalSize (lib) {
  var deferred = q.defer();
  var bundler = getNewBundler(lib);
  var bundle = bundler.bundle();

  getBundleSize(bundle, 'size').then(deferred.resolve);

  return deferred.promise;
}

function getMinSize (lib) {
  var deferred = q.defer();
  var bundler = getNewBundler(lib);

  bundler.transform(uglifyOpts, 'uglifyify');

  var bundle = bundler.bundle();

  getBundleSize(bundle, 'min').then(deferred.resolve);

  return deferred.promise;
}

function getMinGzipSize (lib) {
  var deferred = q.defer();
  var bundler = getNewBundler(lib);

  bundler.transform(uglifyOpts, 'uglifyify');

  var bundle = bundler.bundle();

  getBundleSize(bundle, 'minGzip', true).then(deferred.resolve);

  return deferred.promise;
}

function getBundleSize (bundle, type, gzip) {
  var deferred = q.defer();
  var buff;
  var string = '';

  bundle.on('data', function (chunck) {
    buff += chunck;
  });

  bundle.on('end', function () {
    deferred.resolve({
      type: type,
      value: gzip ? gzipSize.sync(buff) : buff.length
    });
  });

  return deferred.promise
}

function getNewBundler (lib) {
  var bundler = browserify();
  bundler.require(lib);
  return bundler;
}

function mapSizes (sizes, lib) {
  var libSizes = {
    lib: lib
  };

  sizes.forEach(function (size) {
    libSizes[size.type] = size.value;
  });

  return libSizes;
}
