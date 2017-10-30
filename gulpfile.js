var gulp = require('gulp');
var runSequence = require('run-sequence');

var requireDir = require('require-dir');
requireDir('./config/gulp');
requireDir('./config/scaffold');


gulp.task('default', function() {
  runSequence(
    'clean',
    'twig',
    'browser-sync',
    'webpack'
  );
});

gulp.task('add', ['addGenerator']);

gulp.task('remove', ['removeHandler']);
