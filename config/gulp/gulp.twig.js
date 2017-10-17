var gulp = require('gulp');


gulp.task('twig', function() {
  'use strict';

  var twig = require('gulp-twig');
  var rename = require('gulp-rename');
  var yaml = require('js-yaml');
  var data = require('gulp-data');
  var path = require('path');
  var fs = require('fs');
  var htmlhint = require('gulp-htmlhint');

  var utils = require('./gulp.utils');
  var filters = require('../twig/filters');
  var pathsHelper = require('../helpers/paths.helper');

  return gulp.src([`${pathsHelper.pages}/**/*.twig`])
    .pipe(htmlhint('./.htmlhintrc'))
    .pipe(htmlhint.failReporter())
    .pipe(data(function(file) {
      var filename = path.basename(file.path, path.extname(file.path));

      var pageData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.pages}/${filename}/${filename}.yml`, 'utf8'));

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
      gulp.dest(pathsHelper.tmp)
    );
});
