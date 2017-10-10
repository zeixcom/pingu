var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.config = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    // @TODO: Replace to global Path Handling
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
};

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader];
    if (loader) {
      loaders.push({
	loader: loader + '-loader',
	options: Object.assign({}, loaderOptions, {
	  sourceMap: options.sourceMap
	})
      })
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateLoaders('sass', { indentedSyntax: true }),
  };
}

exports.styleLoaders = function (options) {
  var output = [];
  var loaders = exports.cssLoaders(options);

  console.log(loaders);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }

  console.log(output);
  return output;
}
