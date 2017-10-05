var gulp = require('gulp');
var prompt = require('gulp-prompt');
var gutil = require('gulp-util');
var scaffoldUtils = require('./scaffold.utils.js');

gulp.task('addGenerator', function() {
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
      var nodeName = res.nodeName.toLowerCase();

      switch(res.nodeType) {
        case 'Page':
          scaffoldUtils.generateNewPage(nodeName);
          break;
        case 'Layout':
          scaffoldUtils.generateNewLayout(nodeName);
          break;
      }
    }))
});

