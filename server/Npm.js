const util = require("util");
const exec = util.promisify(require("child_process").exec);

class Npm {
  getInfo(libraryString) {
    return new Promise((resolve, reject) => {
      exec(`npm view ${libraryString} --json`, (error, stdout) => {
        if (error) {
          reject(this._createLibraryResolveError(libraryString));
          return;
        }

        try {
          resolve(this._processLibraryInfo(stdout, libraryString));
        } catch (parseError) {
          reject(this._createLibraryResolveError(libraryString));
        }
      });
    });
  }

  install(library, dir) {
    const { name, version } = library;
    return new Promise((resolve, reject) => {
      exec(
        `npm init -y; npm install ${name}@${version}`,
        { cwd: dir },
        (error) => {
          if (error) {
            reject(`Install error: ${error}`);
          }

          resolve();
        }
      );
    });
  }

  _processLibraryInfo(rawInfo) {
    const library = this._parseRawLibraryInfo(rawInfo);

    if (!library.name || !library.version) {
      throw Error("Empty JSON");
    }

    return library;
  }

  _parseRawLibraryInfo(rawInfo) {
    const libraryInfo = JSON.parse(rawInfo);

    if (Array.isArray(libraryInfo)) {
      return libraryInfo[libraryInfo.length - 1];
    }

    return libraryInfo;
  }

  _createLibraryResolveError(libraryString) {
    return new Error(`Could not resolve "${libraryString}"`);
  }
}

module.exports = Npm;
