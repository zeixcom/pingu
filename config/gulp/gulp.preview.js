var gulp = require('gulp');

gulp.task('preview', function() {
  'use strict';

  var Twig = require('twig');
  var twig = Twig.twig;
  var tap = require('gulp-tap');
  var rename = require('gulp-rename');
  var yaml = require('js-yaml');
  var path = require('path');
  var fs = require('fs');
  var replaceExt = require('replace-ext');
  var showdown = require('showdown');
  var escape = require('escape-html');

  var pathsHelper = require('../helpers/paths.helper');
  var isDev = process.env.NODE_ENV === 'development';
  var utils = require('./gulp.utils');

  return gulp.src(`${pathsHelper.components}/**/*.twig`)
    .pipe(tap(function (file) {
      var filename = path.basename(file.path, path.extname(file.path));
      var projectConfig = yaml.safeLoad(fs.readFileSync(`${pathsHelper.project}/pingu.config.yml`, 'utf8'));
      var yamlCode = fs.readFileSync(replaceExt(file.path, '.yml'), 'utf8');
      var componentData = yaml.safeLoad(yamlCode);
      var twigCode = fs.readFileSync(file.path, 'utf8');
      var jsCode = fs.readFileSync(replaceExt(file.path, '.js'), 'utf8');
      var scssCode = fs.readFileSync(replaceExt(file.path, '.scss'), 'utf8');
      var markdown = fs.readFileSync(replaceExt(file.path, '.md'), 'utf8');
      var converter = new showdown.Converter();
      var html;
      var compHtml;
      var data;

      data = componentData;

      data.code = {
        twig: escape(twigCode),
        js: jsCode,
        scss: scssCode,
        yaml: yamlCode
      };

      data.project = projectConfig;

      //Generate the html of the component itsself
      compHtml = twig({
        path: file.path,
        async: false
      }).render(data);

      // Generate the finished html
      html = twig({
        path: `${pathsHelper.preview}/component.twig`,
        async: false
      }).render(data);

      // Replace the content
      html = html.replace(new RegExp(utils.PREVIEW_COMPONENT_REGEX, 'g'), compHtml);
      html = html.replace(new RegExp(utils.PREVIEW_DESCRIPTION_REGEX, 'g'), converter.makeHtml(markdown));

      // Write buffer to file
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
