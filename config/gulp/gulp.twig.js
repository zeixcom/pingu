var gulp = require('gulp');


gulp.task('twig', function() {
  'use strict';

  var twig = require('gulp-twig');
  var rename = require('gulp-rename');
  var data = require('gulp-data');
  var path = require('path');
  var fs = require('fs');
  var htmlhint = require('gulp-htmlhint');
  var camelCase = require('lodash/camelCase');
  var merge = require('lodash/merge');
  var tap = require('gulp-tap');

  var utils = require('./gulp.utils');
  var scaffoldUtils = require('../scaffold/scaffold.utils');
  var extensions = require('../twig/extensions');
  var pathsHelper = require('../helpers/paths.helper');
  var isDev = process.env.NODE_ENV === 'development';

  return gulp.src(`${pathsHelper.pages}/**/*.twig`)
    .pipe(htmlhint('./.htmlhintrc'))
    .pipe(htmlhint.failReporter())
    .pipe(data(function(file) {
      var filename = path.basename(file.path, path.extname(file.path));
      var pagePath = path.dirname(file.path);
      var data = merge({}, {
        project: utils.loadYML(pathsHelper.projectConfig),
      }, utils.loadYML(`${pagePath}/${filename}.yml`));

      var components = Object.keys(data.components);

      components.forEach((component) => {
        if (typeof data.components[component].extends !== typeof undefined) {
          var extendingComp = data.components[component].extends;

          data.components[component] = merge(data.components[component], utils.loadYML(`${pathsHelper.components}/${extendingComp}/${extendingComp}.yml`));
        }
      });

      if (data.config.layout) {
        data.layout = utils.loadYML(`${pathsHelper.layouts}/${data.config.layout}/${data.config.layout}.yml`);
      }

      return data;
    }))
    .pipe(twig({
      filters: extensions.FILTERS,
      functions: extensions.FUNCTIONS
    }))
    .pipe(tap (function (file) {
      var content = file.contents.toString('utf8');

      file.contents = Buffer.from(utils.twigReplacePath(content, '"../'));
    }))
    .pipe(rename(
      {dirname: 'templates'}
    ))
    .pipe(
      gulp.dest(isDev ? pathsHelper.tmp : pathsHelper.build)
    );
});
