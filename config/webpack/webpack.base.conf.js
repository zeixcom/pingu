var path = require('path');
var pathsHelper = require('../helpers/paths.helper');

module.exports = {
  entry: [pathsHelper.mainJs, pathsHelper.mainScss],
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-formatter-pretty')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ]
  }
};
