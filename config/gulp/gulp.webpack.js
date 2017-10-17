var gulp = require('gulp');

gulp.task('webpack', function() {
  var webpack = require('webpack-stream');
  var path = require('path');
  var webpackConfig = process.env.NODE_ENV === 'development' ? require('../webpack/webpack.dev.conf') : require('../webpack/webpack.prod.conf');
  var pathsHelper = require('../helpers/paths.helper');

  console.log(webpackConfig);

  return gulp.src([pathsHelper.src])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(pathsHelper.tmp));
});
