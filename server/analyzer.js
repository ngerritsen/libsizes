const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const BPromise = require('bluebird');
const gzipSize = require('gzip-size');
const rimraf = require('rimraf');

const { install } = require('./npm-tools');
const { runIteratorAsync } = require('./helpers');

const OUTPUT_FILENAME = 'bundle.js';
const OUTPUT_FILENAME_MINIFIED = 'bundle.min.js';
const NODE_MODULES_DIR = 'node_modules';
const TMP_DIR = '.tmp';

function analyzeLibrary(library, analysisId, onProgress) {
  const dir = setupDir(library, analysisId);
  return runIteratorAsync(run(library, dir, onProgress));
}

function *run(library, dir, onProgress) { // eslint-disable-line max-statements
  onProgress(`Installing ${library.name}@${library.version}...`);
  yield install(library, dir, onProgress);

  onProgress('Running webpack build...');
  yield buildLibrary(library, dir);

  onProgress('Running webpack minfied build...');
  yield buildLibrary(library, dir, true);

  onProgress('Measuring sizes...');
  const sizes = measureFilesizes(dir);

  onProgress('Cleaning up...');
  cleanUp(dir, library);

  return sizes;
}

function setupDir(library, analysisId) {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR);
  }

  const dir = path.resolve(TMP_DIR + path.sep, analysisId);
  fs.mkdirSync(dir);
  console.log(`Started processing "${library.name}" in working directory: "${dir}".`);

  return dir;
}

function cleanUp(dir, library) {
  rimraf.sync(dir);
  console.log(`Done processing "${library.name}"!\n`);
}

function measureFilesizes(dir) {
  const bundleBuf = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME));
  const bundleBufMinified = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME_MINIFIED));
  const sizes = {
    normal: bundleBuf.length,
    minified: bundleBufMinified.length,
    gzipped: gzipSize.sync(bundleBufMinified.toString())
  };

  console.log(JSON.stringify(sizes, null, 2));

  return sizes;
}

function buildLibrary(library, dir, minified = false) {
  const plugins = [];

  if (minified) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return new BPromise((resolve, reject) => {
    webpack({
      entry: path.resolve(dir, NODE_MODULES_DIR, library.name),
      output: {
        path: dir,
        filename: minified ? OUTPUT_FILENAME_MINIFIED : OUTPUT_FILENAME
      },
      plugins
    }, error => {
      if (error) {
        reject(error);
      }

      console.log(`${minified ? 'Minified bundle' : 'Bundle'} built for "${library.name}".`);
      resolve();
    });
  });
}

module.exports = analyzeLibrary;
