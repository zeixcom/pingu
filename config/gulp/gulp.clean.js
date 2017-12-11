var gulp = require('gulp');


gulp.task('clean', function() {
  var del = require('del');
  var pathsHelper = require('../helpers/paths.helper');

  return del([
    // delete tmp folder
    pathsHelper.tmp,
    pathsHelper.build,
    `${pathsHelper.public}/assets/`,
    pathsHelper.craft.templates
  ]);
});
