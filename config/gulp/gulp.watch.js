var gulp = require('gulp');
var isCraft = process.env.NODE_CMS === 'craft';

gulp.task('watch', function() {
  var pathsHelper = require('../helpers/paths.helper');

  // @TODO: Remove preview from watch for final version
  if (isCraft) {
    gulp.watch([`${pathsHelper.src}/**/*.html`], ['craft:templates']);
  } else {
    gulp.watch([`${pathsHelper.src}/**/*.twig`, `${pathsHelper.src}/**/*.yml`], ['twig', 'preview']);
  }
});
