var AsyncTool = require("../../index.js");

var chai = require("chai");

var expect = chai.expect;

var should = chai.should();

var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var a = Promise.resolve("a");

var b = Promise.resolve("b");

var c = Promise.reject("c");

function testOk() {
    var __accessors__ = {
        set_undefined: function(v) {
            undefined = v;
        },
        get_undefined: function() {
            return undefined;
        },
        set_NaN: function(v) {
            NaN = v;
        },
        get_NaN: function() {
            return NaN;
        },
        set_a: function(v) {
            a = v;
        },
        get_a: function() {
            return a;
        },
        set_b: function(v) {
            b = v;
        },
        get_b: function() {
            return b;
        }
    };
    var __local_variables__ = {};
    return AsyncTool.eval(__local_variables__, __accessors__, [ {
        type: "return",
        value: {
            type: "array",
            elements: [ {
                type: "ref",
                name: "a",
                refType: "external"
            }, {
                type: "ref",
                literal: 1,
                refType: "literal"
            }, {
                type: "ref",
                name: "b",
                refType: "external"
            } ]
        }
    } ]);
}

function testReject() {
    var __accessors__ = {
        set_undefined: function(v) {
            undefined = v;
        },
        get_undefined: function() {
            return undefined;
        },
        set_NaN: function(v) {
            NaN = v;
        },
        get_NaN: function() {
            return NaN;
        },
        set_a: function(v) {
            a = v;
        },
        get_a: function() {
            return a;
        },
        set_c: function(v) {
            c = v;
        },
        get_c: function() {
            return c;
        }
    };
    var __local_variables__ = {};
    return AsyncTool.eval(__local_variables__, __accessors__, [ {
        type: "return",
        value: {
            type: "array",
            elements: [ {
                type: "ref",
                name: "a",
                refType: "external"
            }, {
                type: "ref",
                literal: 1,
                refType: "literal"
            }, {
                type: "ref",
                name: "c",
                refType: "external"
            } ]
        }
    } ]);
}

describe("ArrayExpr", function() {
    it("returns an array with all elements resolved", function() {
        return expect(testOk()).to.eventually.eql([ "a", 1, "b" ]);
    });
    it("reject when one of the element is rejected", function() {
        return expect(testReject()).to.be.rejectedWith("c");
    });
});
