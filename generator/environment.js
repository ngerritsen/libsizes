const fs = require('fs');
const Bromise = require('bluebird');
const path = require('path');
const childProcess = require('child_process');

const mkdirPromise = Bromise.promisify(fs.mkdir);
const writeFilePromise = Bromise.promisify(fs.writeFile);
const execPromise = Bromise.promisify(childProcess.exec);
const TEMP_PATH = '.tmp';

function createEnvironment(library) {
  const environmentPath = path.resolve(TEMP_PATH, library.name);
  const name = library.name;

  return makeDir(environmentPath)
    .tap(() => console.log(`Created environment for ${name}.`))
    .then(() => createPackageFile(environmentPath, library))
    .tap(() => console.log(`Created package file for ${name}.`))
    .tap(() => console.log(`Installing ${name}...`))
    .then(() => installLibrary(environmentPath, library))
    .then(() => readVersion(environmentPath, library))
    .tap(version => console.log(`Installed ${name} with version ${version}.`))
    .then(version => ({
      path: environmentPath,
      library: Object.assign({}, library, { version })
    }));
}

function makeDir(environmentPath) {
  return mkdirPromise(environmentPath);
}

function createPackageFile(environmentPath, library) {
  const fileContent = JSON.stringify(createPackageInfo(library), null, 2);
  const filePath = path.resolve(environmentPath, 'package.json');
  return writeFilePromise(filePath, fileContent);
}

function installLibrary(environmentPath, library) {
  const command = `cd ${environmentPath}; npm install ${library.name} --save`;
  return execPromise(command);
}

function createPackageInfo(library) {
  return {
    name: library.name + '-environment',
    version: '0.1.0'
  };
}

function readVersion(environmentPath, library) {
  const packageInfo = require(path.resolve(environmentPath, 'package.json'));
  const semver = packageInfo.dependencies[library.name];
  return formatVersion(semver);
}

function formatVersion(semver) {
  return semver.slice(1, semver.length);
}

module.exports = createEnvironment;
