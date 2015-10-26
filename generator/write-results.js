var fs = require('fs');
var q = require('q');

module.exports = function writeResults (results) {
  var deferred = q.defer();

  var stringResults = JSON.stringify(results, null, 2);
  var fileContents = 'export default ' + stringResults;

  fs.writeFile('./client/libraries.js', fileContents, function (err) {
    if (err) throw err;

    console.log('Saved results to ./client/libraries.js');
    deferred.resolve(results);
  });

  return deferred.promise;
}
