var gulp = require('gulp');
var webpack = require('webpack-stream');
var path = require('path');
var webpackConfig = require('../webpack/webpack.dev.conf');

gulp.task('webpack', function() {
  return gulp.src(['./src'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./.tmp'));
});
