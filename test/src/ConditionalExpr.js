var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var t = true;
var f = false;
var pt = Promise.resolve(true);
var pf = Promise.resolve(false);

var yes = 'yes';
var no = 'no';
var pyes = Promise.resolve('yes');
var pno = Promise.resolve('no');


/** @async **/
function testOk() {
  return [
    t?yes:no,
    t?yes:pno,
    t?pyes:no,
    t?pyes:pno,

    f?yes:no,
    f?yes:pno,
    f?pyes:no,
    f?pyes:pno,

    pt?yes:no,
    pt?yes:pno,
    pt?pyes:no,
    pt?pyes:pno,

    pf?yes:no,
    pf?yes:pno,
    pf?pyes:no,
    pf?pyes:pno,
  ]
}

describe('ConditionalExpr', function() {
  it('returns value from true branch if condition is true', function() {
    return expect(testOk()).to.eventually.eql([
      'yes', 'yes', 'yes', 'yes',
      'no','no','no','no',
      'yes', 'yes', 'yes', 'yes',
      'no','no','no','no',
    ]);
  });
});
