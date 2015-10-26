var buildClient = require('./build-client');
var generate = require('./generate');
var logResults = require('./log-results');
var writeResults = require('./write-results');

generate()
  .then(logResults)
  .then(writeResults)
  .then(buildClient);
