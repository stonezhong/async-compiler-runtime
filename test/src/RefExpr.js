var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var t = 5;

/** @async **/
function test1() {
  return 1;
}

/** @async **/
function test2() {
  return t;
}

/** @async **/
function test3() {
  var a = 3;
  return a;
}

/** @async **/
function test4(p) {
  return p;
}

/** @async **/
function testAddress1() {
  var a;
  a = 2;
  return a;
}

var t2 = 1;
/** @async **/
function testAddress2() {
  t2 = 2;
  return t2;
}

describe('RefExpr', function() {
  it('returns an literal value', function() {
    return expect(test1()).to.eventually.eql(1);
  });

  it('returns an external variable', function() {
    return expect(test2()).to.eventually.eql(t);
  });

  it('returns an local variable', function() {
    return expect(test3()).to.eventually.eql(3);
  });

  it('returns an argument variable', function() {
    return expect(test4(7)).to.eventually.eql(7);
  });

  it('returns address for local variable', function() {
    return expect(testAddress1()).to.eventually.eql(2);
  });

  it('returns address for external variable', function() {
    return expect(testAddress2()).to.eventually.eql(2);
  });
});
