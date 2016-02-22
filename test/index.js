var should = require('chai').should();
var shell = require('shelljs');
var fs = require('fs');

function runTest(filename) {
  shell.exec(`node --harmony node_modules/async-compiler/compile.js --input test/src/${filename}.js --output test/temp/${filename}_out.js`);
  var result = shell.exec(`node --harmony test/temp/${filename}_out.js`);
  result.code.should.equal(0);

  var expectedOutput = fs.readFileSync(`test/output/${filename}_out.txt`, 'utf8');
  result.output.should.equal(expectedOutput);
}

describe('Test Async Compiler Runtime Library', function() {
  it('BinaryExpr', function() {
    runTest('BinaryExpr_001');
    runTest('BinaryExpr_noaddr_ok');
    runTest('BinaryExpr_noaddr_reject');
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

  it('ArrayExpr', function() {
    runTest('ArrayExpr_001');
    runTest('ArrayExpr_002');
  });

});
