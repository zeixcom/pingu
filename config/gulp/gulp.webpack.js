var gulp = require('gulp');

gulp.task('webpack', function() {
  var webpack = require('webpack-stream');
  var path = require('path');
  var webpackConfig = require('../webpack/webpack.dev.conf');
  var pathsHelper = require('../helpers/paths.helper');

  return gulp.src([pathsHelper.src])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(pathsHelper.tmp));
});
