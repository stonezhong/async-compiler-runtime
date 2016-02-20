var CallExpr = {
  buildContext: function(node) {
    var args = new Array(node.args.length);
    for (var i = 0; i < args.length; i ++) {
      args[i] = ContextBuilder.buildCallContext(node.args[i]);
    }
    return {
      func:   ContextBuilder.buildCallContext(node.func),
      args:   args,
      argValues: new Array(args.length),
      origin: node,
      nextIndex: 0,
      execute: CallExpr.execute,
      executeArgs: CallExpr.executeArgs
    };
  },
  executeArgs: function(controlContext, options, success, fail) {
    var callCtx = this;
    if (callCtx.nextIndex >= callCtx.args.length) {
      Utility.invokeCallback(success);
      return ;
    }

    var arg = callCtx.args[callCtx.nextIndex];
    arg.execute(controlContext, options, function() {
      if (Utility.isThenable(arg.value)) {
        arg.value.then(function(v) {
          callCtx.argValues[callCtx.nextIndex] = v;
          callCtx.nextIndex ++;
          callCtx.executeArgs(controlContext, options, success, fail);
        }, fail);
        return ;
      }
      callCtx.argValues[callCtx.nextIndex] = arg.value;
      callCtx.nextIndex ++;
      callCtx.executeArgs(controlContext, options, success, fail);
    }, fail);
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      callCtx.func.execute(controlContext, options, function() {
        callCtx.executeArgs(controlContext, options, function() {
          var returnValue;
          try {
            returnValue = callCtx.func.value.apply(callCtx.func.owner, callCtx.argValues);
          } catch (e) {
            fail(e);
            return ;
          }
          callCtx.value = returnValue;
          Utility.invokeCallback(success);
          return ;
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`CallExpr.execute: ${e}`);
    }
  }
};

module.exports = CallExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
