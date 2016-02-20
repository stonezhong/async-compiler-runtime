// TODO(Stone Zhong): if at least one promise in localContex.values is
//                    rejected, I should fail fast
function resolveEachElement(localContext, controlContext, options, success, fail) {
  try {
    var callCtx = localContext.callCtx;
    if (localContext.nextIndex >= callCtx.origin.elements.length) {
      Utility.invokeCallback(success);
      return ;
    }

    var childElement = callCtx.origin.elements[localContext.nextIndex];
    var childCtx = ContextBuilder.buildCallContext(childElement);
    childCtx.execute(
      controlContext,
      options,
      function() {
        localContext.values[localContext.nextIndex] = Promise.resolve(childCtx.value);
        localContext.nextIndex ++;
        resolveEachElement(localContext, controlContext, options, success, fail);
        return ;
      },
      fail
    );
  } catch (e) {
    console.log(`ArrayExpr.resolveEachElement: ${e}`);
    throw e;
  }
}

var ArrayExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: ArrayExpr.execute,
    };
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var localContext = {
        callCtx: callCtx,
        nextIndex: 0,
        values: new Array(callCtx.origin.elements.length),
      };
      resolveEachElement(
        localContext,
        controlContext,
        options,
        function() {
          Promise.all(localContext.values).then(function(values) {
            callCtx.value = values;
            Utility.invokeCallback(success);
          }, fail);
        },
        fail);
    } catch (e) {
      console.log(`ArrayExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ArrayExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
