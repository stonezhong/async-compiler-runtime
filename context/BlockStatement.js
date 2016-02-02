var BlockStatement = {
  buildContext: function(statement) {
    return StatementSequence.buildContext(statement.children);
  },

  execute: function(controlContext, options, success, fail) {
    return StatementSequence.execute.call(this, controlContext, options, success, fail);
  }
};

module.exports = BlockStatement;

var ContextBuilder = require('./ContextBuilder');
var StatementSequence = require('./StatementSequence');
