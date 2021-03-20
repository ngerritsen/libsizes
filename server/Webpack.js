const util = require("util");
const path = require("path");
const webpack = util.promisify(require("webpack"));

const {
  NODE_MODULES_DIR,
  OUTPUT_FILENAME,
  OUTPUT_FILENAME_MINIFIED,
} = require("./constants");

class Webpack {
  build(library, dir, mode) {
    return webpack({
      entry: path.resolve(dir, NODE_MODULES_DIR, library.name),
      output: {
        path: dir,
        filename:
          mode === "production" ? OUTPUT_FILENAME_MINIFIED : OUTPUT_FILENAME,
      },
      mode,
    });
  }
}

module.exports = Webpack;
