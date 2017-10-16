var gulp = require('gulp');
var webpack = require('webpack-stream');
var path = require('path');
var webpackConfig = require('../webpack/webpack.dev.conf');
var pathsHelper = require('../helpers/paths.helper');

gulp.task('webpack', function() {
  return gulp.src([pathsHelper.src])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(pathsHelper.tmp));
});
