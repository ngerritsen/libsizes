const { exec } = require('child_process');
const BPromise = require('bluebird');

function getInfo(libraryString) {
  return new BPromise((resolve, reject) => {
    exec(`npm view ${libraryString} --json`, (error, stdout) => {
      if (error) {
        reject(new Error(`Could not resolve ${libraryString}`));
        return;
      }

      resolve(JSON.parse(stdout));
    });
  });
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
