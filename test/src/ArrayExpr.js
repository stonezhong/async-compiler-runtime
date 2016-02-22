var AsyncTool = require('../../index.js');
var TestTool = require('../TestTool');

var a = Promise.resolve('a');
var b = Promise.resolve('b');
var c = Promise.reject('c');

/** @async **/
function testOk() {
  console.log('testOk');
  var ar = [a, 1, b];
  console.log(ar);
}

/** @async **/
function testReject() {
  console.log('testReject');
  var ar = [a, 1, c];
}


TestTool.invoke(
  [
    testOk,
    testReject,
  ]).then(function(v) {
  console.log('done');
});
