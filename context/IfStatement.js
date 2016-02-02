var IfStatement = {
  buildContext: function(statement) {
    return {
      exprCtx: ContextBuilder.buildCallContext(statement.condition),
      trueBranchCtx: ContextBuilder.buildCallContext(statement.trueBranch),
      falseBranchCtx: ContextBuilder.buildCallContext(statement.falseBranch),
      execute: IfStatement.execute,
    };
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      callCtx.exprCtx.execute(controlContext, options, function() {
        if (callCtx.exprCtx.value) {
          callCtx.trueBranchCtx.execute(controlContext, options, success, fail);
        } else {
          callCtx.falseBranchCtx.execute(controlContext, options, success, fail);
        }
      }, fail);
    } catch (e) {
      console.log(`IfStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = IfStatement;

var ContextBuilder = require('./ContextBuilder');
