var ObjectExpr = {
  buildContext: function(node) {
    return {
      nextIndex: 0,
      origin: node,
      execute: ObjectExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      callCtx.valuePending = callCtx.valuePending || {};

      if (callCtx.nextIndex >= callCtx.origin.properties.length) {
        callCtx.value = callCtx.valuePending;
        Utility.invokeCallback(success);
        return ;
      }

      var childProperty = callCtx.origin.properties[callCtx.nextIndex];
      var childCtx = ContextBuilder.buildCallContext(childProperty.value);
      childCtx.execute(
        controlContext,
        options,
        function() {
          callCtx.valuePending[childProperty.key] = childCtx.value;
          callCtx.nextIndex ++;
          callCtx.execute(controlContext, options, success, fail);
        },
        fail
      );
    } catch (e) {
      console.log(`ObjectExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ObjectExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
