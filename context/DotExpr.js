// TODO: ref could point to a promise

var DotExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      ownerCtx: ContextBuilder.buildCallContext(node.owner),
      fieldCtx: ContextBuilder.buildCallContext(node.field),
      execute: DotExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      if (options.asAddress) {
        var options1 = Utility.copyObject(options);
        options1.asAddress = false;
        callCtx.ownerCtx.execute(controlContext, options1, function() {
          callCtx.fieldCtx.execute(controlContext, options1, function() {
            callCtx.address = {
              type: 'field',
              owner: callCtx.ownerCtx.value,
              field: callCtx.fieldCtx.value
            }
            success();
            return ;
          }, fail)
        }, fail);
        return ;
      }

      callCtx.ownerCtx.execute(controlContext, options, function() {
        callCtx.fieldCtx.execute(controlContext, options, function() {
          callCtx.owner = callCtx.ownerCtx.value,
          callCtx.value = callCtx.ownerCtx.value[callCtx.fieldCtx.value];
          success();
          return ;
        }, fail)
      }, fail);
    } catch (e) {
      console.log(`DotExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = DotExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
