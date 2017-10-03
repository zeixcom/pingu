var gulp = require('gulp');

gulp.task('twig', function() {
  'use strict';

  var twig = require('gulp-twig');
  var rename = require('gulp-rename');
  var yaml = require('js-yaml');
  var data = require('gulp-data');
  var path = require('path');
  var fs = require('fs');

  // @TODO: Replace to global path handling ('src/pages/');
  return gulp.src(['./src/pages/**/*.twig'])
    .pipe(data(function(file) {
      var filename = path.basename(file.path, path.extname(file.path));

      return yaml.safeLoad(fs.readFileSync(`./src/pages/${filename.toUpperCase()}/${filename}.yml`, 'utf8'));
    }))
    .pipe(twig({}))
    .pipe(rename(
      {dirname: ''}
    ))
    .pipe(
      // @TODO: Replace to global Path Handling
      gulp.dest('./.tmp/')
    );
});
