var CallExpr = {
  buildContext: function(node) {
    var args = new Array(node.args.length);
    for (var i = 0; i < args.length; i ++) {
      args[i] = ContextBuilder.buildCallContext(node.args[i]);
    }
    return {
      func:   ContextBuilder.buildCallContext(node.func),
      args:   args,
      origin: node,
      nextIndex: 0,
      execute: CallExpr.execute,
      executeArgs: CallExpr.executeArgs
    };
  },
  executeArgs: function(controlContext, variables, success, fail) {
    var callCtx = this;
    if (callCtx.nextIndex >= callCtx.args.length) {
      success();
      return ;
    }

    var arg = callCtx.args[callCtx.nextIndex];
    arg.execute(controlContext, variables, function() {
      callCtx.nextIndex ++;
      callCtx.executeArgs(controlContext, variables, success, fail);
    }, fail);

  },

  execute: function(controlContext, variables, success, fail) {
    var callCtx = this;
    callCtx.func.execute(controlContext, variables, function() {
      callCtx.executeArgs(controlContext, variables, function() {
        var argValues = new Array(callCtx.args.length);
        for (var i = 0;  i < argValues.length; i ++) {
          argValues[i] = callCtx.args[i].value;
        }
        var funcReturn = callCtx.func.value.apply(callCtx.func.owner, argValues);
        if (funcReturn instanceof Promise) {
          funcReturn.then(function(v) {
            callCtx.value = v;
            success();
          }, fail);
        } else {
          callCtx.value = funcReturn;
          success();
        }
      }, fail);
    }, fail);;
  }
};

module.exports = CallExpr;

var ContextBuilder = require('./ContextBuilder');
