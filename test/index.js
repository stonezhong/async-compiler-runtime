var should = require('chai').should();
var shell = require('shelljs');
var fs = require('fs');

function runTest(filename) {
  shell.exec(`node -harmony node_modules/async-compiler/compile.js --input test/src/${filename}.js --output test/src/${filename}_out.js`);
  var result = shell.exec(`node -harmony test/src/${filename}_out.js`);
  result.code.should.equal(0);

  var expectedOutput = fs.readFileSync(`test/src/${filename}_out.txt`, 'utf8');
  result.output.should.equal(expectedOutput);
}

describe('Test Async Compiler Runtime Library', function() {
  it('BinaryExpr', function() {
    runTest('BinaryExpr');
  });
  it('RefExpr', function() {
    runTest('RefExpr');
  });
  it('ForStatement', function() {
    runTest('ForStatement');
  });
  it('ErrorFunctionCall', function() {
    runTest('ErrorFunctionCall');
  });
});
