var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var browserSync = require('browser-sync');
var webpackDevConfig = require('../webpack/webpack.dev.conf');
var bundler = webpack(webpackDevConfig);

gulp.task('browser-sync', function() {
  browserSync.init({
    port: 8004,
    ui: {
      port: 8006
    },
    open: 'local',
    server: {
      baseDir: "./.tmp",
      middleware: [
	webpackDevMiddleware(bundler, {
	    publicPath: webpackDevConfig.output.publicPath,
	    stats: { colors: true }
	}),
	webpackHotMiddleware(bundler)
      ]
    }
  })
});
