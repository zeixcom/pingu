var gulp = require('gulp');

gulp.task('watch', function() {
  var pathsHelper = require('../helpers/paths.helper');

  gulp.watch([`${pathsHelper.src}/**/*.twig`, `${pathsHelper.src}/**/*.yml`], ['twig', 'preview']);
});
