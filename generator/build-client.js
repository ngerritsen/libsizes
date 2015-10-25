var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

module.exports = function buildClient () {
  var compiler = webpack(webpackConfig);

  console.log('start building client...');

  compiler.run(function (err, stats) {
    if (err) {
      console.log(err);
      return;
    }

    var jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0) {
      handleSoftErrors(jsonStats.errors);
      return;
    }

    if (jsonStats.warnings.length > 0) {
      console.log(jsonStats.warnings);
      return;
    }

    console.log(stats.toString({
      chunkModules: false,
      chunks: false,
      colors: true
    }));
    console.log('successfully built client!');
  });
}
