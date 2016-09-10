const librariesConfig = require('../etc/libraries.json');
const library = require('./library');
const run = require('./runner');
const prepare = require('./preparator')

console.log('Starting generation process\n');

const libraries = librariesConfig.map(library);

prepare()
  .then(() => run(libraries))
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
