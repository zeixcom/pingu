var gulp = require('gulp');
var prompt = require('gulp-prompt');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var path = require('path');
var fs = require('fs-extra');

var scaffoldUtils = require('./scaffold.utils.js');
var pathsHelper = require('../helpers/paths.helper');

var nodeType = null;
var node = null;
var nodeFiles = [];

var removeConfirmation = false;

gulp.task('removePrompts', function() {
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
      node = scaffoldUtils.normalizeNodeName(res.node);

    }));
});


gulp.task('removeHandler', ['removePrompts'], function() {
  return gulp.src(`${pathsHelper.src}/${nodeType}s/${node.directory}`, {read: false})
    .pipe(prompt.confirm(`Do you really want to remove ${node.directory}`))
    .pipe(tap(function () {
      var hasSCSS = fs.existsSync(`${pathsHelper.src}/${nodeType}s/${node.directory}/${node.file}.scss`);
      var hasJS = fs.existsSync(`${pathsHelper.src}/${nodeType}s/${node.directory}/${node.file}.js`);


      if (hasSCSS) {
        var scssFile = fs.readFileSync(pathsHelper.mainScss, 'utf8');

        var scssResult = scssFile.replace(new RegExp(`@import .*${nodeType.toLowerCase()}s\/${node.directory}\/${node.file}';\n`, 'g'), '');

        fs.writeFile(pathsHelper.mainScss, scssResult);
      }

      if (hasJS) {
        var pinguJsFile = fs.readFileSync(pathsHelper.pinguAppJs);

        var jsResult = pinguJsFile.replace(
          new RegExp(`import ${node.component} .*${nodeType.toLowerCase()}s\/${node.directory}\/${node.file}';\n`, 'g'),
          ''
        );

        var jsResult2 = jsResult.replace(
          new RegExp(`this\.components\.${node.component} = ${node.component};\n`, 'g'),
          ''
        );

        fs.writeFile(pathsHelper.pinguAppJs, jsResult2);
      }
    }))
    .pipe(clean());
});
