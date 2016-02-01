var ContextBuilder = require('./ContextBuilder');

var VarStatement = {
  buildContext: function(exprNode) {
    var children = new Array(exprNode.defs.length);
    for (var i = 0; i < children.length; i ++) {
      var def = exprNode.defs[i];
      children[i] = VarStatementSegment.buildContext(def.name, def.value)
    }
    return {
      children: children,
      nextSegmentIndex: 0,
      execute: VarStatement.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      if (callCtx.nextSegmentIndex >= callCtx.children.length) {
        success();
        return ;
      }

      var child = callCtx.children[callCtx.nextSegmentIndex];
      child.execute(
        controlContext,
        options,
        function() {
          callCtx.nextSegmentIndex ++;
          callCtx.execute(controlContext, options, success, fail);
        },
        fail
      );
    } catch (e) {
      console.log(`VarStatement.execute: ${e}`);
      throw e;
    }
  }
};

var VarStatementSegment = {
  buildContext: function(name, expr) {
    return {
      name: name,
      expr: ContextBuilder.buildCallContext(expr),
      execute: VarStatementSegment.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;
      callCtx.expr.execute(
        controlContext,
        options,
        function() {
          controlContext.variables[callCtx.name] = callCtx.expr.value;
          success();
        },
        fail
      );
    } catch (e) {
      console.log(`VarStatementSegment.execute: ${e}`);
      throw e;
    }
  }
}

module.exports = VarStatement;
