var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var obj = Promise.resolve({
  name: 'Stone Zhong',
  title: 'SDE',
});
/** @async **/
function basicTest1() {
  var a = [];
  for (var key in obj) {
    a.push(key);
    a.push(obj[key]);
  }
  return a;
}

var arr = Promise.resolve(['Stone Zhong',,'SDE']);
/** @async **/
function basicTest2() {
  var a = [];
  for (var key in arr) {
    a.push(key);
    a.push(arr[key]);
  }
  return a;
}

describe('ForInStatement', function() {
  it('iterate all the keys for object', function() {
    return expect(basicTest1()).to.eventually.eql(['name', 'Stone Zhong', 'title', 'SDE']);
  });

  it('iterate all the keys for array', function() {
    return expect(basicTest2()).to.eventually.eql(['0', 'Stone Zhong', '2', 'SDE']);
  });
});
