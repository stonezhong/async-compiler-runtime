// TODO: ref could point to a promise

var DotExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: DotExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var ownerCtx = ContextBuilder.buildCallContext(callCtx.origin.owner);
      var fieldCtx;

      if (options.asAddress) {
        var options1 = Utility.updateOptions(options, {asAddress: false});
        ownerCtx.execute(controlContext, options1, function() {
          fieldCtx = ContextBuilder.buildCallContext(callCtx.origin.field);
          fieldCtx.execute(controlContext, options1, function() {
            callCtx.address = {
              type: 'field',
              owner: ownerCtx.value,
              field: fieldCtx.value
            }
            success();
            return ;
          }, fail)
        }, fail);
        return ;
      }

      ownerCtx.execute(controlContext, options, function() {
        fieldCtx = ContextBuilder.buildCallContext(callCtx.origin.field);
        fieldCtx.execute(controlContext, options, function() {
          callCtx.owner = ownerCtx.value,
          callCtx.value = ownerCtx.value[fieldCtx.value];
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
