/* private */
function invokeWorker(functions, index, resolve, reject) {
  if (index >= functions.length) {
    resolve();
    return ;
  }

  functions[index]().then(
    function() {
      invokeWorker(functions, index + 1, resolve, reject);
    },
    function(err) {
      console.log('error', err);
      invokeWorker(functions, index + 1, resolve, reject);
    }
  );
}

var TestTool = {
  invoke: function(functions) {
    var p = new Promise(function(resolve, reject) {
      invokeWorker(functions, 0, resolve, reject);
    });
    return p;
  }

};

module.exports = TestTool;
