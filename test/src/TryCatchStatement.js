var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// var b;
//
// var MyException1 = "foo";
// var MyException2 = Promise.resolve("foo");

beforeEach(function() {
  // b = 1;
});

/** @async **/
function testOk1() {
  var a = [];
  try {
    a.push(1);
    a.push(2);
    a.push(3);
  } catch(e) {
    a.push(4);
  }
  return a;
}

/** @async **/
function testOk2() {
  var a = [];
  try {
    a.push(1);
    a.push(2);
    return a;
    a.push(3);
  } catch(e) {
    a.push(4);
  }
  return 2;
}

/** @async **/
function testOk3() {
  var a = [];
  try {
    a.push(1);
    a.push(2);
    a.push(3);
  } catch(e) {
    a.push(4);
  } finally {
    a.push(5);
  }
  return a;
}

/** @async **/
function testOk4() {
  var a = [];
  try {
    a.push(1);
    a.push(2);
    a.push(3);
  } catch(e) {
    a.push(4);
  } finally {
    return 2;
    a.push(5);
  }
  return a;
}

/** @async **/
function testOk5() {
  var a = [];
  try {
    a.push(1);
    throw 'foo';
    a.push(2);
    a.push(3);
  } catch(e) {
    throw 'bar';
    a.push(4);
  } finally {
    return 2;
    a.push(5);
  }
  return a;
}

/** @async **/
function testOk6() {
  var a = [];
  try {
    a.push(1);
    a.push(2);
    a.push(3);
  } catch(e) {
    a.push(4);
  } finally {
    throw 'bar';
    a.push(5);
  }
  return a;
}

describe('TryCatchStatement', function() {
  it('execute all statement in try block but not catch block', function() {
    return expect(testOk1()).to.eventually.eql([1,2,3]);
  });

  it('return in the middle of try block when there is a return statement in try block', function() {
    return expect(testOk2()).to.eventually.eql([1,2]);
  });

  it('execute finally block', function() {
    return expect(testOk3()).to.eventually.eql([1, 2, 3, 5]);
  });

  it('return in finally block when there is a return statement in finally block', function() {
    return expect(testOk4()).to.eventually.eql(2);
  });

  it('throws exception when catch block throws exception', function() {
    return expect(testOk5()).to.be.rejectedWith('bar');
  });

  it('throws exception when finally block throws exception', function() {
    return expect(testOk6()).to.be.rejectedWith('bar');
  });
});
