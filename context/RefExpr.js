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
        };
        Utility.invokeCallback(success);
        return ;
      }

      if (callCtx.origin.refType === 'literal') {
        callCtx.value = callCtx.origin.literal;
        Utility.invokeCallback(success);
        return ;
      }

      // it should be either external, or local or argument
      var getter = controlContext.accessors["get_" + callCtx.origin.name];
      callCtx.value = getter();
      Utility.invokeCallback(success);
      return ;
    } catch (e) {
      console.log(`RefExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = RefExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
