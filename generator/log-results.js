var Table = require('cli-table');
var colors = require('colors');

module.exports = function logResults (results) {
  var kb = colors.grey(' kb');

  var table = new Table({
    head: ['Name', 'Normal', 'Min', 'Min+gzip'],
    colWidths: [22, 12, 12, 12]
  });

  results.forEach(function (result) {
    table.push([result.name, result.normal + kb, result.min + kb, result.mingzip + kb]);
  })

  console.log(table.toString());
}
