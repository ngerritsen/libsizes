var fs = require('fs');

module.exports = function writeResults (results) {
  var stringResults = JSON.stringify(results, null, 2);
  var fileContents = 'export default ' + stringResults;

  fs.writeFile('./client/libraries.js', fileContents, function (err) {
    if (err) throw err;
    console.log('Saved results to ./client/libraries.js');
  });
}
