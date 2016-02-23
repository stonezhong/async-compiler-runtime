#!/bin/sh

rm test/build/*

node --harmony node_modules/async-compiler/compile.js --input test/src/ArrayExpr.js --output test/build/ArrayExpr.js

node_modules/.bin/mocha --reporter spec "test/build/*.js"
