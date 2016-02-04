var BlockStatement = {
  buildContext: function(statement) {
    return StatementSequence.buildContext(statement.children);
  },
};

module.exports = BlockStatement;

var StatementSequence = require('./StatementSequence');
