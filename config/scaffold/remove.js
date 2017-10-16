var gulp = require('gulp');
var prompt = require('gulp-prompt');
var clean = require('gulp-clean');
var gutil = require('gulp-util');

var scaffoldUtils = require('./scaffold.utils.js');
var pathsHelper = require('../helpers/paths.helper');

var nodeType = null;
var node = null;
var nodeFiles = [];

var removeConfirmation = false;

gulp.task('removePromptNodeType', function() {
  return gulp.src(`${pathsHelper.scaffold}/remove.js`)
    .pipe(prompt.prompt(
      {
        type: 'list',
        name: 'nodeType',
        message: 'What would you like to remove',
        choices: scaffoldUtils.ADDABLE_NODES
      }
    , function(res) {
      nodeType = res.nodeType;
    }));
});

gulp.task('removePromptModule', ['removePromptNodeType'], function() {
  return gulp.src(`${pathsHelper.scaffold}/remove.js`)
    .pipe(prompt.prompt(
      {
        type: 'list',
        name: 'node',
        message: 'Which one',
        choices: scaffoldUtils.getAllNodesByNodeType(nodeType)
      }
    , function(res) {
      node = res.node;
    }));
});

gulp.task('removeHandler', ['removePromptModule'], function() {
  return gulp.src(`${pathsHelper.src}/${nodeType}s/${node}`, {read: false})
    .pipe(prompt.confirm(`Do you really want to remove ${node}`))
    .pipe(clean());
});
