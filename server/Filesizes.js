const fs = require("fs");
const path = require("path");
const util = require("util");
const gzipSize = util.promisify(require("gzip-size"));

fs.readFileAsync = util.promisify(fs.readFile);

const { OUTPUT_FILENAME, OUTPUT_FILENAME_MINIFIED } = require("./constants");

class Filesizes {
  async measure(dir) {
    const bundleBuf = await fs.readFileAsync(
      path.resolve(dir, OUTPUT_FILENAME)
    );
    const bundleBufMinified = await fs.readFileAsync(
      path.resolve(dir, OUTPUT_FILENAME_MINIFIED)
    );

    return {
      normal: bundleBuf.length,
      minified: bundleBufMinified.length,
      gzipped: await gzipSize(bundleBufMinified.toString()),
    };
  }
}

module.exports = Filesizes;
