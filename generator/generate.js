var q = require('q');
var fs = require('fs');

var getBundleSizes = require('./get-bundle-sizes');
var manualSizes = require('./manual-sizes');
var filterDepsFromResults = require('./filter-deps-from-results');

var Stopwatch = require('./stopwatch');
var Loader = require('./loader');

var percentage = 0;
var packageJSON = {};
var libraries = [];

module.exports = function generate () {
  var deferred = q.defer();

  fs.readFile('./package.json', function (err, data) {
    if (err) throw err;
    packageJSON = JSON.parse(data);
    libraries = Object.keys(packageJSON.devDependencies);

    console.log('analyzing ' + libraries.length + ' library sizes...');
    var stopwatch = new Stopwatch();

    getLibrarySizes(libraries).then(function (data) {
      var secondsElapsed = Math.round(stopwatch.getTime() / 1000);
      console.log('\ndone analyzing in: ' + secondsElapsed + 's\n');

      var dataWithVersions = addVersions(data);
      var results = dataWithVersions.concat(manualSizes);
      results = filterDepsFromResults(results);

      deferred.resolve(results);
    });
  });

  return deferred.promise;
}

function getLibrarySizes (libs) {
  var promises = [];
  var loader = new Loader(libs, 80);

  libs.forEach(function (lib) {
    var promise = getBundleSizes(lib);

    promise.then(loader.increment);
    promises.push(promise);
  });

  return q.all(promises);
}

function addVersions (data) {
  return data.map(function (lib) {
    lib.version = findVersionForLib(lib.name);
    return lib;
  });
}

function findVersionForLib(libName) {
  var deps = packageJSON.devDependencies;
  var foundVersion = '';

  Object.keys(deps).forEach(function (name) {
    var version = deps[name];

    if (name === libName) {
      foundVersion = version.slice(1, version.length);
    }
  });

  return foundVersion;
}
