var q = require('q');
var fs = require('fs');

var getBundleSizes = require('./get-bundle-sizes');
var manualSizes = require('./manual-sizes');
var writeResults = require('./write-results');
var logResults = require('./log-results');
var buildClient = require('./build-client');

var percentage = 0;
var packageJSON = {};
var libraries = [];

fs.readFile('./package.json', function (err, data) {
  if (err) throw err;
  packageJSON = JSON.parse(data);
  libraries = Object.keys(packageJSON.devDependencies);

  console.log('analyzing library sizes...');

  getLibrarySizes(libraries).then(function (data) {
    console.log('\ndone analyzing!\n');

    var dataWithVersions = addVersions(data);
    var results = dataWithVersions.concat(manualSizes);

    logResults(results);
    writeResults(results).then(function () {
      buildClient();
    });
  });
});

function getLibrarySizes (libs) {
  var promises = [];

  libs.forEach(function (lib) {
    var promise = getBundleSizes(lib);

    promise.then(updatePercentage);
    promises.push(promise);
  });

  return q.all(promises);
}

function updatePercentage (data) {
  var newPercentage = Math.ceil(percentage += 100 / libraries.length);
  var loaderSize = 70;
  var loaderPercentage = loaderSize/100 * newPercentage;
  var loader = '';

  for (var i = 0; i < loaderPercentage; i++) {
    loader += '-';
  }

  for (var i = loaderPercentage; i < loaderSize; i++) {
    loader += ' ';
  }

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(newPercentage + '% [' + loader + ']');
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
