var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/** @async **/
function testBasic() {
  var a = 7;
  var b = 4;
  return [
    a + b,
    a - b,
    a * b,
    a / b,
    a % b,
  ];
}

/** @async **/
function testBoolean() {
  var t = true;
  var f = false;
  return [
    t && t,
    t && f,
    f && t,
    f && f,
    t || t,
    t || f,
    f || t,
    f || f,
  ];
}

/** @async **/
function testBit() {
  var a = 0x10;
  var b = 0x01;
  return [
    a ^ b,
    a | b,
    a & b,
  ];
}

/** @async **/
function testCompare() {
  var a = 7;
  var b = 4;
  return [
    a >= b,
    a > b,
    a <= b,
    a < b,
    a == b,
    a === b,
    a != b,
    a !== b,
  ];
}

/** @async **/
function testShift() {
  var a = 0x12;
  var b = 1;
  return [
    a >> b,
    a << b,
  ];
}

/** @async **/
function testBasicLeft() {
  var a1 = 7;
  var b1 = 4;

  var a2 = 7;
  var b2 = 4;

  var a3 = 7;
  var b3 = 4;

  var a4 = 7;
  var b4 = 4;

  var a5 = 7;
  var b5 = 4;

  return [
    a1, b1, (a1 += b1),
    a2, b2, (a2 -= b2),
    a3, b3, (a3 *= b3),
    a4, b4, (a4 /= b4),
    a5, b5, (a5 %= b5),
  ];
}

var fa = Promise.resolve(7);
var fb = Promise.resolve(4);
var far = Promise.reject(7);
var fbr = Promise.reject(4);

/** @async **/
function testOprandPromise() {
  return fa + fb;
}

/** @async **/
function testOprandPromiseReject1() {
  return far + fb;
}

/** @async **/
function testOprandPromiseReject2() {
  return fa + fbr;
}

/** @async **/
function testOprandPromiseReject3() {
  return far + fbr;
}

var za1 = Promise.resolve(7);
var zb1 = Promise.resolve(4);
/** @async **/
function testAddressExternal() {
  var c = (za1 += zb1);
  return [za1, zb1, c];
}

var field1 = Promise.resolve('field1');
var field2 = Promise.resolve('field2');
var obj = Promise.resolve({
  field1: Promise.resolve(7),
});

/** @async **/
function testAddressObjectField() {
  var b = 4
  var c = (obj[field1] += b);
  return [obj[field1], b, c];
}

var objR1 = Promise.reject('object not exist');

/** @async **/
function testAddressObjectField_ObjectReject() {
  var b = 4
  var c = (objR1[field1] += b);
  return [objR1[field1], b, c];
}

var objR2 = Promise.resolve({
  field1: Promise.reject('field1 value not exist'),
});

/** @async **/
function testAddressObjectField_ObjectFieldValueReject() {
  var b = 4
  var c = (objR2[field1] += b);
  return [objR2[field1], b, c];
}

var field1R = Promise.reject('field1 not exist');
/** @async **/
function testAddressObjectField_ObjectFieldNameReject() {
  var b = 4
  var c = (obj[field1R] += b);
  return [obj[field1], b, c];
}

describe('BinaryExpr', function() {
  it('returns the right value for basic operation', function() {
    var a = 7;
    var b = 4;
    return expect(testBasic()).to.eventually.eql([
      a + b,
      a - b,
      a * b,
      a / b,
      a % b,
    ]);
  });

  it('returns the right value for boolean operation', function() {
    var t = true;
    var f = false;
    return expect(testBoolean()).to.eventually.eql([
      t && t,
      t && f,
      f && t,
      f && f,
      t || t,
      t || f,
      f || t,
      f || f,
    ]);
  });

  it('returns the right value for bit operation', function() {
    var a = 0x10;
    var b = 0x01;
    return expect(testBit()).to.eventually.eql([
      a ^ b,
      a | b,
      a & b,
    ]);
  });

  it('returns the right value for compare operation', function() {
    var a = 7;
    var b = 4;
    return expect(testCompare()).to.eventually.eql([
      a >= b,
      a > b,
      a <= b,
      a < b,
      a == b,
      a === b,
      a != b,
      a !== b,
    ]);
  });

  it('returns the right value for shift operation', function() {
    var a = 0x12;
    var b = 1;
    return expect(testShift()).to.eventually.eql([
      a >> b,
      a << b,
    ]);
  });

  it('returns the right value for basic left operation', function() {
    var a = 7
    var b = 4;
    return expect(testBasicLeft()).to.eventually.eql([
      a, b, a + b,
      a, b, a - b,
      a, b, a * b,
      a, b, a / b,
      a, b, a % b,
    ]);
  });

  it('returns the right value when operand are promises', function() {
    return expect(testOprandPromise()).to.eventually.eql(11);
  });

  it('reject when left oprand is rejected', function() {
    return expect(testOprandPromiseReject1()).to.be.rejectedWith(7);
  });

  it('reject when right oprand is rejected', function() {
    return expect(testOprandPromiseReject1()).to.be.rejectedWith(11);
  });

  it('reject when both oprands are rejected', function() {
    return expect(testOprandPromiseReject1()).to.be.rejectedWith(4);
  });

  it('returns the right value when operands are external variable', function() {
    return expect(testAddressExternal()).to.eventually.eql([11, 4, 11]);
  });

  it('returns the right value when operands are object fields', function() {
    return expect(testAddressObjectField()).to.eventually.eql([11, 4, 11]);
  });

  it('reject when object operand is rejected', function() {
    return expect(testAddressObjectField_ObjectReject()).to.be.rejectedWith('object not exist');
  });

  it('reject when object field operand is rejected', function() {
    return expect(testAddressObjectField_ObjectFieldValueReject()).to.be.rejectedWith('field1 value not exist');
  });

  it('reject when object field name rejected', function() {
    return expect(testAddressObjectField_ObjectFieldNameReject()).to.be.rejectedWith('field1 not exist');
  });
});
