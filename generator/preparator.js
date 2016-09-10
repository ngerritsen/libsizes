const fs = require('fs');
const rimraf = require('rimraf');
const Bromise = require('bluebird');

const mkdirPromise = Bromise.promisify(fs.mkdir);
const rimrafPromise = Bromise.promisify(rimraf);
const TEMP_PATH = '.tmp';

function prepare() {
  return rimrafPromise(TEMP_PATH)
    .then(() => mkdirPromise(TEMP_PATH))
}

module.exports = prepare;
