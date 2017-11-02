var path = require('path');
var pathsHelper = require('../helpers/paths.helper');

module.exports = {
  entry: {
    [pathsHelper.webpackEntries.js]: pathsHelper.mainJs,
    [pathsHelper.webpackEntries.css]: pathsHelper.mainScss,
    [pathsHelper.webpackEntries.previewJs]: pathsHelper.previewMainJs,
    [pathsHelper.webpackEntries.previewCss]: pathsHelper.previewMainScss
  },
  output: {
    filename: '[name]',
  },
  resolve: {
    modules: ['node_modules']
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
