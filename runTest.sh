#!/bin/sh

rm test/build/*

node --harmony node_modules/async-compiler/compile.js --input test/src/ArrayExpr.js         --output test/build/ArrayExpr.js
node --harmony node_modules/async-compiler/compile.js --input test/src/RefExpr.js           --output test/build/RefExpr.js
node --harmony node_modules/async-compiler/compile.js --input test/src/BinaryExpr.js        --output test/build/BinaryExpr.js
node --harmony node_modules/async-compiler/compile.js --input test/src/ForStatement.js      --output test/build/ForStatement.js
node --harmony node_modules/async-compiler/compile.js --input test/src/ConditionalExpr.js   --output test/build/ConditionalExpr.js
node --harmony node_modules/async-compiler/compile.js --input test/src/ThrowStatement.js    --output test/build/ThrowStatement.js
node --harmony node_modules/async-compiler/compile.js --input test/src/TryCatchStatement.js   --output test/build/TryCatchStatement.js

node_modules/.bin/mocha --reporter spec "test/build/*.js"
