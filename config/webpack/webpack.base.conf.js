var path = require('path');
var pathsHelper = require('../helpers/paths.helper');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
  },
  plugins: [
    new BrowserSyncPlugin({
      port: 8004,
      ui: {
        port: 8006
      },
      open: 'local',
      server: {
        baseDir: pathsHelper.tmp,
      },
      files: [
        `${pathsHelper.tmp}/*.html`,
        `${pathsHelper.tmp}/**/*.html`,
        `${pathsHelper.tmp}/**/*.css`,
        `${pathsHelper.tmp}/**/*.js`
      ]
    })
  ]
};
