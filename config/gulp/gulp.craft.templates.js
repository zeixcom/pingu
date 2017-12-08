var gulp = require('gulp');
var tap = require('gulp-tap');

gulp.task('craft:templates', function() {
  var pathsHelper = require('../helpers/paths.helper');

  return gulp.src(`${pathsHelper.src}/**/*.html`)
    .pipe(gulp.dest(pathsHelper.craft.templates));
})
