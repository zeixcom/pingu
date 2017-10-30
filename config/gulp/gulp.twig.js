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
  var _ = require('lodash');

  var utils = require('./gulp.utils');
  var scaffoldUtils = require('../scaffold/scaffold.utils');
  var filters = require('../twig/filters');
  var pathsHelper = require('../helpers/paths.helper');
  var isDev = process.env.NODE_ENV === 'development';

  return gulp.src([`${pathsHelper.pages}/**/*.twig`, `${pathsHelper.src}/index.twig`])
    .pipe(htmlhint('./.htmlhintrc'))
    .pipe(htmlhint.failReporter())
    .pipe(data(function(file) {
      var filename = path.basename(file.path, path.extname(file.path));

      if (filename !== 'index') {
        var pageData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.pages}/${filename}/${filename}.yml`, 'utf8'));
        var concatedData = utils.concatPageDataWithLayoutData(pageData);
        var finalizedData = utils.checkAndLoadDefaultComponentData(concatedData);

        return finalizedData;
      } else {
        var pagesRaw = scaffoldUtils.getAllNodesByNodeType('page');
        var pages = [];

        pagesRaw.forEach((page) => {
          var pageYMLData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.pages}/${page}/${_.camelCase(page)}.yml`, 'utf8'));
          var pageSpecificData = {};

          pageSpecificData = pageYMLData.config;
          pageSpecificData.fileName = `${_.camelCase(page)}.twig`
          pageSpecificData.url = `/${_.camelCase(page)}.html`;

          pages.push(pageSpecificData);
        });

        return { pages };
      }
    }))
    .pipe(twig({
      filters: filters.FILTERS
    }))
    .pipe(rename(
      {dirname: ''}
    ))
    .pipe(
      gulp.dest(isDev ? pathsHelper.tmp : pathsHelper.build)
    );
});
