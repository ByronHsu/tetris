const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }],
  },
}