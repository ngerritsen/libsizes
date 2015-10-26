module.exports = function Stopwatch () {
  var startTime = new Date().getTime();

  this.getTime = function () {
    var currentTime = new Date().getTime();
    return currentTime - startTime;
  }
}
