var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var browserSync = require('browser-sync');
var webpackConfig = require('../webpack/webpack.dev.conf');
var bundler = webpack(webpackConfig);

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./.tmp",
      middleware: [
	webpackDevMiddleware(bundler, {
	    publicPath: webpackConfig.output.publicPath,
	    stats: { colors: true }
	}),
	webpackHotMiddleware(bundler)
      ]
    }
  })
});
