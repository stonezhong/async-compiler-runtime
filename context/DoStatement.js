var DoStatement = {
  buildContext: function(statement) {
    return {
      execute: DoStatement.execute,
      executeLoop: DoStatement.executeLoop,
      origin: statement,
    };
  },

  executeLoop: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var bodyCtx = ContextBuilder.buildCallContext(callCtx.origin.body);
      bodyCtx.execute(controlContext, options, function() {
        var conditionCtx = ContextBuilder.buildCallContext(callCtx.origin.condition);
        conditionCtx.execute(controlContext, options, function() {
          if (!conditionCtx.value) {
            controlContext.loopCount --;
            Utility.invokeCallback(success);
            return ;
          }
          if (bodyCtx.hitBreak) {
            controlContext.loopCount --;
            Utility.invokeCallback(success);
            return ;
          }
          callCtx.executeLoop(controlContext, options, success, fail);
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`DoStatement.execute<InLoop>: ${e}`);
      throw e;
    }
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      controlContext.loopCount ++;
      callCtx.executeLoop(controlContext, options, success, fail);
    } catch (e) {
      console.log(`DoStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = DoStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
