var gulp = require('gulp');


gulp.task('browser-sync', function() {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var browserSync = require('browser-sync');
  var webpackDevConfig = require('../webpack/webpack.dev.conf');
  var bundler = webpack(webpackDevConfig);
  var pathsHelper = require('../helpers/paths.helper');

  browserSync.init({
    port: 8004,
    ui: {
      port: 8006
    },
    open: 'local',
    server: {
      baseDir: pathsHelper.tmp,
      middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: webpackDevConfig.output.publicPath,
            stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      `${pathsHelper.tmp}/*.html`,
      `${pathsHelper.tmp}/**/*.html`,
      `${pathsHelper.tmp}/**/*.css`
    ]
  })
});
