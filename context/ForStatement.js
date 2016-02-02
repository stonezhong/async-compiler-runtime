var ForStatement = {
  buildContext: function(statement) {
    return {
      initCtx: ContextBuilder.buildCallContext(statement.init),
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
        if (!conditionCtx.value) {
          success();
          return ;
        }
        var bodyCtx = ContextBuilder.buildCallContext(callCtx.origin.body);
        bodyCtx.execute(controlContext, options, function() {
          var stepCtx = ContextBuilder.buildCallContext(callCtx.origin.step);
          stepCtx.execute(controlContext, options, function() {
            callCtx.executeLoop(controlContext, options, success, fail);
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
      callCtx.initCtx.execute(controlContext, options, function() {
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
