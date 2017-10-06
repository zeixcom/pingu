var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./config/gulp');
requireDir('./config/scaffold');

gulp.task('default', [
    'twig',
    'browser-sync'
  ]
);

gulp.task('add', [
  'addGenerator'
]);
