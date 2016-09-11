const calculate = require('./calculator');

function run(libraries) {
  let results = [];
  let index = 0;
  return calculate(libraries[index])
    .then(result => {
      results = [...results, result];
      return results;
    })
    .then(results => {
      const nextLibrary = libraries[++index];
      if (nextLibrary) {
        return calculate(nextLibrary);
      }

      return results;
    });
}

module.exports = run;
