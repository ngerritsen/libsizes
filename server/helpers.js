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
    handlePromise(iterator, resolve, reject, value);
  } else {
    runIteratorStepAsync(iterator, resolve, reject, value);
  }
}

function handlePromise(iterator, resolve, reject, value) {
  value.then(result => runIteratorStepAsync(iterator, resolve, reject, result));
  value.catch(error => reject(error));
}

module.exports = { runIteratorAsync };
