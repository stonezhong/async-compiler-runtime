var ReturnStatement = {
  buildContext: function(statement) {
    return {
      value: ContextBuilder.buildCallContext(statement.value),
      execute: ReturnStatement.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var valueCtx = this.value;
      valueCtx.execute(
        controlContext,
        options,
        function() {
          controlContext.shouldReturn = true;
          controlContext.returnValue = valueCtx.value;
          success();
        } ,
        fail
      );
    } catch (e) {
      console.log(`ReturnStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ReturnStatement;

var ContextBuilder = require('./ContextBuilder');
