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
    if (node.type === 'block') {
      return BlockStatement.buildContext(node);
    }
    if (node.type === 'if') {
      return IfStatement.buildContext(node);
    }
    if (node.type === 'for') {
      return ForStatement.buildContext(node);
    }
    if (node.type === 'unary') {
      return UnaryExpr.buildContext(node);
    }
    if (node.type === 'while') {
      return WhileStatement.buildContext(node);
    }
    if (node.type === 'continue') {
      return ContinueStatement.buildContext(node);
    }
    if (node.type === 'break') {
      return BreakStatement.buildContext(node);
    }
    if (node.type === 'do') {
      return DoStatement.buildContext(node);
    }
    if (node.type === 'seq') {
      return SeqExpr.buildContext(node);
    }
    if (node.type === 'object') {
      return ObjectExpr.buildContext(node);
    }
    if (node.type === 'array') {
      return ArrayExpr.buildContext(node);
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
var BlockStatement = require('./BlockStatement');
var IfStatement = require('./IfStatement');
var ForStatement = require('./ForStatement');
var UnaryExpr = require('./UnaryExpr');
var WhileStatement = require('./WhileStatement');
var ContinueStatement = require('./ContinueStatement');
var BreakStatement = require('./BreakStatement');
var DoStatement = require('./DoStatement');
var SeqExpr = require('./SeqExpr');
var ObjectExpr = require('./ObjectExpr');
var ArrayExpr = require('./ArrayExpr');
