var gulp = require('gulp');

gulp.task('preview', function() {
  'use strict';

  var Twig = require('twig');
  var twig = Twig.twig;
  var tap = require('gulp-tap');
  var rename = require('gulp-rename');
  var yaml = require('js-yaml');
  var path = require('path');
  var fs = require('fs-extra');

  var pathsHelper = require('../helpers/paths.helper');
  var isDev = process.env.NODE_ENV === 'development';

  return gulp.src(`${pathsHelper.components}/**/*.yml`)
    .pipe(tap(function (file) {
      var filename = path.basename(file.path, path.extname(file.path));
      var pageData = yaml.safeLoad(fs.readFileSync(file.path));
      var html;
      var data;

      data = {
        general: pageData.config
      };

      html = twig({
        path: `${pathsHelper.preview}/component.twig`,
        async: false
      }).render(data);

      file.contents = Buffer.from(html);
    }))
    .pipe(rename(
      {
        dirname: 'preview/components',
        extname: '.html',
      }
    ))
    .pipe(gulp.dest(isDev ? pathsHelper.tmp : pathsHelper.build));
});
