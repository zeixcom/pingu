var gulp = require('gulp');
var prompt = require('gulp-prompt');
var tap = require('gulp-tap');
var path = require('path');
var fs = require('fs-extra');
var rename = require('gulp-rename');
var _ = require('lodash');
var { parse, stringify } = require('scss-parser');

var scaffoldUtils = require('./scaffold.utils.js');
var pathsHelper = require('../helpers/paths.helper');

var nodeName = {};
var nodeType = '';
var hasJS = true;
var hasSCSS = true;

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
    },{
      type: 'confirm',
      name: 'hasJS',
      message: 'Do you need a JavaScript file?',
      when: function(currHash) {
        return currHash.nodeType === 'Component';
      }
    },{
      type: 'confirm',
      name: 'hasSCSS',
      message: 'Do you need a SCSS file?',
      when: function(currHash) {
        return currHash.nodeType === 'Page';
      }
    }], function(res) {
      nodeName = scaffoldUtils.normalizeNodeName(res.nodeName, res.nodeType);
      nodeType = res.nodeType;

      if (_.has(res, 'hasJS')) {
        hasJS = res.hasJS;
      }

      if (_.has(res, 'hasSCSS')) {
        hasSCSS = res.hasSCSS;
      }
    }));
});

gulp.task('addGenerator', ['addGeneratorPrompts'], function() {
  var folder = nodeType.toLowerCase();
  var fileTypes2Pipe = scaffoldUtils.getFileTypesToPipe(hasJS, hasSCSS);

  return gulp.src(`${pathsHelper.scaffold}/${folder}/*.{js,twig,yml,scss}`)
    .pipe(tap(function(file, t) {
      var extension = path.extname(file.path);

      scaffoldUtils.FIND_REPLACES.forEach(function(replaceItem) {
        var regex = new RegExp(`{% ${replaceItem.label} %}`, 'g');

        file.contents = Buffer.from(file.contents.toString().replace(regex, nodeName[replaceItem.value]));
      });

      switch(extension) {
        case '.scss':

          var fileRead = fs.readFileSync(pathsHelper.mainScss, 'utf8');

          var ast = parse(fileRead);
          var newAst = parse(`@import '../../${folder}s/${nodeName.directory}/${nodeName.file}';`).value[0];
          var spaceAst = parse('\n').value[0];

          var indexPlaceholder = _.findIndex(ast.value, {
            value: ` ${nodeType.toUpperCase()}_PLACEHOLDER `
          });

          ast.value.splice(indexPlaceholder, 0, spaceAst);
          ast.value.splice(indexPlaceholder, 0, newAst);

          fs.writeFile(pathsHelper.mainScss, stringify(ast));

          break;

        case '.js':

          var fileRead = fs.readFileSync(pathsHelper.pinguAppJs, 'utf8');

          var result = fileRead.replace(scaffoldUtils.JS_AUTOIMPORT_REGEX, [
            `import ${nodeName.component} from '../../../${folder}s/${nodeName.directory}/${nodeName.file}';`,
            '\n',
            '// autoimportcomponent',
          ].join(''));

          fs.writeFile(pathsHelper.pinguAppJs, result);

          break;

        default:
          break;
      }
    }))
    .pipe(rename({
      basename: nodeName.file
    }))
    .pipe(gulp.dest(`${pathsHelper.src}//${folder}s/${nodeName.directory}/`));
})

