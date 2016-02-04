var ContextBuilder = require('./context/ContextBuilder');
var StatementSequenceCtx = require('./context/StatementSequence');

var AsyncTool = {
  // variables: 包含全部的函数调用的参数和局部变量
  // accessors: contains getters and setters for all local variables
  eval: function(variables, accessors, statements) {
    var nodeContext = StatementSequenceCtx.buildContext(statements);
    var controlContext = {
      hitReturn: false,
      returnValue: undefined,
      loopCount: 0,
      variables: variables,
      accessors: accessors,     // for external variable
    };
    var p = new Promise(
      function(resolve, reject) {
        nodeContext.execute(
          controlContext,
          {},
          function() {
            resolve(controlContext.returnValue);
          },
          function() {
            reject("error");
          }
        );
      }
    );

    return p;
  }
};





module.exports = AsyncTool;
