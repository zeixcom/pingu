var gulp = require('gulp');
var runSequence = require('run-sequence');

var requireDir = require('require-dir');
requireDir('./config/gulp');
requireDir('./config/scaffold');


gulp.task('default', function() {
  runSequence(
    'clean',
    ['twig', 'preview'],
    'browser-sync',
    ['watch', 'webpack']
  );
});

gulp.task('add', ['addGenerator']);

gulp.task('remove', ['removeHandler']);
