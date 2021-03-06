var gulp = require('gulp');

var pathsHelper = require('../helpers/paths.helper');
var utils = require('./gulp.utils');
var camelCase = require('lodash/camelCase');

gulp.task('preview:components', function() {
  'use strict';

  var Twig = require('twig');
  var twig = Twig.twig;
  var tap = require('gulp-tap');
  var rename = require('gulp-rename');
  var path = require('path');
  var fs = require('fs');
  var scaffoldUtils = require('../scaffold/scaffold.utils');
  var replaceExt = require('replace-ext');
  var showdown = require('showdown');
  var escapeHTML = require('escape-html');
  var merge = require('lodash/merge');

  var isDev = process.env.NODE_ENV === 'development';

  return gulp.src(`${pathsHelper.components}/**/*.twig`)
    .pipe(tap(function (file) {
      var filename = path.basename(file.path, path.extname(file.path));
      var projectConfig = utils.loadPreviewDefaultData();
      var twigFileStream = fs.readFileSync(file.path, 'utf8');
      var jsFileStream = fs.readFileSync(replaceExt(file.path, '.js'), 'utf8');
      var scssFileStream = fs.readFileSync(replaceExt(file.path, '.scss'), 'utf8');
      var mdFileStream = fs.readFileSync(replaceExt(file.path, '.md'), 'utf8');
      var yamlFileStream = fs.readFileSync(replaceExt(file.path, '.yml'), 'utf8');
      var mdConverter = new showdown.Converter();
      var previewHTMLTwigged;
      var componentHTMLTwigged;
      var componentsMappedBuffer = [];
      var data = merge({}, utils.loadPreviewDefaultData(), utils.loadYML(replaceExt(file.path, '.yml')));

      data.lang = utils.loadLang(data.project.lang);

      componentsMappedBuffer = data.nodes.components.map((component) => {
        var componentData = utils.loadYML(`${pathsHelper.components}/${component}/${component}.yml`);

        return {
          title: componentData.config.title,
          url: `/${pathsHelper.relativePaths.previewComponent}/${camelCase(component)}.html`,
          active: component === componentData.config.name,
        };
      });

      data.nodes.components = componentsMappedBuffer;

      data.code = {
        twig: escapeHTML(twigFileStream),
        js: jsFileStream,
        scss: scssFileStream,
        yaml: yamlFileStream
      };

      //Generate the html of the component itsself
      componentHTMLTwigged = twig({
        path: file.path,
        async: false
      }).render(data);

      // Generate the finished html
      previewHTMLTwigged = twig({
        path: `${pathsHelper.preview}/component.twig`,
        async: false
      }).render(data);

      // Replace the content
      previewHTMLTwigged = previewHTMLTwigged.replace(new RegExp(utils.PREVIEW_COMPONENT_REGEX, 'g'), componentHTMLTwigged);
      previewHTMLTwigged = previewHTMLTwigged.replace(new RegExp(utils.PREVIEW_DESCRIPTION_REGEX, 'g'), mdConverter.makeHtml(mdFileStream));

      // Write buffer to file
      file.contents = Buffer.from(previewHTMLTwigged);
    }))
    .pipe(tap (function (file) {
      var content = file.contents.toString('utf8');

      file.contents = Buffer.from(utils.twigReplacePath(content, '"../'));
    }))
    .pipe(rename(
      {
        dirname: 'preview',
        extname: '.html',
      }
    ))
    .pipe(gulp.dest(isDev ? pathsHelper.tmp : pathsHelper.build));
});

gulp.task('preview:overview', function() {
  var twig = require('gulp-twig');
  var data = require('gulp-data');
  var merge = require('lodash/merge');
  var tap = require('gulp-tap');

  var extensions = require('../twig/extensions');
  var utils = require('./gulp.utils');

  var isDev = process.env.NODE_ENV === 'development';

  return gulp.src(`${pathsHelper.src}/index.twig`)
    .pipe(data(function(file) {
      var data = utils.loadPreviewDefaultData();
      var componentsBuffer;
      var pagesBuffer;

      data.lang = utils.loadLang(data.project.lang);

      componentsBuffer = data.nodes.components.map((component) => {
        var componentData = utils.loadYML(`${pathsHelper.components}/${component}/${component}.yml`);

        return {
          title: componentData.config.title,
          url: `/${pathsHelper.relativePaths.previewComponent}/${camelCase(component)}.html`,
          description: componentData.config.description,
          status: componentData.config.status,
        };
      });

      data.nodes.components = componentsBuffer;

      pagesBuffer = data.nodes.pages.map((page) => {
        var pageData = utils.loadYML(`${pathsHelper.pages}/${page}/${page}.yml`);

        return {
          title: pageData.config.title,
          url: `/templates/${camelCase(page)}.html`,
          description: pageData.config.description,
          status: pageData.config.status,
          filename: `${page}.twig`,
        };
      });

      data.nodes.pages = pagesBuffer;

      return data;
    }))
    .pipe(twig({
      filters: extensions.FILTERS,
      functions: extensions.FUNCTIONS
    }))
    .pipe(tap (function (file) {
      var content = file.contents.toString('utf8');

      file.contents = Buffer.from(utils.twigReplacePath(content, '"'));
    }))
    .pipe(gulp.dest(isDev ? pathsHelper.tmp : pathsHelper.build));
});

gulp.task('preview', ['preview:components', 'preview:overview']);
