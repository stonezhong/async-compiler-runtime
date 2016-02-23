// based on value and operator, calculate it
function compute(operator, a) {
  switch (operator) {
    case '++': return ++a;
    case '--': return --a;
    case '!':  return !a;
    case '~':  return ~a;
    case 'typeof': return typeof a;
  }
  throw new Error('operator \'' + operator + '\' is unrecognized');
}

function doCompute(operator, a, success, fail) {
  Promise.resolve(a).then(function(oldValue) {
    var newValue;
    try {
      newValue = compute(operator, oldValue);
    } catch (e) {
      fail(e);
      return ;
    }
    success(oldValue, newValue);
  }, fail);
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

      var newOptions = options;
      var leftIsAddress = ((callCtx.origin.operator === "++") || (callCtx.origin.operator === "--") || (callCtx.origin.operator === "delete"));
      if (leftIsAddress) {
        newOptions = Utility.updateOptions(options, {asAddress: true});
      }

      var exprCtx = ContextBuilder.buildCallContext(callCtx.origin.expr);
      exprCtx.execute(controlContext, newOptions, function() {
        if (!leftIsAddress) {
          doCompute(
            callCtx.origin.operator,
            exprCtx.value,
            function(oldValue, newValue) {
              callCtx.value = newValue;
              Utility.invokeCallback(success);
              return ;
            },
            fail
          );
          return ;
        }

        var address = exprCtx.address;
        if (address.type === 'local' || address.type === 'argument') {
          doCompute(
            callCtx.origin.operator,
            controlContext.variables[address.name],
            function(oldValue, newValue) {
              controlContext.variables[address.name] = newValue;
              callCtx.value = (callCtx.origin.isPost ? oldValue : newValue);
              Utility.invokeCallback(success);
              return ;
            },
            fail
          );
          return ;
        }

        if (address.type === 'external') {
          var setter = controlContext.accessors["set_" + address.name];
          var getter = controlContext.accessors["get_" + address.name];

          doCompute(
            callCtx.origin.operator,
            getter(),
            function(oldValue, newValue) {
              setter(newValue);
              callCtx.value = (callCtx.origin.isPost ? oldValue : newValue);
              Utility.invokeCallback(success);
              return ;
            },
            fail
          );
          return ;
        }

        if (address.type === 'field') {
          Promise.all([Promise.resolve(address.owner), Promise.resolve(address.field)]).then(
            function(ownerAndField) {
              var owner = ownerAndField[0];
              var field = ownerAndField[1];

              if (callCtx.origin.operator === 'delete') {
                callCtx.value = delete owner[field];
                Utility.invokeCallback(success);
                return ;
              }

              doCompute(
                callCtx.origin.operator,
                owner[field],
                function(oldValue, newValue) {
                  owner[field] = newValue;
                  callCtx.value = (callCtx.origin.isPost ? oldValue : newValue);
                  Utility.invokeCallback(success);
                  return ;
                },
                fail
              );
            }, fail
          );
        }

        fail(new Error('internal error: invalid address type'));
        return ;
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
