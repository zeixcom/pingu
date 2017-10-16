var gulp = require('gulp');
var del = require('del');
var pathsHelper = require('../helpers/paths.helper');

gulp.task('clean', function() {
  return del([
    // delete tmp folder
    pathsHelper.tmp
  ]);
});
