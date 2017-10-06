var gulp = require('gulp');
var prompt = require('gulp-prompt');

var scaffoldUtils = require('./scaffold.utils.js');

var nodeType = null;
var node = null;
var nodeFiles = [];

gulp.task('removePromptNodeType', function() {
  // @TODO: Add directory handling
  return gulp.src('./config/scaffold/remove.js')
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

  // @TODO: Add directory handling
  return gulp.src('./config/scaffold/remove.js')
    .pipe(prompt.prompt(
      {
        type: 'list',
        name: 'node',
        message: 'Which one',
        choices: scaffoldUtils.getAllNodesByNodeType(nodeType)
      }
    ), function(res) {
      node = res.node;
    });
});

gulp.task('removeHandler', ['removePromptModule'], function() {

  // @TODO: Add directory handling
});
