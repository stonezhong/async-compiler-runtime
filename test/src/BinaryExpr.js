var AsyncTool = require('../../index.js');

var o = {v : 0};

/** @async **/
function test() {
  var a = 7;
  var b = 4;

  console.log("binary operator that does not change operand");
  console.log(a + b);
  console.log(a - b);
  console.log(a * b);
  console.log(a / b);
  console.log(a % b);

  a = true;
  b = false;
  console.log(a && b);
  console.log(a || b);

  a = 0x10;
  b = 0x01;
  console.log(a ^ b);
  console.log(a | b);
  console.log(a & b);

  a = 7;
  b = 4;
  console.log(a >= b);
  console.log(a > b);
  console.log(a <= b);
  console.log(a < b);
  console.log(a == b);
  console.log(a === b);
  console.log(a != b);
  console.log(a !== b);

  a = 0x12;
  b = 1;
  console.log(a >> b);
  console.log(a << b);

  var c;
  console.log("binary operator that changes operand");
  // for +=
  a = 7;
  b = 4;
  c = (a += b);
  console.log(a, b, c);

  o.v = 7;
  c = (o.v += b);
  console.log(o.v, b, c);

  // for -=
  a = 7;
  b = 4;
  c = (a -= b);
  console.log(a, b, c);

  o.v = 7;
  c = (o.v -= b);
  console.log(o.v, b, c);

  // for *=
  a = 7;
  b = 4;
  c = (a *= b);
  console.log(a, b, c);

  o.v = 7;
  c = (o.v *= b);
  console.log(o.v, b, c);

  // for /=
  a = 7;
  b = 4;
  c = (a /= b);
  console.log(a, b, c);

  o.v = 7;
  c = (o.v /= b);
  console.log(o.v, b, c);

  // for %=
  a = 7;
  b = 4;
  c = (a %= b);
  console.log(a, b, c);

  o.v = 7;
  c = (o.v %= b);
  console.log(o.v, b, c);

  return 1;
}


test().then(function(v) {
  console.log("Done");
});
