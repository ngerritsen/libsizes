const run = require('./runner');
const prepare = require('./preparator')
const libraries = require('../etc/libraries.json');

console.log('Starting generation process\n');

prepare()
  .then(() => run(libraries.map(lib => ({ name: lib }))))
  .then(results => console.log(JSON.stringify(results, null, 2)))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
