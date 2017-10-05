var gulp = require('gulp');
var prompt = require('gulp-prompt');
var gutil = require('gulp-util');
var _ = require('lodash');
var tap = require('gulp-tap');
var path = require('path');
var yaml = require('js-yaml');

var scaffoldUtils = require('./scaffold.utils.js');

var nodeName = {};
var nodeType = '';

gulp.task('addGeneratorPrompts', function() {
  return gulp.src('./config/scaffold/add.js')
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
      nodeName = scaffoldUtils.normalizeNodeName(res.nodeName);
      nodeType = res.nodeType;
    }))
});

gulp.task('addGenerator', ['addGeneratorPrompts'], function() {
  var folder = nodeType.toLowerCase();

  return gulp.src(`./config/scaffold/${folder}/*.{js,twig,yml,scss}`)
    .pipe(tap(function(file, t) {
      var extension = path.extname(file.path);

      switch(extension) {
        case '.yml':



          break;
        default:
          break;
      }
    }))
    .pipe(gulp.dest(`./src/${folder}s/${nodeName.directory}/`))
})

