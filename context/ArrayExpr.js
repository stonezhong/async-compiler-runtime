var ArrayExpr = {
  buildContext: function(node) {
    return {
      nextIndex: 0,
      origin: node,
      execute: ArrayExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      callCtx.valuePending = callCtx.valuePending || [];

      if (callCtx.nextIndex >= callCtx.origin.elements.length) {
        callCtx.value = callCtx.valuePending;
        Utility.invokeCallback(success);
        return ;
      }

      var childElement = callCtx.origin.elements[callCtx.nextIndex];
      var childCtx = ContextBuilder.buildCallContext(childElement);
      childCtx.execute(
        controlContext,
        options,
        function() {
          callCtx.valuePending.push(childCtx.value);
          callCtx.nextIndex ++;
          callCtx.execute(controlContext, options, success, fail);
        },
        fail
      );
    } catch (e) {
      console.log(`ArrayExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ArrayExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
