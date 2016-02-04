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
    case "+=":  return a + b;
    case "-=":  return a - b;
    case "*=":  return a * b;
    case "/=":  return a / b;
    case "%=":  return a % b;
    case "&&=": return a && b;
    case "||=": return a || b;
    case "^=":  return a ^= b;
    case "&=":  return a &= b;
    case "|=":  return a |= b;
    case ">>=": return a >>= b;
    case "<<=": return a <<= b;
  }
  throw "Unrecognized operator";
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
      if (isLeftAddress(callCtx.origin.operator)) {
        options1 = Utility.updateOptions(options, {asAddress: true});
      }

      var leftCtx = ContextBuilder.buildCallContext(callCtx.origin.left);
      leftCtx.execute(controlContext, options1, function() {
        var rightCtx = ContextBuilder.buildCallContext(callCtx.origin.right);
        rightCtx.execute(controlContext, options, function() {

          if (isLeftAddress(callCtx.origin.operator)) {
            var address = leftCtx.address;
            if (address.type === 'local' || address.type === 'argument') {
              if (callCtx.origin.operator === "=") {
                controlContext.variables[address.name] = rightCtx.value;
              } else {
                controlContext.variables[address.name] = compute(
                  callCtx.origin.operator,
                  controlContext.variables[address.name],
                  rightCtx.value);
              }
              callCtx.value = controlContext.variables[address.name];
            } else if (address.type === 'external') {
              var newValue;
              if (callCtx.origin.operator === "=") {
                newValue = rightCtx.value;
              } else {
                var getter = controlContext.accessors["get_" + address.name];
                newValue = compute(callCtx.origin.operator, getter(), rightCtx.value);
              }
              var setter = controlContext.accessors["set_" + address.name];
              setter(newValue);
              callCtx.value = newValue;
            } else if (address.type === 'field') {
              var newValue;
              if (callCtx.origin.operator === "=") {
                newValue = rightCtx.value;
              } else {
                newValue = compute(callCtx.origin.operator, address.owner[address.field], rightCtx.value);
              }
              address.owner[address.field] = newValue;
              callCtx.value = newValue;
            }
            success();
            return ;
          }

          switch(callCtx.origin.operator) {
            case "+":
              callCtx.value = leftCtx.value + rightCtx.value;
              break;
            case "-":
              callCtx.value = leftCtx.value - rightCtx.value;
              break;
            case "*":
              callCtx.value = leftCtx.value * rightCtx.value;
              break;
            case "/":
              callCtx.value = leftCtx.value / rightCtx.value;
              break;
            case "%":
              callCtx.value = leftCtx.value % rightCtx.value;
              break;
            case "&&":
              callCtx.value = leftCtx.value && rightCtx.value;
              break;
            case "||":
              callCtx.value = leftCtx.value || rightCtx.value;
              break;
            case "^":
              callCtx.value = leftCtx.value ^ rightCtx.value;
              break;
            case "&":
              callCtx.value = leftCtx.value & rightCtx.value;
              break;
            case "|":
              callCtx.value = leftCtx.value | rightCtx.value;
              break;
            case ">>":
              callCtx.value = leftCtx.value >> rightCtx.value;
              break;
            case "<<":
              callCtx.value = leftCtx.value << rightCtx.value;
              break;
            case ">":
              callCtx.value = (leftCtx.value > rightCtx.value);
              break;
            case ">=":
              callCtx.value = (leftCtx.value >= rightCtx.value);
              break;
            case "<":
              callCtx.value = (leftCtx.value < rightCtx.value);
              break;
            case "<=":
              callCtx.value = (leftCtx.value <= rightCtx.value);
              break;
            case "==":
              callCtx.value = (leftCtx.value == rightCtx.value);
              break;
            case "!=":
              callCtx.value = (leftCtx.value != rightCtx.value);
              break;
            case "===":
              callCtx.value = (leftCtx.value === rightCtx.value);
              break;
            case "!==":
              callCtx.value = (leftCtx.value !== rightCtx.value);
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
