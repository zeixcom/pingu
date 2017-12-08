var path = require('path');
var pathsHelper = require('../helpers/paths.helper');
var baseWebpackConfig = require('./webpack.base.conf');
var utils = require('./webpack.utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge.strategy({ entry: 'replace' })(baseWebpackConfig, {
  watch: true,
  devtool: 'source-map', // needs to be source-map for the sass files
  output: {
    path: pathsHelper.tmp,
    publicPath: '/',
  },
  entry: {
    [pathsHelper.webpackEntries.js]: pathsHelper.mainJs,
    [pathsHelper.webpackEntries.css]: pathsHelper.mainScss
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({ syntax: 'scss' }),
    new ExtractTextPlugin({
      filename: '[name]',
      allChunks: true,
    })
  ],
});
