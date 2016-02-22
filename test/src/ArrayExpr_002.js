var AsyncTool = require('../../index.js');

var a = Promise.resolve('a');
var b = Promise.reject('b');

/** @async **/
function test() {
  var ar = [a, 1, b];
  console.log(ar);
}

console.log('test')
test().then(function(v) {
  console.log('done');
}, function(err) {
  console.log('error', err);
});
