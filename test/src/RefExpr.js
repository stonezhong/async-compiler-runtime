var AsyncTool = require('../../index.js');

var t = 5;
var m = Promise.resolve('hello');
/** @async **/
function test(x) {
  var a = 3;
  console.log(1);
  console.log(2);
  console.log(a);
  console.log(x);
  console.log(t);
  a++;
  console.log(a);

  console.log(m);
  return 1;
}


test(4).then(function(v) {
  console.log("Done");
});
