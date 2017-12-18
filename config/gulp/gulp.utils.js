var yaml = require('js-yaml');
var fs = require('fs');
var merge = require('lodash/merge');
var has = require('lodash/has');


var regexDefaultData = /defaultData\[(.*)\]/g;
var pathsHelper = require('../helpers/paths.helper');
var scaffoldUtils = require('../scaffold/scaffold.utils');

exports.loadYML = function(path) {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
};

exports.loadPreviewDefaultData = function() {
  return {
    project: this.loadYML(pathsHelper.projectConfig),
    nodes: {
      pages: scaffoldUtils.getAllNodesByNodeType('page'),
      components: scaffoldUtils.getAllNodesByNodeType('component'),
    },
  };
}

exports.loadLang = function(lang) {
  return this.loadYML(`${pathsHelper.previewLangFiles}/${lang}.yml`);
}

exports.twigReplacePath = function(content, replace) {
  return content.replace(/("|')\$\//g, replace);
}

exports.PREVIEW_COMPONENT_REGEX = '<!-- AUTOINSERT COMPONENT -->';
exports.PREVIEW_DESCRIPTION_REGEX = '<!-- AUTOINSERT DESCRIPTION -->';
