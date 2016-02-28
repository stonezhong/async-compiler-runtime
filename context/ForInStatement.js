var ForInStatement = {
  buildContext: function(statement) {
    return {
      execute: ForInStatement.execute,
      executeLoop: ForInStatement.executeLoop,
      origin: statement,
    };
  },

  executeLoop: function(keys, currentIndex, controlContext, options, success, fail) {
    try {
      var callCtx = this;

      if (currentIndex >= keys.length) {
        controlContext.loopCount --;
        Utility.invokeCallback(success);
        return ;
      }

      var setter = controlContext.accessors["set_" + callCtx.origin.name];

      setter(keys[currentIndex]);
      currentIndex ++;

      var bodyCtx = ContextBuilder.buildCallContext(callCtx.origin.body);
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
        callCtx.executeLoop(keys, currentIndex, controlContext, options, success, fail);
      }, fail);
    } catch (e) {
      console.log(`ForInStatement.execute<InLoop>: ${e}`);
      throw e;
    }
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var objectCtx = ContextBuilder.buildCallContext(callCtx.origin.object);
      objectCtx.execute(controlContext, options, function() {
        Promise.resolve(objectCtx.value).then(function(objectValue) {
          controlContext.loopCount ++;
          callCtx.executeLoop(Object.keys(objectValue), 0, controlContext, options, success, fail);
        }, fail);
      }, fail);
    } catch (e) {
      console.log(`ForInStatement.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = ForInStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
