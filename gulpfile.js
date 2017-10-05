var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./config/gulp');

var add = require('./config/scaffold/add.js');

gulp.task('default', [
    'twig',
    'browser-sync'
  ]
);

gulp.task('add', [
  'addGenerator'
]);
