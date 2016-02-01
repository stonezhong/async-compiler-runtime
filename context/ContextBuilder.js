var ContextBuilder = {
  buildCallContext: function(node) {
    if (node.type === 'return') {
      return ReturnStatement.buildContext(node);
    }
    if (node.type === 'ref') {
      return RefExpr.buildContext(node);
    }
    if (node.type === 'var') {
      return VarStatement.buildContext(node);
    }
    if (node.type === 'binary') {
      return BinaryExpr.buildContext(node);
    }
    if (node.type === 'call') {
      return CallExpr.buildContext(node);
    }
    if (node.type === 'simpleStatement') {
      return SimpleStatement.buildContext(node);
    }
    if (node.type === 'dot') {
      return DotExpr.buildContext(node);
    }
    throw "unrecognized node";
  }
};

module.exports = ContextBuilder;

// put at the end since it is runtime dependency
var ReturnStatement = require('./ReturnStatement');
var RefExpr = require('./RefExpr');
var VarStatement = require('./VarStatement');
var BinaryExpr = require('./BinaryExpr');
var CallExpr = require('./CallExpr');
var SimpleStatement = require('./SimpleStatement');
var DotExpr = require('./DotExpr');
