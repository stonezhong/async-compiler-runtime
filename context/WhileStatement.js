var WhileStatement = {
  buildContext: function(statement) {
    return {
      execute: WhileStatement.execute,
      executeLoop: WhileStatement.executeLoop,
      origin: statement,
    };
  },

  executeLoop: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var conditionCtx = ContextBuilder.buildCallContext(callCtx.origin.condition);
      conditionCtx.execute(controlContext, options, function() {
        if (!conditionCtx.value) {
          controlContext.loopCount --;
          success();
          return ;
        }
        var bodyCtx = ContextBuilder.buildCallContext(callCtx.origin.body);
        bodyCtx.execute(controlContext, options, function() {
          if (controlContext.hitReturn) {
            success();
            return ;
          }
          if (bodyCtx.hitBreak) {
            controlContext.loopCount --;
            success();
            return ;
          }

          callCtx.executeLoop(controlContext, options, success, fail);
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`WhileStatement.execute<InLoop>: ${e}`);
      throw e;
    }
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      controlContext.loopCount ++;
      callCtx.executeLoop(controlContext, options, success, fail);
    } catch (e) {
      console.log(`WhileStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = WhileStatement;

var ContextBuilder = require('./ContextBuilder');
