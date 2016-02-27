var TryStatement = {
  buildContext: function(statement) {
    return {
      execute: TryStatement.execute,
      origin: statement,
    };
  },

  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      var bodyCtx = StatementSequence.buildContext(callCtx.origin.body);

      bodyCtx.execute(
        controlContext,
        options,
        function() {
          // execute the finally block if there is one
          if ('bfinally' in callCtx.origin) {
            var finallyCtx = StatementSequence.buildContext(callCtx.origin.bfinally.body);
            finallyCtx.execute(controlContext, options, success, fail);
            return ;
          }

          Utility.invokeCallback(success);
          return ;
        },
        function(e) {
          // execute the catch handler if there is one
          if ('bcatch' in callCtx.origin) {
            var catchCtx = StatementSequence.buildContext(callCtx.origin.bcatch.body);

            var newControlContext = {exception: e};
            Utility.copyControlContext(controlContext, newControlContext, true);
            newControlContext.accessors['set_' + callCtx.origin.bcatch.what] = function(v) {
              newControlContext.exception = v;
            };
            newControlContext.accessors['get_' + callCtx.origin.bcatch.what] = function() {
              return newControlContext.exception;
            };

            catchCtx.execute(
              newControlContext,
              options,
              function() {
                Utility.copyControlContext(newControlContext, controlContext, false);

                // execute the finally block if there is one
                if ('bfinally' in callCtx.origin) {
                  var finallyCtx = StatementSequence.buildContext(callCtx.origin.bfinally.body);
                  finallyCtx.execute(controlContext, options, success, fail);
                  return ;
                }

                Utility.invokeCallback(success);
              },
              fail
            );
            return ;
          }

          // no catch branch
          Promise.reject(e).catch(fail);
          return ;
        }
      );
    } catch (e) {
      console.log(`TryStatement.execute: ${e}`);
      throw e;
    }
  },
};

module.exports = TryStatement;

var ContextBuilder = require('./ContextBuilder');
var Utility = require('../utility');
var StatementSequence = require('./StatementSequence');
