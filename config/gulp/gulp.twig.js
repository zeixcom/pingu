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
  var camelCase = require('lodash/camelCase');
  var utils = require('./gulp.utils');
  var scaffoldUtils = require('../scaffold/scaffold.utils');
  var extensions = require('../twig/extensions');
  var pathsHelper = require('../helpers/paths.helper');
  var isDev = process.env.NODE_ENV === 'development';

  return gulp.src([`${pathsHelper.pages}/**/*.twig`, `${pathsHelper.src}/index.twig`])
    .pipe(htmlhint('./.htmlhintrc'))
    .pipe(htmlhint.failReporter())
    .pipe(data(function(file) {
      var filename = path.basename(file.path, path.extname(file.path));
      var configData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.project}/pingu.config.yml`, 'utf8'));

      if (filename !== 'index') {
        var pageData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.pages}/${filename}/${filename}.yml`, 'utf8'));

        var concatedData = utils.concatPageDataWithLayoutData(pageData);
        var finalizedData = utils.checkAndLoadDefaultComponentData(concatedData);

        finalizedData.isDev = isDev;
        finalizedData.project = configData;

        return finalizedData;
      } else {
        var pagesRaw = scaffoldUtils.getAllNodesByNodeType('page');
        var pages = [];

        pagesRaw.forEach((page) => {
          var pageYMLData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.pages}/${page}/${camelCase(page)}.yml`, 'utf8'));
          var pageSpecificData = {};

          pageSpecificData = pageYMLData.config;
          pageSpecificData.fileName = `${camelCase(page)}.twig`
          pageSpecificData.url = `/${camelCase(page)}.html`;

          pages.push(pageSpecificData);
        });

        return { pages, isDev, project: configData };
      }
    }))
    .pipe(twig({
      filters: extensions.FILTERS,
      functions: extensions.FUNCTIONS
    }))
    .pipe(rename(
      {dirname: ''}
    ))
    .pipe(
      gulp.dest(isDev ? pathsHelper.tmp : pathsHelper.build)
    );
});
