var AsyncTool = require('../../index.js');

/** @async **/
function test() {
  var sum = 0;
  for (var i = 0; i <= 10; i ++) {
    sum += i;
  }
  return sum;
}


test().then(function(sum) {
  console.log("sum =", sum);
});
