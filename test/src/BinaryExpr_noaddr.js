var AsyncTool = require('../../index');
var TestTool = require('../TestTool');

var fa = Promise.resolve(7);
var fb = Promise.resolve(4);

var far = Promise.reject(7);
var fbr = Promise.reject(4);

/** @async **/
function testOk() {
  // does not update oprand, oprands are promises
  console.log(fa + fb);
}

/** @async **/
function testReject1() {
  // does not update oprand, oprands are promises
  console.log(fa + fbr);
}

/** @async **/
function testReject2() {
  // does not update oprand, oprands are promises
  console.log(far + fb);
}

/** @async **/
function testReject3() {
  // does not update oprand, oprands are promises
  console.log(far + fbr);
}

TestTool.invoke([
    testOk,
    testReject1,
    testReject2,
    testReject3,
  ]).then(function(v) {
  console.log('done');
});
