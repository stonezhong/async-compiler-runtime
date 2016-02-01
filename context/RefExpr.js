// TODO: ref could point to a promise
// There are 4 refTypes
// 'external'
// 'argument'
// 'local'
// 'literal'

var RefExpr = {
  buildContext: function(node) {
    return {
      origin: node,
      execute: RefExpr.execute
    };
  },
  execute: function(controlContext, options, success, fail) {
    try {
      var callCtx = this;

      if (options.asAddress) {
        this.address = {
          type: this.origin.refType,
          name: this.origin.name
        }
        success();
        return ;
      }

      if (this.origin.refType === 'literal') {
        this.value = this.origin.literal;
        success();
        return ;
      }

      if (this.origin.refType === 'external') {
        var getter = controlContext.accessors["get_" + this.origin.name];
        this.value = getter();
        success();
        return ;
      }

      this.value = controlContext.variables[this.origin.name];
      success();
    } catch (e) {
      console.log(`RefExpr.execute: ${e}`);
      throw e;
    }
  }
};

module.exports = RefExpr;

var ContextBuilder = require('./ContextBuilder');
