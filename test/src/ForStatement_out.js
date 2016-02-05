var AsyncTool = require("../../index.js");

function test() {
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
        }
    };
    var __local_variables__ = {
        sum: undefined,
        i: undefined
    };
    return AsyncTool.eval(__local_variables__, __accessors__, [ {
        type: "var",
        defs: [ {
            name: "sum",
            value: {
                type: "ref",
                literal: 0,
                refType: "literal"
            }
        } ]
    }, {
        type: "for",
        init: {
            type: "var",
            defs: [ {
                name: "i",
                value: {
                    type: "ref",
                    literal: 0,
                    refType: "literal"
                }
            } ]
        },
        condition: {
            type: "binary",
            operator: "<=",
            left: {
                type: "ref",
                name: "i",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 10,
                refType: "literal"
            }
        },
        step: {
            type: "unary",
            operator: "++",
            isPost: true,
            expr: {
                type: "ref",
                name: "i",
                refType: "local"
            }
        },
        body: {
            type: "block",
            children: [ {
                type: "simpleStatement",
                body: {
                    type: "binary",
                    operator: "+=",
                    left: {
                        type: "ref",
                        name: "sum",
                        refType: "local"
                    },
                    right: {
                        type: "ref",
                        name: "i",
                        refType: "local"
                    }
                }
            } ]
        }
    }, {
        type: "return",
        value: {
            type: "ref",
            name: "sum",
            refType: "local"
        }
    } ]);
}

test().then(function(sum) {
    console.log("sum =", sum);
});
