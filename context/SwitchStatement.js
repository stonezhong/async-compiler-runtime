// TODO: (Stone Zhong) lots of copy and paste, improve it latter

var SwitchStatement = {
  buildContext: function(statement) {
    return {
      execute: SwitchStatement.execute,
      executeLoop: SwitchStatement.executeLoop,
      origin: statement,
    };
  },

  executeLoop: function(searching, exprValue, currentIndex, controlContext, options, success, fail) {
    try {
      var callCtx = this;

      if (currentIndex >= callCtx.origin.children.length) {
        controlContext.loopCount --;
        Utility.invokeCallback(success);
        return ;
      }

      var caseBranch = callCtx.origin.children[currentIndex];
      currentIndex ++;

      if (!searching) {
        // not searching for a case branch, execute until we hit return or break
        var bodyCtx = StatementSequence.buildContext(caseBranch.children)
        bodyCtx.execute(controlContext, options, function() {
          if (controlContext.hitReturn) {
            Utility.invokeCallback(success);
            return ;
          }
          if (bodyCtx.hitBreak) {
            controlContext.loopCount --;
            Utility.invokeCallback(success);
            return ;
          }
          callCtx.executeLoop(false, exprValue, currentIndex, controlContext, options, success, fail);
        }, fail);
        return ;
      }

      if (caseBranch.type === 'switch-case') {
        var caseExprCtx = ContextBuilder.buildCallContext(caseBranch.expression);
        caseExprCtx.execute(controlContext, options, function() {
          Promise.resolve(caseExprCtx.value).then(function(caseExprValue) {
            // 如果表达式相符
            if (exprValue === caseExprValue) {
              var bodyCtx = StatementSequence.buildContext(caseBranch.children)
              bodyCtx.execute(controlContext, options, function() {
                if (controlContext.hitReturn) {
                  Utility.invokeCallback(success);
                  return ;
                }
                if (bodyCtx.hitBreak) {
                  controlContext.loopCount --;
                  Utility.invokeCallback(success);
                  return ;
                }
                callCtx.executeLoop(false, exprValue, currentIndex, controlContext, options, success, fail);
              }, fail);
              return ;
            }

            // 表达式不相符，直接进入下一个case/default分支
            callCtx.executeLoop(true, exprValue, currentIndex, controlContext, options, success, fail);
            return ;
          }, fail);
        }, fail);
        return ;
      }

      // 或者是'case-default'
      var bodyCtx = StatementSequence.buildContext(caseBranch.children)
      bodyCtx.execute(controlContext, options, function() {
        if (controlContext.hitReturn) {
          Utility.invokeCallback(success);
          return ;
        }
        // if we hit 'default' branch, we are not going to keep forward matching
        controlContext.loopCount --;
        Utility.invokeCallback(success);
      }, fail);
    } catch (e) {
      console.log(`SwitchStatement.execute<InLoop>: ${e}`);
      throw e;
    }
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var exprCtx = ContextBuilder.buildCallContext(callCtx.origin.expression);
      exprCtx.execute(controlContext, options, function() {
        Promise.resolve(exprCtx.value).then(function(exprValue) {
          controlContext.loopCount ++;
          callCtx.executeLoop(true, exprValue, 0, controlContext, options, success, fail);
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`SwitchStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = SwitchStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
var StatementSequence = require('./StatementSequence');
