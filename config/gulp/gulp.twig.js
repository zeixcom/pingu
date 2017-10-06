var gulp = require('gulp');

gulp.task('twig', function() {
  'use strict';

  var twig = require('gulp-twig');
  var rename = require('gulp-rename');
  var yaml = require('js-yaml');
  var data = require('gulp-data');
  var path = require('path');
  var fs = require('fs');

  var utils = require('./gulp.utils');
  var filters = require('../twig/filters');


  // @TODO: Replace to global path handling ('src/pages/');
  return gulp.src(['./src/pages/**/*.twig'])
    .pipe(data(function(file) {
      var filename = path.basename(file.path, path.extname(file.path));

      // @TODO: Path
      var pageData = yaml.safeLoad(fs.readFileSync(`./src/pages/${filename}/${filename}.yml`, 'utf8'));

      var concatedData = utils.concatPageDataWithLayoutData(pageData);

      var finalizedData = utils.checkAndLoadDefaultComponentData(concatedData);

      return finalizedData;
    }))
    .pipe(twig({
      filters: filters.FILTERS
    }))
    .pipe(rename(
      {dirname: ''}
    ))
    .pipe(
      // @TODO: Replace to global Path Handling
      gulp.dest('./.tmp/')
    );
});
