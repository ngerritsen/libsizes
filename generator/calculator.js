const Bromise = require('bluebird');
const webpack = require('webpack');
const createEnvironment = require('./environment')
const path = require('path');
const MemoryFS = require("memory-fs");
const gzipSize = require('gzip-size');

const memFs = new MemoryFS();

function calculate(library) {
  return createEnvironment(library)
    .then(environment => bundleLibrary(createWebpackConfig(environment), library))
    .tap(() => console.log(`Compiled ${library.name}.`))
    .then(output => Object.assign({}, library, {
      sizes: calculateFileSizes(output)
    }));
}

function bundleLibrary(config, library) {
  return new Bromise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.outputFileSystem = memFs;

    compiler.run((err, stats) => {
      const fileContent = memFs.readFileSync('/' + library.name + '.js');
      err ? reject(err) : resolve({ stats, fileContent });
    });
  });
}

function calculateFileSizes({ fileContent }) {
  return {
    min: bytesToKbs(fileContent.length),
    mingzip: bytesToKbs(gzipSize.sync(fileContent))
  }
}

function createWebpackConfig({ path: envPath, library }) {
  return {
    entry: path.resolve(envPath, 'node_modules', library.name),
    output: {
      path: path.join('/'),
      filename: library.name + '.js',
      libraryTarget: 'umd'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  };
}

function bytesToKbs (bytes) {
  return Math.round(bytes / 1024);
}

module.exports = calculate;
