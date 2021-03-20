const path = require("path");
const util = require("util");
const rimraf = util.promisify(require("rimraf"));
const mkdirp = util.promisify(require("mkdirp"));

const { TMP_DIR, PRODUCTION, DEVELOPMENT } = require("./constants");

class Analyzer {
  constructor(npm, webpack, filesizes) {
    this._npm = npm;
    this._webpack = webpack;
    this._filesizes = filesizes;
  }

  async analyze(library, analysisId, onProgress) {
    const dir = path.resolve(TMP_DIR, analysisId);

    try {
      await mkdirp(dir);

      onProgress(`Installing ${library.name}@${library.version}...`);
      await this._npm.install(library, dir, onProgress);

      onProgress("Running webpack build...");
      await this._webpack.build(library, dir, DEVELOPMENT);

      onProgress("Running webpack minified build...");
      await this._webpack.build(library, dir, PRODUCTION);

      onProgress("Measuring sizes...");
      return this._filesizes.measure(dir);
    } catch (error) {
      await rimraf(dir);
      throw error;
    } finally {
      onProgress("Cleaning up...");
      await rimraf(dir);
    }
  }
}

module.exports = Analyzer;
