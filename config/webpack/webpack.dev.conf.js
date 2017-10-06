var path = require('path');
var baseWebpackConfig = require('./webpack.base.conf');
var webpack = require('webpack');
var merge = require('webpack-merge');

module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../../.tmp'),
    publicPath: './.tmp'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
});
