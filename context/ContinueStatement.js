var ContinueStatement = {
  buildContext: function(statement) {
    return {
      execute: ContinueStatement.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      if (controlContext.loopCount > 0) {
        callCtx.hitContinue = true;
      }
      Utility.invokeCallback(success);
    } catch (e) {
      console.log(`ContinueStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ContinueStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
