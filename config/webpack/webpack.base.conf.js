var path = require('path');
var pathsHelper = require('../helpers/paths.helper');
var CopyWebpackPlugin = require('copy-webpack-plugin');
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
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          context: pathsHelper.src,
          name : '[path][hash].[ext]'
        }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: pathsHelper.assets,
        to: pathsHelper.assetsPath('assets'),
        ignore: ['css/*', 'js/*', 'fonts/*']
      },
      {
        from: pathsHelper.previewAssets,
        to: pathsHelper.assetsPath('preview/assets'),
        ignore: ['css/*', 'js/*', 'fonts/*']
      }
    ]),
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
