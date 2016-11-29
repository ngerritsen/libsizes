function asyncIteratorRunner(iterator, previousValue, callback = () => {}) {
  const { value, done } = iterator.next(previousValue);

  if (done) {
    callback(value);
    return;
  }

  if (value && typeof value.then === 'function') {
    value.then(result => asyncIteratorRunner(iterator, result, callback));
    value.catch(error => {
      throw new Error(error);
    });

    return;
  }

  asyncIteratorRunner(iterator, value, callback);
}

module.exports = { asyncIteratorRunner };
