var SimpleStatement = {
  buildContext: function(statement) {
    return {
      body: ContextBuilder.buildCallContext(statement.body),
      execute: SimpleStatement.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var valueCtx = this.body;
      valueCtx.execute(
        controlContext,
        options,
        success,
        fail
      );
    } catch (e) {
      console.log(`SimpleStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = SimpleStatement;

var ContextBuilder = require('./ContextBuilder');
