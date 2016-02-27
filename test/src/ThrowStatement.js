var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var b;

var MyException1 = "foo";
var MyException2 = Promise.resolve("foo");

beforeEach(function() {
  b = 1;
});

/** @async **/
function testOk1() {
  throw MyException1;
  b = 2;
}

/** @async **/
function testOk2() {
  throw MyException2;
  b = 2;
}

describe('ThrowStatement', function() {
  it('return a rejected promise case 1', function() {
    return expect(testOk1()).to.be.rejectedWith('foo');
  });

  it('return a rejected promise case 2', function() {
    return expect(testOk1()).to.be.rejectedWith('foo');
  });

  it('b not modified after return', function(done) {
    testOk1().catch(function() { }).then(function() {
      try {
        expect(b).to.eql(1);
      } catch (e) {
        done(e);
        return ;
      }
      done();
    });
  });
});
