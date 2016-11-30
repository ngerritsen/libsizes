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

runIteratorAsync(run(['redux']));

function *run(libraries) { // eslint-disable-line max-statements
  setupDir();

  for (let i = 0; i < libraries.length; i += 1) {
    const dir = fs.mkdtempSync(TMP_DIR + path.sep);
    const library = libraries[i];
    console.log(`Started processing "${library}" in working directory: "${dir}".`);

    yield install(library, dir);
    yield buildLibrary(library, dir);
    yield buildLibrary(library, dir, true);

    const result = measureFilesizes(dir);

    console.log(JSON.stringify(result, null, 2));

    rimraf.sync(dir);

    console.log(`Done processing "${library}"!\n`);
  }
}

function setupDir() {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR);
  }
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

  return {
    normal: Math.round(bundleBuf.length / 1000, 1),
    minified: Math.round(bundleBufMinified.length / 1000, 1),
    minifiedGzipped: Math.round(gzipSize.sync(bundleBufMinified.toString()) / 1000, 1)
  };
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
