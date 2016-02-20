var AsyncTool = require('../../index.js');

// Test case 1:
// if we fail to call a function because one of the argument fail to resolve
// we should surface the error
var a = Promise.reject('unable to resolve a');

function inc(a) {
  return a + 1;
}

/** @async **/
function test_001() {
  inc(a);
}

test_001().then(function(result) {
  console.log('succeed', result);
}, function(reason) {
  console.log('failed', reason);
});

// Test case 2:
// if executing the function causing an error, we should surface the error
function inc_blow_up(a) {
  throw new Error("inc blow up");
}

/** @async **/
function test_002() {
  return inc_blow_up(1);
}

test_002().then(function(result) {
  console.log('succeed', result);
}, function(reason) {
  console.log('failed', reason);
});

// Test case 3:
// if function return value fail to resolve, we should surface the error
function inc_return_rejected(a) {
  return Promise.reject('bad return value');
}

/** @async **/
function test_003() {
  [ inc_return_rejected(1) ];
}

test_003().then(function(result) {
  console.log('succeed', result);
}, function(reason) {
  console.log('failed', reason);
});
