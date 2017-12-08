var gulp = require('gulp');
var runSequence = require('run-sequence');

var requireDir = require('require-dir');
requireDir('./config/gulp');
requireDir('./config/scaffold');

var defaultSequence = function() {
  runSequence(
    'clean',
    ['twig', 'preview'],
    ['watch', 'webpack']
  );
};

var craftSequence = function() {
  runSequence(
    'clean',
    'craft:templates',
    ['watch', 'webpack']
  );
};


gulp.task('set-craft', function() {
  return process.env.NODE_CMS = 'craft';
})

gulp.task('set-prod', function() {
  return process.env.NODE_ENV = 'production';
});

gulp.task('set-dev', function() {
  return process.env.NODE_ENV = 'development';
});

gulp.task('default', ['set-dev'], defaultSequence);
gulp.task('production', ['set-prod'], defaultSequence);
gulp.task('craft', ['set-craft', 'set-dev'], craftSequence);

gulp.task('add',['addGenerator']);
gulp.task('add:craft2', function() {
  runSequence(
    'set-craft',
    'addGenerator',
  );
});

gulp.task('remove', ['removeHandler']);
