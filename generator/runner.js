const calculate = require('./calculator');

function run(libraries) {
  let index = 0;
  return calculate(libraries[index])
    .then(result => {
      console.log(result);
      const nextLibrary = libraries[++index];
      if (nextLibrary) {
        return calculate(nextLibrary);
      }
    });
}

module.exports = run;
