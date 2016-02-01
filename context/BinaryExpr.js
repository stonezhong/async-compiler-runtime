var BinaryExpr = {
  buildContext: function(node) {
    return {
      left:   ContextBuilder.buildCallContext(node.left),
      right:  ContextBuilder.buildCallContext(node.right),
      origin: node,
      execute: BinaryExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var options1 = Utility.copyObject(options);
      if (callCtx.origin.operator === '=') {
        options1.asAddress = true;
      }
      callCtx.left.execute(controlContext, options1, function() {
        callCtx.right.execute(controlContext, options, function() {
          switch(callCtx.origin.operator) {
            case "+":
              callCtx.value = callCtx.left.value + callCtx.right.value;
              break;
            case "-":
              callCtx.value = callCtx.left.value - callCtx.right.value;
              break;
            case "*":
              callCtx.value = callCtx.left.value * callCtx.right.value;
              break;
            case "/":
              callCtx.value = callCtx.left.value / callCtx.right.value;
              break;
            case "=":
              var address = callCtx.left.address;
              if (address.type === 'local' || address.type === 'argument') {
                controlContext.variables[address.name] = callCtx.right.value;
              } else if (address.type === 'external') {
                var setter = controlContext.accessors["set_" + address.name];
                setter(callCtx.right.value);
              } else if (address.type === 'field') {
                address.owner[address.field] = callCtx.right.value;
              } else {
                throw "unrecognized address type";
              }
              break;
            default:
              throw "unrecognized operator";
          }
          success();
        }, fail)
      }, fail);
    } catch (e) {
      console.log(`BinaryExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = BinaryExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
