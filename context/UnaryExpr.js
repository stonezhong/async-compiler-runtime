// TODO: remove duplicate code among performXXX

function performObjectField(object, field, operator, isPost) {
  var ret ;

  if (isPost) {
    switch (operator) {
      case "++":
        ret = object[field] ++;
        break;
      case "--":
        ret = object[field] --;
        break;
      default:
        throw "unrecognized unary operator";
    }
  } else {
    switch (operator) {
      case "++":
        ret = ++ object[field];
        break;
      case "--":
        ret = -- object[field];
        break;
      case "!":
        ret = !object[field];
        break;
      case "~":
        ret = ~object[field];
        break;
      default:
        throw "unrecognized unary operator";
    }
  }

  return ret;
}

// based on value and operator, calculate it
function calculateValue(value, operator) {
  var ret ;

  switch (operator) {
    case "++":
      ret = ++ value;
      break;
    case "--":
      ret = -- value;
      break;
    case "!":
      ret = !value;
      break;
    case "~":
      ret = ~value;
      break;
    default:
      throw "unrecognized unary operator";
  }
  return ret;
}

var UnaryExpr = {
  buildContext: function(node) {
    return {
      execute: UnaryExpr.execute,
      origin: node,
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var exprCtx = ContextBuilder.buildCallContext(callCtx.origin.expr);

      var newOptions = options;
      if ((callCtx.origin.operator === "++") || (callCtx.origin.operator === "--")) {
        newOptions = Utility.updateOptions(options, {asAddress: true});
      }

      exprCtx.execute(controlContext, newOptions, function() {
        if (!newOptions.asAddress) {
          callCtx.value = calculateValue(exprCtx.value, callCtx.origin.operator);
          Utility.invokeCallback(success);
          return ;
        }

        var address = exprCtx.address;
        var object;
        var field;

        if (address.type === 'local' || address.type === 'argument') {
          object = controlContext.variables;
          field = address.name;
          callCtx.value = performObjectField(object, field, callCtx.origin.operator, callCtx.origin.isPost);
          Utility.invokeCallback(success);
          return ;
        }

        if (address.type === 'field') {
          object = address.owner;
          field = address.field;
          callCtx.value = performObjectField(object, field, callCtx.origin.operator, callCtx.origin.isPost);
          Utility.invokeCallback(success);
          return ;
        }

        if (address.type === 'external') {
          var setter = controlContext.accessors["set_" + address.name];
          var getter = controlContext.accessors["get_" + address.name];
          var value = getter()
          var newValue = calculateValue(value, callCtx.origin.operator);
          setter(newValue);
          if (callCtx.origin.isPost) {
            callCtx.value = value;
          } else {
            callCtx.value = newValue;
          }
          Utility.invokeCallback(success);
          return ;
        }
        throw "unrecognized address type";
      }, fail);
    } catch (e) {
      console.log(`UnaryExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = UnaryExpr;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
