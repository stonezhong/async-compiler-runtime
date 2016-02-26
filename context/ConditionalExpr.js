var ConditionalExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: ConditionalExpr.execute
    };
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var conditionCtx = ContextBuilder.buildCallContext(callCtx.origin.condition);
      conditionCtx.execute(controlContext, options, function() {
        Promise.resolve(conditionCtx.value).then(function(conditionValue) {
          var exprNode = conditionValue?callCtx.origin.trueBranch:callCtx.origin.falseBranch;
          var exprContext = ContextBuilder.buildCallContext(exprNode);
          exprContext.execute(controlContext, options, function() {
            callCtx.value = exprContext.value;
            Utility.invokeCallback(success);
          }, fail);
        }, fail);
      }, fail);
      return ;
    } catch (e) {
      console.log(`ConditionalExpr.execute: ${e}`);
      throw e;
    }
  },
};

module.exports = ConditionalExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
