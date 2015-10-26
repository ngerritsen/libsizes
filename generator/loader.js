module.exports = function Loader (libraries, loaderSize) {
  var percentage = 0;

  this.increment = function () {
    var newPercentage = Math.ceil(percentage += 100 / libraries.length);
    var loaderPercentage = loaderSize/100 * newPercentage;
    var loader = '';

    for (var i = 0; i < loaderPercentage; i++) {
      loader += '-';
    }

    for (var i = loaderPercentage; i < loaderSize; i++) {
      loader += ' ';
    }

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(newPercentage + '% [' + loader + ']');
  }
}
