const BPromise = require('bluebird');

function runIteratorAsync(iterator) {
  return new BPromise((resolve, reject) => {
    runIteratorStepAsync(iterator, resolve, reject);
  });
}

function runIteratorStepAsync(iterator, resolve, reject, previousValue) {
  const { value, done } = iterator.next(previousValue);

  if (done) {
    resolve(value);
  } else if (value && typeof value.then === 'function') {
    handlePromise(iterator, value);
  } else {
    runIteratorStepAsync(iterator, value);
  }
}

function handlePromise(iterator, value, reject) {
  value.then(result => runIteratorStepAsync(iterator, result));
  value.catch(error => reject(error));
}

module.exports = { runIteratorAsync };
