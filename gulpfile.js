var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./config/gulp');

gulp.task('default', [
  'browser-sync'
], function() {
  gulp.watch('src/pages/**/*.twig', []);
});
