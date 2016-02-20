var IfStatement = {
  buildContext: function(statement) {
    return {
      execute: IfStatement.execute,
      origin: statement,
    };
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var exprCtx = ContextBuilder.buildCallContext(callCtx.origin.condition);
      exprCtx.execute(controlContext, options, function() {
        Promise.resolve(exprCtx.value).then(function(exprValue) {
          var branchContext;
          if (exprValue) {
            branchContext = ContextBuilder.buildCallContext(callCtx.origin.trueBranch);
          } else {
            branchContext = ContextBuilder.buildCallContext(callCtx.origin.falseBranch);
          }
          branchContext.execute(controlContext, options, function() {
            if (!controlContext.hitReturn && (controlContext.loopCount > 0)) {
              Utility.copyLoopStatus(callCtx, branchContext);
            }
            Utility.invokeCallback(success);
            return ;
          }, fail);
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`IfStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = IfStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
