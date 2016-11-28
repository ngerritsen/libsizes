const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const BPromise = require('bluebird');
const gzipSize = require('gzip-size');
const rimraf = require('rimraf');
const libraries = require('./etc/libraries.json');

const OUTPUT_FILENAME = 'bundle.js';
const OUTPUT_FILENAME_MINIFIED = 'bundle.min.js';
const NODE_MODULES_DIR = 'node_modules';
const TMP_DIR = '.tmp';

setupDir();
asyncIteratorRunner(runAll(libraries));

function *runAll(libraries) {
  for(let i = 0; i < libraries.length; i++) {
    yield run(libraries[i]);
  }
}

function run(library) {
  const dir = fs.mkdtempSync(TMP_DIR + path.sep);
  console.log(`Started processing "${library}" in working directory: "${dir}".`);

  return install(library, dir)
    .then(() => buildLibrary(library, dir))
    .then(() => buildLibrary(library, dir, true))
    .then(() => measureFilesizes(dir))
    .then(() => rimraf.sync(dir))
    .then(() => console.log(`Done processing "${library}"!\n`))
    .catch(error => {
      throw new Error(error);
    })
}

function setupDir() {
  if (!fs.existsSync(TMP_DIR)){
    fs.mkdirSync(TMP_DIR);
  }
}

function install(library, dir) {
  return new BPromise((resolve, reject) => {
    exec(`npm init -y; npm install ${library}`, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        reject(`exec error: ${error}`);
      }

      console.log(`Installed "${library}".`);
      resolve();
    });
  })
}

function measureFilesizes(dir) {
  const bundleBuf = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME));
  const bundleBufMinified = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME_MINIFIED));

  console.log(Math.round(bundleBuf.length / 1000, 1) + ' kB');
  console.log(Math.round(bundleBufMinified.length / 1000, 1) + ' kB');
  console.log(Math.round(gzipSize.sync(bundleBufMinified.toString()) / 1000, 1) + ' kB');
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
    }, (error, stats) => {
      if (error) {
        reject(error);
      }

      console.log(`${minified ? 'Minified bundle' : 'Bundle'} built for "${library}".`);
      resolve();
    })
  })
}

function asyncIteratorRunner(iterator, previousValue) {
  const { value, done } = iterator.next(previousValue);

  if (done) {
    return;
  }

  if (value && typeof value.then === 'function') {
    value.then(result => asyncIteratorRunner(iterator, result));
    return;
  }

  asyncIteratorRunner(iterator, value);
}
