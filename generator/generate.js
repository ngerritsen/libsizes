var q = require('q');

var getBundleSizes = require('./get-bundle-sizes')

var libraries = ['react', 'redux', 'underscore'];
var percentage = 0;

getLibrarySizes(libraries).then(function (data) {
  console.log(data);
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
  console.log(newPercentage + '%');
}
