const { exec } = require('child_process')
const BPromise = require('bluebird')

function getInfo(libraryString) {
  return new BPromise((resolve, reject) => {
    exec(`npm view ${libraryString} --json`, (error, stdout) => {
      if (error) {
        reject(createLibraryResolveError(libraryString))
        return
      }

      try {
        resolve(processLibraryInfo(stdout, libraryString))
      } catch (parseError) {
        reject(createLibraryResolveError(libraryString))
      }
    })
  })
}

function processLibraryInfo(rawInfo) {
  const library = parseRawLibraryInfo(rawInfo)

  if (!library.name || !library.version) {
    throw Error('Empty JSON')
  }

  return library
}

function parseRawLibraryInfo(rawInfo) {
  const libraryInfo = JSON.parse(rawInfo)

  if (Array.isArray(libraryInfo)) {
    return libraryInfo[libraryInfo.length - 1]
  }

  return libraryInfo
}

function createLibraryResolveError(libraryString) {
  return new Error(`Could not resolve "${libraryString}"`)
}

function install(library, dir) {
  const { name, version } = library
  return new BPromise((resolve, reject) => {
    exec(`npm init -y; npm install ${name}@${version}`, { cwd: dir }, error => {
      if (error) {
        reject(`Install error: ${error}`)
      }

      resolve()
    })
  })
}

module.exports = {
  getInfo,
  install
}
