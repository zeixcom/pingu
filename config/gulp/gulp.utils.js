var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash');

var regexDefaultData = /defaultData\[(.*)\]/g;
var pathsHelper = require('../helpers/paths.helper');

exports.checkAndLoadDefaultComponentData = function(data) {

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var paramValue = data[key];
      var defaultDataMatch = regexDefaultData.exec(paramValue);

      if (defaultDataMatch !== null) {
        var compName =  defaultDataMatch[defaultDataMatch.length - 1];
        var compDataFile = yaml.safeLoad(fs.readFileSync(`${pathsHelper.components}/${compName}/${compName}.yml`, 'utf8'));

        data[key] = compDataFile;
      }
    }
  }

  return data;
}

exports.concatPageDataWithLayoutData = function(data) {
  var layout = data.config.layout;
  var layoutData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.layouts}/${layout}/${layout}.yml`, 'utf8'));
  var mergedData = _.merge({}, data, layoutData);

  return mergedData;
}

exports.PREVIEW_COMPONENT_REGEX = '<!-- AUTOINSERT COMPONENT -->';
exports.PREVIEW_DESCRIPTION_REGEX = '<!-- AUTOINSERT DESCRIPTION -->';
