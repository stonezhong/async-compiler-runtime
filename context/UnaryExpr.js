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
      default:
        throw "unrecognized unary operator";
    }
  }

  return ret;
}

function performValue(value, operator) {
  var ret ;

  switch (operator) {
    case "++":
      ret = value ++;
      break;
    case "--":
      ret = value --;
      break;
    default:
      throw "unrecognized unary operator";
  }
  return ret;
}

var UnaryExpr = {
  buildContext: function(node) {
    return {
      expr:   ContextBuilder.buildCallContext(node.expr),
      operator: node.operator,
      isPost: node.isPost,
      execute: UnaryExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;

      var options1 = Utility.copyObject(options);
      options1.asAddress = true;

      callCtx.expr.execute(controlContext, options1, function() {
        var address = callCtx.expr.address;
        var object;
        var field;

        if (address.type === 'local' || address.type === 'argument') {
          object = controlContext.variables;
          field = address.name;
          callCtx.value = performObjectField(object, field, callCtx.operator, callCtx.isPost);
          success();
          return ;
        }

        if (address.type === 'field') {
          object = address.owner;
          field = address.field;
          callCtx.value = performObjectField(object, field, callCtx.operator, callCtx.isPost);
          success();
          return ;
        }

        if (address.type === 'external') {
          var setter = controlContext.accessors["set_" + address.name];
          var getter = controlContext.accessors["get_" + address.name];
          var value = getter()
          var newValue = perform(value, callCtx.operator);
          setter(newValue);
          if (callCtx.isPost) {
            callCtx.value = value;
          } else {
            callCtx.value = newValue;
          }
          success();
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
