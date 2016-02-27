var ThrowStatement = {
  buildContext: function(statement) {
    return {
      execute: ThrowStatement.execute,
      origin: statement,
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var valueCtx = ContextBuilder.buildCallContext(callCtx.origin.value);
      valueCtx.execute(
        controlContext,
        options,
        function() {
          Promise.resolve(valueCtx.value).then(function(exceptionValue) {
            Utility.invokeFail(fail, exceptionValue);
          }, fail);
        } ,
        fail
      );
    } catch (e) {
      console.log(`ThrowStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ThrowStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
