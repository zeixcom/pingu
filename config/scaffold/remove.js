var gulp = require('gulp');
var prompt = require('gulp-prompt');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var path = require('path');

var scaffoldUtils = require('./scaffold.utils.js');
var pathsHelper = require('../helpers/paths.helper');

var nodeType = null;
var node = null;
var nodeFiles = [];

var removeConfirmation = false;

gulp.task('removePrompts', function() {
  // @TODO: Add directory handling
  return gulp.src(`${pathsHelper.scaffold}/remove.js`)
    .pipe(prompt.prompt([
      {
        type: 'list',
        name: 'nodeType',
        message: 'What would you like to remove',
        choices: scaffoldUtils.ADDABLE_NODES
      },
      {
        type: 'list',
        name: 'node',
        message: 'Which one',
        choices: function (currSession) {
          return scaffoldUtils.getAllNodesByNodeType(currSession.nodeType);
        },
      }
    ], function(res) {
      nodeType = res.nodeType;
      node = res.node;
    }));
});


gulp.task('removeHandler', ['removePrompts'], function() {
  return gulp.src(`${pathsHelper.src}/${nodeType}s/${node}`, {read: false})
    .pipe(prompt.confirm(`Do you really want to remove ${node}`))
    .pipe(tap(function () {
      console.log('hello');
    }))
    .pipe(clean());
});
