var gulp = require('gulp');

gulp.task('watch', function() {
  var pathsHelper = require('../helpers/paths.helper');

  // @TODO: Remove preview from watch for final version
  gulp.watch([`${pathsHelper.src}/**/*.twig`, `${pathsHelper.src}/**/*.yml`], ['twig', 'preview']);
});
