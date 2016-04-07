// tests.webpack.js
var context = require.context('./js', true, /-test\.js?$/);
context.keys().forEach(context);
