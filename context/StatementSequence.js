var StatementSequence = {
  buildContext: function(statements) {
    return {
      nextIndex: 0,
      execute: StatementSequence.execute,
      statements: statements,
    };
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      if (controlContext.hitReturn) {
        throw "Still executing after return";
      }
      if ((controlContext.loopCount > 0) && (callCtx.hitBreak || callCtx.hitContinue)) {
        throw "Still executing after continue or break is hit in a loop";
      }

      if (callCtx.nextIndex >= callCtx.statements.length) {
        success();
        return ;
      }

      // it is caller's responsible to not execute a statement when it is not necessary
      // 1) when retrun statement is issued
      // 2) when continue or break is issued in a loop
      var childCtx = ContextBuilder.buildCallContext(callCtx.statements[callCtx.nextIndex]);
      childCtx.execute(
        controlContext,
        options,
        function() {
          if (controlContext.hitReturn) {
            success();
            return ;
          }

          if ((controlContext.loopCount > 0) && (childCtx.hitBreak || childCtx.hitContinue)) {
            Utility.copyLoopStatus(callCtx, childCtx);
            success();
            return ;
          }

          callCtx.nextIndex ++;
          callCtx.execute(controlContext, options, success, fail);
        },
        fail
      );
    } catch (e) {
      console.log(`StatementSequence.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = StatementSequence;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
