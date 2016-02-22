var AsyncTool = require('../../index.js');
var TestTool = require('../TestTool');

var fa = Promise.resolve(7);
var fb = Promise.resolve(4);

var fc = undefined;
var fd = Promise.resolve(1);

var obj = {
  field1: undefined,
  field2: Promise.resolve(12),
  field3: Promise.reject('field3'),
};
var field1 = Promise.resolve('field1');
var field2 = Promise.resolve('field2');
var field3 = Promise.resolve('field3');

var far = Promise.reject('far');
var fbr = Promise.reject('fbr');

var ea1;

var field1R = Promise.reject('field1 not found');
var field2R = Promise.reject('field2 not found');

var pObjR = Promise.reject('object not found');
var pObj  = Promise.resolve(obj);

/** @async **/
function testOk() {
  console.log('testOk');
  // local
  var a1 = fa;
  console.log(a1);

  var a2 = 3;
  a2 += fa;
  console.log(a2);

  // external
  fc = fa;
  console.log(fc);

  fd += fa;
  console.log(fd);

  // object field
  obj[field1] = fa;
  console.log(obj[field1]);

  obj[field2] += fa;
  console.log(obj[field2]);
}

/** @async **/
function testRejectLocalEqR() {
  console.log('testRejectLocalEqR');
  var a1 = far;
  [ a1 ];
}

/** @async **/
function testRejectLocalOpRO() {
  console.log('testRejectLocalOpRO');
  var a1 = fbr;
  a1 += fa;
}

/** @async **/
function testRejectLocalOpOR() {
  console.log('testRejectLocalOpOR');
  var a1 = fb;
  a1 += far;
}

/** @async **/
function testRejectLocalOpRR() {
  console.log('testRejectLocalOpRR');
  var a1 = fbr;
  a1 += far;
}

/** @async **/
function testRejectExternalEqR() {
  console.log('testRejectExternalEqR');
  ea1 = far;
  [ ea1 ];
}

/** @async **/
function testRejectExternalOpRO() {
  console.log('testRejectExternalOpRO');
  ea1 = fbr;
  ea1 += fa;
}

/** @async **/
function testRejectExternalOpOR() {
  console.log('testRejectExternalOpOR');
  ea1 = fb;
  ea1 += far;
}

/** @async **/
function testRejectExternalOpRR() {
  console.log('testRejectExternalOpRR');
  ea1 = fbr;
  ea1 += far;
}

/** @async **/
function testRejectFieldFieldNotFound() {
  console.log('testRejectFieldFieldNotFound');
  [ pObj[field1R] ]
}

/** @async **/
function testRejectFieldObjectNotFound() {
  console.log('testRejectFieldObjectNotFound');
  [ pObjR[field1] ];
}

/** @async **/
function testRejectFieldObjectAndFieldNotFound() {
  console.log('testRejectFieldObjectAndFieldNotFound');
  [ pObjR[field1R] ];
}

/** @async **/
function testRejectFieldEqR() {
  console.log('testRejectFieldEqR');
  pObj[field3] = far;
  [ pObj[field3] ];
}

/** @async **/
function testRejectFieldOpRO() {
  console.log('testRejectFieldOpRO');
  pObj[field3] = fbr;
  pObj[field3] += fa;
}

/** @async **/
function testRejectFieldOpOR() {
  console.log('testRejectFieldOpOR');
  pObj[field3] = fb;
  pObj[field3] += far;
}

/** @async **/
function testRejectFieldOpRR() {
  console.log('testRejectFieldOpRR');
  pObj[field3] = fbr;
  pObj[field3] += far;
}


TestTool.invoke([
    testOk,
    testRejectLocalEqR,
    testRejectLocalOpRO,
    testRejectLocalOpOR,
    testRejectLocalOpRR,
    testRejectExternalEqR,
    testRejectExternalOpRO,
    testRejectExternalOpOR,
    testRejectExternalOpRR,
    testRejectFieldFieldNotFound,
    testRejectFieldObjectNotFound,
    testRejectFieldObjectAndFieldNotFound,
    testRejectFieldEqR,
    testRejectFieldOpRO,
    testRejectFieldOpOR,
    testRejectFieldOpRR,
  ]).then(function(v) {
  console.log('done');
});
