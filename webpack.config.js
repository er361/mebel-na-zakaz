'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Serve the Relay app
exports.default = (0, _webpack2.default)({
  entry: _path2.default.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: ['./build/babelRelayPlugin']
      },
      test: /\.js$/
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  },
  output: { filename: 'app.js', path: '/' }
});
