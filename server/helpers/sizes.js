const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size');

const { OUTPUT_FILENAME, OUTPUT_FILENAME_MINIFIED } = require('./constants');

function measureFilesizes(dir) {
  const bundleBuf = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME));
  const bundleBufMinified = fs.readFileSync(path.resolve(dir, OUTPUT_FILENAME_MINIFIED));
  return {
    normal: bundleBuf.length,
    minified: bundleBufMinified.length,
    gzipped: gzipSize.sync(bundleBufMinified.toString())
  };
}

module.exports = { measureFilesizes };
