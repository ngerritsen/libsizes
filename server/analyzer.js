const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const BPromise = require('bluebird');
const gzipSize = require('gzip-size');
const rimraf = require('rimraf');
const { runIteratorAsync } = require('./helpers');

const OUTPUT_FILENAME = 'bundle.js';
const OUTPUT_FILENAME_MINIFIED = 'bundle.min.js';
const NODE_MODULES_DIR = 'node_modules';
const TMP_DIR = '.tmp';

function analyzeLibrary(library) {
  return runIteratorAsync(run(library));
}

function *run(library) {
  const dir = setupDir(library);

  yield install(library, dir);
  yield buildLibrary(library, dir);
  yield buildLibrary(library, dir, true);

  const sizes = measureFilesizes(dir);
  cleanUp(dir, library);

  return sizes;
}

function setupDir(library) {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR);
  }

  const dir = fs.mkdtempSync(TMP_DIR + path.sep);
  console.log(`Started processing "${library}" in working directory: "${dir}".`);

  return dir;
}

function cleanUp(dir, library) {
  rimraf.sync(dir);
  console.log(`Done processing "${library}"!\n`);
}

function install(library, dir) {
  return new BPromise((resolve, reject) => {
    exec(`npm init -y; npm install ${library}`, { cwd: dir }, error => {
      if (error) {
        reject(`exec error: ${error}`);
      }

      console.log(`Installed "${library}".`);
      resolve();
    });
  });
}

function measureFilesizes(dir) {
  const bundleBuf = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME));
  const bundleBufMinified = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME_MINIFIED));
  const sizes = {
    normal: bundleBuf.length,
    minified: bundleBufMinified.length,
    minifiedGzipped: gzipSize.sync(bundleBufMinified.toString())
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
      entry: path.resolve(dir, NODE_MODULES_DIR, library),
      output: {
        path: dir,
        filename: minified ? OUTPUT_FILENAME_MINIFIED : OUTPUT_FILENAME
      },
      plugins
    }, error => {
      if (error) {
        reject(error);
      }

      console.log(`${minified ? 'Minified bundle' : 'Bundle'} built for "${library}".`);
      resolve();
    });
  });
}

module.exports = analyzeLibrary;
