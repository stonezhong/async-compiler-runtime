var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/** @async **/
function testOk() {
  var a = 1;
  return a;
}


describe('VarStatement', function() {
  it('returns a local variable', function() {
    return expect(testOk()).to.eventually.eql(1);
  });
});
