var StatementSequence = {
  buildContext: function(statements) {
    var children = new Array(statements.length);
    for (var i = 0; i < children.length; i ++) {
      children[i] = ContextBuilder.buildCallContext(statements[i]);
    }
    return {
      children: children,
      nextIndex: 0,
      execute: StatementSequence.execute
    };
  },

  execute: function(controlContext, variables, success, fail) {
    if (controlContext.shouldReturn) {
      success();
      return ;
    }

    var callCtx = this;
    var child = callCtx.children[callCtx.nextIndex];
    child.execute(
      controlContext,
      variables,
      function() {
        callCtx.nextIndex ++;
        if (callCtx.nextIndex >= callCtx.children.length) {
          success();
          return ;
        }
        callCtx.execute(controlContext, variables, success, fail);
      },
      fail
    );
  }
};

module.exports = StatementSequence;

var ContextBuilder = require('./ContextBuilder');
