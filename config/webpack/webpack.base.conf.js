var path = require('path');
var pathsHelper = require('../helpers/paths.helper');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDev = process.env.NODE_ENV === 'development';

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
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
                includePaths: ['node_modules']
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev ? 'inline' : false
              }
            }
          ]
        }),
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
