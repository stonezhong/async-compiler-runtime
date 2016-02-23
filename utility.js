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

  isPromise(value) {
    return (typeof(value) === 'object' &&
        typeof(value.then) === 'function' &&
        typeof(value.catch) === 'function');
  },

  isThenable(value) {
    return (typeof(value) === 'object' && typeof(value.then) === 'function')
  },

  invokeCallback(callback) {
    Promise.resolve().then(callback);
  },

  /*************************************************
   * In javascript, there is no way to invoke new operator
   * with dynamic number of arguments
   * In real world, I rarely see a constructor takes too many
   * arguments, say 40, so let's put a cap on it.
   * I am still using 'new' operator instead of trying to
   * simulating new (simulating new could be very buggy)
   **************************************************/
  callNewOperator(func, args) {
    if (args.length == 0) {
      return new func();
    }
    if (args.length == 1) {
      return new func(args[0]);
    }
    if (args.length == 2) {
      return new func(args[0], args[1]);
    }
    if (args.length == 3) {
      return new func(args[0], args[1], args[2]);
    }
    if (args.length == 4) {
      return new func(args[0], args[1], args[2], args[3]);
    }
    if (args.length == 5) {
      return new func(args[0], args[1], args[2], args[3], args[4]);
    }
    if (args.length == 6) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5]);
    }
    if (args.length == 7) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    if (args.length == 8) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    }
    if (args.length == 9) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
    }
    if (args.length == 10) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
    }
    if (args.length == 11) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);
    }
    if (args.length == 12) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]);
    }
    if (args.length == 13) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12]);
    }
    if (args.length == 14) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13]);
    }
    if (args.length == 15) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
    }
    if (args.length == 16) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15]);
    }
    if (args.length == 17) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16]);
    }
    if (args.length == 18) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17]);
    }
    if (args.length == 19) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18]);
    }
    if (args.length >= 20) {
      return new func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18], args[19]);
    }
  },

};

module.exports = Utility;
