var path = require('path');
var baseWebpackConfig = require('./webpack.base.conf');
<<<<<<< HEAD
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
      filename: 'styles.css',
      allChunks: true,
    })
=======
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
>>>>>>> PNG-9 add webpack
  ],
});
