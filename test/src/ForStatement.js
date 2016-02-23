var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/** @async **/
function basicTest() {
  var sum = 0;
  for (var i = 0; i <= 10; i ++) {
    sum += i;
  }
  return sum;
}

describe('ForStatement', function() {
  it('returns the right value for basic test', function() {
    return expect(basicTest()).to.eventually.eql(55);
  });
});
