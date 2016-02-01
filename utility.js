var Utility = {

  copyObject: function(src) {
    var ret = {};
    for (var key in src) {
      ret[key] = src[key];
    }
    return ret;
  }
  
};

module.exports = Utility;
