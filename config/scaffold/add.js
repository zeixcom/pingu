var gulp = require('gulp');
var prompt = require('gulp-prompt');
var tap = require('gulp-tap');
var path = require('path');
var fs = require('fs-extra');
var rename = require('gulp-rename');

var scaffoldUtils = require('./scaffold.utils.js');
var pathsHelper = require('../helpers/paths.helper');

var nodeName = {};
var nodeType = '';

gulp.task('addGeneratorPrompts', function() {
  return gulp.src(`${pathsHelper.scaffold}/add.js`)
  .pipe(prompt.prompt([{
      type: 'list',
      name: 'nodeType',
      message: 'What would you like to add',
      choices: scaffoldUtils.ADDABLE_NODES
    },{
      type: 'input',
      name: 'nodeName',
      message: 'Name?'
    }], function(res) {
      nodeName = scaffoldUtils.normalizeNodeName(res.nodeName, res.nodeType);
      nodeType = res.nodeType;
    }));
});

gulp.task('addGenerator', ['addGeneratorPrompts'], function() {
  var folder = nodeType.toLowerCase();

  return gulp.src(`${pathsHelper.scaffold}/${folder}/*.{js,twig,yml,scss}`)
    .pipe(tap(function(file, t) {
      var extension = path.extname(file.path);

      scaffoldUtils.FIND_REPLACES.forEach(function(replaceItem) {
        var regex = new RegExp(`{% ${replaceItem.label} %}`, 'g');

        file.contents = Buffer.from(file.contents.toString().replace(regex, nodeName[replaceItem.value]));
      });
    }))
    .pipe(rename({
      basename: nodeName.file
    }))
    .pipe(gulp.dest(`${pathsHelper.src}//${folder}s/${nodeName.directory}/`));
})

