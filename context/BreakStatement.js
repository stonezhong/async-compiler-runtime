var BreakStatement = {
  buildContext: function(statement) {
    return {
      execute: BreakStatement.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      if (controlContext.loopCount > 0) {
        callCtx.hitBreak = true;
      }
      success();
    } catch (e) {
      console.log(`BreakStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = BreakStatement;

var ContextBuilder = require('./ContextBuilder');
