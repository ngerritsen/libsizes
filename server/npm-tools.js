const { exec } = require('child_process');
const BPromise = require('bluebird');

function getInfo(libraryString) {
  return new BPromise((resolve, reject) => {
    exec(`npm view ${libraryString} --json`, (error, stdout) => {
      if (error) {
        reject(createLibraryResolveError(libraryString));
        return;
      }

      try {
        const library = processLibraryInfo(stdout, libraryString);
        resolve(library);
      } catch (parseError) {
        reject(createLibraryResolveError(libraryString));
      }
    });
  });
}

function processLibraryInfo(rawInfo) {
  let library = JSON.parse(rawInfo);

  if (Array.isArray(library)) {
    library = library[library.length - 1];
  }

  if (!library.name || !library.version) {
    throw Error('Empty JSON');
  }

  return library;
}

function createLibraryResolveError(libraryString) {
  return new Error(`Could not resolve "${libraryString}"`);
}

function install(library, dir) {
  const { name, version } = library;
  return new BPromise((resolve, reject) => {
    exec(`npm init -y; npm install ${name}@${version}`, { cwd: dir }, error => {
      if (error) {
        reject(`Install error: ${error}`);
      }

      console.log(`Installed "${name}" with version "${version}".`);
      resolve();
    });
  });
}

module.exports = {
  getInfo,
  install
};
