var SeqExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: SeqExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;

      var firstCtx = ContextBuilder.buildCallContext(callCtx.origin.first);
      firstCtx.execute(controlContext, options, function() {
        var lastCtx = ContextBuilder.buildCallContext(callCtx.origin.last);
        lastCtx.execute(controlContext, options, function() {
          callCtx.value = lastCtx.value;
          Utility.invokeCallback(success);
        }, fail)
      }, fail);
    } catch (e) {
      console.log(`SeqExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = SeqExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
