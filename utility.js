var Utility = {

  updateOptions: function(options, update) {
    var newOptions = {};
    for (var key in options) {
      newOptions[key] = options[key];
    }
    for (var key in update) {
      newOptions[key] = update[key];
    }

    return newOptions;
  },

  copyLoopStatus: function(dst, src) {
    if ('hitBreak' in src) {
      dst.hitBreak = src.hitBreak;
    }
    if ('hitContinue' in src) {
      dst.hitContinue = src.hitContinue;
    }
  },

};

module.exports = Utility;
