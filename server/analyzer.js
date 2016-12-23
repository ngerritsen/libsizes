const path = require('path')
const co = require('co')
const BPromise = require('bluebird')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

const { measureFilesizes } = require('./helpers/sizes')
const { TMP_DIR, PRODUCTION, DEVELOPMENT } = require('./constants')
const { install } = require('./helpers/npm')
const { buildLibrary } = require('./helpers/webpack')

const mkdirpAsync = BPromise.promisify(mkdirp)
const rimrafAsync = BPromise.promisify(rimraf)

function analyzeLibrary(library, analysisId, onProgress) {
  return BPromise.resolve(co(run(library, analysisId, onProgress)))
}

function *run(library, analysisId, onProgress) { // eslint-disable-line max-statements
  const dir = path.resolve(TMP_DIR, analysisId)

  try {
    yield mkdirpAsync(dir)

    onProgress(`Installing ${library.name}@${library.version}...`)
    yield install(library, dir, onProgress)

    onProgress('Running webpack build...')
    yield buildLibrary(library, dir, DEVELOPMENT)

    onProgress('Running webpack minified build...')
    yield buildLibrary(library, dir, PRODUCTION)

    onProgress('Measuring sizes...')
    return measureFilesizes(dir)
  } catch (error) {
    yield rimrafAsync(dir)
    throw error
  } finally {
    onProgress('Cleaning up...')
    yield rimrafAsync(dir)
  }
}

module.exports = analyzeLibrary
