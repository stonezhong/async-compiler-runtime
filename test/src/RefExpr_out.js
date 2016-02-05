var AsyncTool = require("../../index.js");

var t = 5;

var m = Promise.resolve("hello");

function test(x) {
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
        set_console: function(v) {
            console = v;
        },
        get_console: function() {
            return console;
        },
        set_t: function(v) {
            t = v;
        },
        get_t: function() {
            return t;
        },
        set_m: function(v) {
            m = v;
        },
        get_m: function() {
            return m;
        }
    };
    var __local_variables__ = {
        x: x,
        a: undefined
    };
    return AsyncTool.eval(__local_variables__, __accessors__, [ {
        type: "var",
        defs: [ {
            name: "a",
            value: {
                type: "ref",
                literal: 3,
                refType: "literal"
            }
        } ]
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                literal: 1,
                refType: "literal"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                literal: 2,
                refType: "literal"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                name: "a",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                name: "x",
                refType: "argument"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                name: "t",
                refType: "external"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "unary",
            operator: "++",
            isPost: true,
            expr: {
                type: "ref",
                name: "a",
                refType: "local"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                name: "a",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "call",
            func: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "console",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "log",
                    refType: "literal"
                }
            },
            args: [ {
                type: "ref",
                name: "m",
                refType: "external"
            } ]
        }
    }, {
        type: "return",
        value: {
            type: "ref",
            literal: 1,
            refType: "literal"
        }
    } ]);
}

test(4).then(function(v) {
    console.log("Done");
});
