var path = require('path');
var pathsHelper = require('../helpers/paths.helper');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
    ])
  ]
};
