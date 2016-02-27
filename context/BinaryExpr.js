function isLeftAddress(operator) {
  if ((operator === '=') ||
      (operator === '+=') ||
      (operator === '-=') ||
      (operator === '*=') ||
      (operator === '/=') ||
      (operator === '%=') ||
      (operator === '&&=') ||
      (operator === '||=') ||
      (operator === '^=') ||
      (operator === '&=') ||
      (operator === '|=') ||
      (operator === '>>=') ||
      (operator === '<<=')
  ) {
    return true;
  }
  return false;
}

function compute(operator, a, b) {
  switch(operator) {
    case 'instanceof': return a instanceof b;
    case '+':   return a + b;
    case '-':   return a - b;
    case '*':   return a * b;
    case '/':   return a / b;
    case '%':   return a % b;
    case '&&':  return a && b;
    case '||':  return a || b;
    case '^':   return a ^ b;
    case '&':   return a & b;
    case '|':   return a | b;
    case '>>':  return a >> b;
    case '<<':  return a << b;
    case '>':   return a > b;
    case '>=':  return a >= b;
    case '<':   return a < b;
    case '<=':  return a <= b;
    case '==':  return a == b;
    case '!=':  return a != b;
    case '===': return a === b;
    case '!==': return a !== b;
    case '+=':  return a + b;
    case '-=':  return a - b;
    case '*=':  return a * b;
    case '/=':  return a / b;
    case '%=':  return a % b;
    case '&&=': return a && b;
    case '||=': return a || b;
    case '^=':  return a ^= b;
    case '&=':  return a &= b;
    case '|=':  return a |= b;
    case '>>=': return a >>= b;
    case '<<=': return a <<= b;
  }
  throw new Error('operator \'' + operator + '\' is unrecognized');
}

function doCompute(operator, a, b, success, fail) {
  Promise.all([Promise.resolve(a), Promise.resolve(b)]).then(function(values) {
    var result;
    try {
      result = compute(operator, values[0], values[1]);
    } catch (e) {
      fail(e);
      return ;
    }
    success(result);
  }, fail);
}

var BinaryExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: BinaryExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;

      var options1 = options;

      var leftIsAddress = isLeftAddress(callCtx.origin.operator);
      if (leftIsAddress) {
        options1 = Utility.updateOptions(options, {asAddress: true});
      }

      var leftCtx = ContextBuilder.buildCallContext(callCtx.origin.left);
      leftCtx.execute(controlContext, options1, function() {
        var rightCtx = ContextBuilder.buildCallContext(callCtx.origin.right);
        rightCtx.execute(controlContext, options, function() {

          if (leftIsAddress) {
            var address = leftCtx.address;

            if ((address.type === 'external') || (address.type === 'local' || address.type === 'argument')) {
              var setter = controlContext.accessors["set_" + address.name];
              if (callCtx.origin.operator === "=") {
                setter(rightCtx.value);
                callCtx.value = rightCtx.value;
                Utility.invokeCallback(success);
                return ;
              }

              var getter = controlContext.accessors["get_" + address.name];
              doCompute(
                callCtx.origin.operator,
                getter(),
                rightCtx.value,
                function(result) {
                  setter(result);
                  callCtx.value = result;
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

                  if (callCtx.origin.operator === "=") {
                    owner[field] = rightCtx.value;
                    callCtx.value = rightCtx.value;
                    Utility.invokeCallback(success);
                    return ;
                  }

                  doCompute(
                    callCtx.origin.operator,
                    owner[field],
                    rightCtx.value,
                    function(result) {
                      owner[field] = result;
                      callCtx.value = result;
                      Utility.invokeCallback(success);
                      return ;
                    },
                    fail
                  );
                  return ;
                },
                fail
              );
              return ;
            }

            fail(new Error('internal error: invalid address type'));
            return ;
          }

          doCompute(
            callCtx.origin.operator,
            leftCtx.value,
            rightCtx.value,
            function(result) {
              callCtx.value = result;
              Utility.invokeCallback(success);
              return ;
            },
            fail
          );
          return ;
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
