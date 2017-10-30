var path = require('path');
var pathsHelper = require('../helpers/paths.helper');
var baseWebpackConfig = require('./webpack.base.conf');
var utils = require('./webpack.utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  watch: true,
  devtool: 'source-map', // needs to be source-map for the sass files
  output: {
    path: pathsHelper.tmp,
    publicPath: pathsHelper.tmp
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline'
              }
            }
          ]
        }),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({ syntax: 'scss' }),
    new FriendlyErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name]',
      allChunks: true,
    })
  ],
});
