var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./config/gulp');

gulp.task('default', [
    'twig',
    'favicon',
    'browser-sync'
  ]
);
