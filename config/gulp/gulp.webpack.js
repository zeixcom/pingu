var gulp = require('gulp');

gulp.task('webpack', function() {
  var webpack = require('webpack-stream');
  var path = require('path');
  var webpackConfig = process.env.NODE_ENV === 'development' ? require('../webpack/webpack.dev.conf') : require('../webpack/webpack.prod.conf');

  webpackConfig = process.env.NODE_CMS === 'craft' ? require('../webpack/webpack.craft.conf') : webpackConfig;

  var pathsHelper = require('../helpers/paths.helper');
  var destPath = process.env.NODE_ENV === 'development' ? pathsHelper.tmp : pathsHelper.build;

  destPath = process.env.NODE_CMS === 'craft' ? pathsHelper.public : destPath;

  return gulp.src([pathsHelper.src])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(destPath));
});
