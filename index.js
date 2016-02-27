var ContextBuilder = require('./context/ContextBuilder');
var StatementSequenceCtx = require('./context/StatementSequence');

var AsyncTool = {
  eval: function(__async_context__, statements) {
    var nodeContext = StatementSequenceCtx.buildContext(statements);
    var controlContext = {
      hitReturn: false,
      returnValue: undefined,
      loopCount: 0,
      accessors: __async_context__.accessors,
    };
    var p = new Promise(
      function(resolve, reject) {
        nodeContext.execute(
          controlContext,
          {},
          function() {
            resolve(controlContext.returnValue);
          },
          function(reason) {
            reject(reason);
          }
        );
      }
    );

    return p;
  }
};





module.exports = AsyncTool;
