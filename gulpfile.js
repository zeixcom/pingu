var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./config/gulp');
requireDir('./config/scaffold');


gulp.task('default', ['clean',
'twig',
'webpack',
'browser-sync']);

gulp.task('add', ['addGenerator']);

gulp.task('remove', ['removeHandler']);
