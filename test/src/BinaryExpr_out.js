var AsyncTool = require("../../index.js");

var o = {
    v: 0
};

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
        },
        set_console: function(v) {
            console = v;
        },
        get_console: function() {
            return console;
        },
        set_o: function(v) {
            o = v;
        },
        get_o: function() {
            return o;
        }
    };
    var __local_variables__ = {
        a: undefined,
        b: undefined,
        c: undefined
    };
    return AsyncTool.eval(__local_variables__, __accessors__, [ {
        type: "var",
        defs: [ {
            name: "a",
            value: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        } ]
    }, {
        type: "var",
        defs: [ {
            name: "b",
            value: {
                type: "ref",
                literal: 4,
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
                literal: "binary operator that does not change operand",
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
                type: "binary",
                operator: "+",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "-",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "*",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "/",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "%",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: true,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: false,
                refType: "literal"
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
                type: "binary",
                operator: "&&",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "||",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 16,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 1,
                refType: "literal"
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
                type: "binary",
                operator: "^",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "|",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "&",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 4,
                refType: "literal"
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
                type: "binary",
                operator: ">=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: ">",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "<=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "<",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "==",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "===",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "!=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "!==",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 18,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 1,
                refType: "literal"
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
                type: "binary",
                operator: ">>",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "binary",
                operator: "<<",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
            } ]
        }
    }, {
        type: "var",
        defs: [ {
            name: "c",
            value: {
                type: "ref",
                refType: "external",
                name: "undefined"
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
                literal: "binary operator that changes operand",
                refType: "literal"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 4,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "+=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "+=",
                left: {
                    type: "dot",
                    owner: {
                        type: "ref",
                        name: "o",
                        refType: "external"
                    },
                    field: {
                        type: "ref",
                        literal: "v",
                        refType: "literal"
                    }
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 4,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "-=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "-=",
                left: {
                    type: "dot",
                    owner: {
                        type: "ref",
                        name: "o",
                        refType: "external"
                    },
                    field: {
                        type: "ref",
                        literal: "v",
                        refType: "literal"
                    }
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 4,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "*=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "*=",
                left: {
                    type: "dot",
                    owner: {
                        type: "ref",
                        name: "o",
                        refType: "external"
                    },
                    field: {
                        type: "ref",
                        literal: "v",
                        refType: "literal"
                    }
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 4,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "/=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "/=",
                left: {
                    type: "dot",
                    owner: {
                        type: "ref",
                        name: "o",
                        refType: "external"
                    },
                    field: {
                        type: "ref",
                        literal: "v",
                        refType: "literal"
                    }
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "a",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "b",
                refType: "local"
            },
            right: {
                type: "ref",
                literal: 4,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "%=",
                left: {
                    type: "ref",
                    name: "a",
                    refType: "local"
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
            } ]
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            },
            right: {
                type: "ref",
                literal: 7,
                refType: "literal"
            }
        }
    }, {
        type: "simpleStatement",
        body: {
            type: "binary",
            operator: "=",
            left: {
                type: "ref",
                name: "c",
                refType: "local"
            },
            right: {
                type: "binary",
                operator: "%=",
                left: {
                    type: "dot",
                    owner: {
                        type: "ref",
                        name: "o",
                        refType: "external"
                    },
                    field: {
                        type: "ref",
                        literal: "v",
                        refType: "literal"
                    }
                },
                right: {
                    type: "ref",
                    name: "b",
                    refType: "local"
                }
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
                type: "dot",
                owner: {
                    type: "ref",
                    name: "o",
                    refType: "external"
                },
                field: {
                    type: "ref",
                    literal: "v",
                    refType: "literal"
                }
            }, {
                type: "ref",
                name: "b",
                refType: "local"
            }, {
                type: "ref",
                name: "c",
                refType: "local"
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

test().then(function(v) {
    console.log("Done");
});
