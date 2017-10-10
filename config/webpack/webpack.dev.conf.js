var path = require('path');
var baseWebpackConfig = require('./webpack.base.conf');
var utils = require('./webpack.utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  output: {
    // @TODO: Replace to global Path Handling
    path: path.resolve(__dirname, '../../.tmp'),
    publicPath: './.tmp'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
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
    new ExtractTextPlugin({ // define where to save the file
      filename: 'styles.css',
      allChunks: true,
    })
  ],
});
