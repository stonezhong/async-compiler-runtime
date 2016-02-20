var ForStatement = {
  buildContext: function(statement) {
    return {
      execute: ForStatement.execute,
      executeLoop: ForStatement.executeLoop,
      origin: statement,
    };
  },

  executeLoop: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var conditionCtx = ContextBuilder.buildCallContext(callCtx.origin.condition);
      conditionCtx.execute(controlContext, options, function() {
        Promise.resolve(conditionCtx.value).then(function(conditionValue) {
          if (!conditionValue) {
            controlContext.loopCount --;
            Utility.invokeCallback(success);
            return ;
          }
          var bodyCtx = ContextBuilder.buildCallContext(callCtx.origin.body);
          bodyCtx.execute(controlContext, options, function() {
            if (controlContext.hitReturn) {
              Utility.invokeCallback(success);
              return ;
            }
            if (bodyCtx.hitBreak) {
              controlContext.loopCount --;
              Utility.invokeCallback(success);
              return ;
            }
            var stepCtx = ContextBuilder.buildCallContext(callCtx.origin.step);
            stepCtx.execute(controlContext, options, function() {
              callCtx.executeLoop(controlContext, options, success, fail);
            }, fail);
          }, fail);
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`ForStatement.execute<InLoop>: ${e}`);
      throw e;
    }
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var initCtx = ContextBuilder.buildCallContext(callCtx.origin.init);

      initCtx.execute(controlContext, options, function() {
        controlContext.loopCount ++;
        callCtx.executeLoop(controlContext, options, success, fail);
      }, fail);
    } catch (e) {
      console.log(`ForStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ForStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
