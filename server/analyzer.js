const path = require('path');
const fs = require('fs');
const co = require('co');
const BPromise = require('bluebird');
const gzipSize = require('gzip-size');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const { TMP_DIR, OUTPUT_FILENAME, OUTPUT_FILENAME_MINIFIED, PRODUCTION, DEVELOPMENT } = require('./constants');
const { install } = require('./helpers/npm');
const { buildLibrary } = require('./helpers/webpack');

const mkdirpAsync = BPromise.promisify(mkdirp);
const rimrafAsync = BPromise.promisify(rimraf);

function analyzeLibrary(library, analysisId, onProgress) {
  return BPromise.resolve(co(run(library, analysisId, onProgress)));
}

function *run(library, analysisId, onProgress) { // eslint-disable-line max-statements
  const dir = path.resolve(TMP_DIR, analysisId);

  yield mkdirpAsync(dir);

  onProgress(`Installing ${library.name}@${library.version}...`);
  yield install(library, dir, onProgress);

  onProgress('Running webpack build...');
  yield buildLibrary(library, dir, DEVELOPMENT);

  onProgress('Running webpack minified build...');
  yield buildLibrary(library, dir, PRODUCTION);

  onProgress('Measuring sizes...');
  const sizes = measureFilesizes(dir);

  onProgress('Cleaning up...');
  yield rimrafAsync(dir);

  return sizes;
}

function measureFilesizes(dir) {
  const bundleBuf = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME));
  const bundleBufMinified = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME_MINIFIED));
  return {
    normal: bundleBuf.length,
    minified: bundleBufMinified.length,
    gzipped: gzipSize.sync(bundleBufMinified.toString())
  };
}

module.exports = analyzeLibrary;
