var AsyncTool = require('../../index.js');

var o = {v : 0};

var fa = Promise.resolve(7);
var fb = Promise.reject('fb is rejected');

/** @async **/
function test() {
  // does not update oprand, oprands are promises
  console.log(fa + fb);
}


test().then(function(v) {
  console.log('done');
}, function(err) {
  console.log('error', err);
});
