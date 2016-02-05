// TODO: ref could point to a promise
// There are 4 refTypes
// 'external'
// 'argument'
// 'local'
// 'literal'

var RefExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: RefExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;

      if (options.asAddress) {
        callCtx.address = {
          type: callCtx.origin.refType,
          name: callCtx.origin.name
        }
        Utility.invokeCallback(success);
        return ;
      }

      if (callCtx.origin.refType === 'literal') {
        callCtx.value = callCtx.origin.literal;
        Utility.invokeCallback(success);
        return ;
      }

      if (callCtx.origin.refType === 'external') {
        var getter = controlContext.accessors["get_" + callCtx.origin.name];
        var value = getter();
        if (Utility.isPromise(value)) {
          value.then(function(resolvedValue) {
            callCtx.value = resolvedValue;
            Utility.invokeCallback(success);
          }, fail);
          return ;
        }
        callCtx.value = value;
        Utility.invokeCallback(success);
        return ;
      }

      // local variable should not be promise
      // it should be resolved during initialization
      callCtx.value = controlContext.variables[callCtx.origin.name];
      Utility.invokeCallback(success);
    } catch (e) {
      console.log(`RefExpr.execute: ${e}`);
      // if (e.stack) {
      //   console.log(e.stack);
      // }
      throw e;
    }
  }
};

module.exports = RefExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
