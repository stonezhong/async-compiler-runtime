var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var a = Promise.resolve('a');
var b = Promise.resolve('b');
var c = Promise.reject('c');

/** @async **/
function testOk() {
  return [a, 1, b];
}

/** @async **/
function testReject() {
  return [a, 1, c];
}

describe('ArrayExpr', function() {
  it('returns an array with all elements resolved', function() {
    return expect(testOk()).to.eventually.eql(['a', 1, 'b']);
  });

  it('reject when one of the element is rejected', function() {
    return expect(testReject()).to.be.rejectedWith('c');
  })
});
