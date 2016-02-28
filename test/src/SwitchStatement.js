var AsyncTool = require('../../index.js');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/** @async **/
function basicTest1() {
  var name = 'chinese';
  var choise;

  switch(name) {
    case 'english':
      choise = 1;
      break;
    case 'chinese':
      choise = 2;
      break;
    case 'japanese':
      choise = 3;
      break;
    default:
      choise = -1;
  }

  return choise;
}

/** @async **/
function basicTest2() {
  var name = 'math';
  var choise;

  switch(name) {
    case 'english':
      choise = 1;
      break;
    case 'chinese':
      choise = 2;
      break;
    case 'japanese':
      choise = 3;
      break;
    default:
      choise = -1;
  }

  return choise;
}

/** @async **/
function basicTest3() {
  var name = 'english';
  var choise = [];

  switch(name) {
    case 'english':
      choise.push(1);
    case 'chinese':
      choise.push(2);
      break;
    case 'japanese':
      choise.push(3);
      break;
    default:
      choise.push(-1);
  }

  return choise;
}

/** @async **/
function basicTest4() {
  var name = 'math';
  var choise = 88;

  switch(name) {
    case 'english':
      choise = 1;
      break;
    case 'chinese':
      choise = 2;
      break;
    case 'japanese':
      choise = 3;
      break;
  }

  return choise;
}

describe('SwitchStatement', function() {
  it('execute matching branch', function() {
    return expect(basicTest1()).to.eventually.eql(2);
  });

  it('execute default branch if no match found', function() {
    return expect(basicTest2()).to.eventually.eql(-1);
  });

  it('fall through if no break in case branch', function() {
    return expect(basicTest3()).to.eventually.eql([1,2]);
  });

  it('should not execute any branch if no match and no default branch', function() {
    return expect(basicTest4()).to.eventually.eql(88);
  });
});
