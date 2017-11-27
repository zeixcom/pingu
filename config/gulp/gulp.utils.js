var yaml = require('js-yaml');
var fs = require('fs');
var merge = require('lodash/merge');
var has = require('lodash/has');


var regexDefaultData = /defaultData\[(.*)\]/g;
var pathsHelper = require('../helpers/paths.helper');

exports.loadYML = function(path) {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
};

exports.PREVIEW_COMPONENT_REGEX = '<!-- AUTOINSERT COMPONENT -->';
exports.PREVIEW_DESCRIPTION_REGEX = '<!-- AUTOINSERT DESCRIPTION -->';
