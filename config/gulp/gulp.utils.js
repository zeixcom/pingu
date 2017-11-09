var yaml = require('js-yaml');
var fs = require('fs');
var merge = require('lodash/merge');
var has = require('lodash/has');


var regexDefaultData = /defaultData\[(.*)\]/g;
var pathsHelper = require('../helpers/paths.helper');

exports.checkAndLoadDefaultComponentData = function(data) {
  var keys = Object.keys(data);

  keys.forEach((key) => {
    var paramValue = data[key];

    if (has(paramValue, 'extends')) {
      var extendComp = paramValue.extends;
      var compDefaultData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.components}/${extendComp}/${extendComp}.yml`, 'utf8'));

      var mergedData = merge({}, compDefaultData, paramValue);

      if (has(mergedData, '_options')) {
        mergedData.options = JSON.stringify(mergedData._options);

        delete mergedData._options;
      }

      delete mergedData.extends;

      data[key] = mergedData;
    }
  });

  return data;
}

exports.concatPageDataWithLayoutData = function(data) {
  var layout = data.config.layout;
  var layoutData = yaml.safeLoad(fs.readFileSync(`${pathsHelper.layouts}/${layout}/${layout}.yml`, 'utf8'));
  var mergedData = merge({}, data, layoutData);

  return mergedData;
}

exports.PREVIEW_COMPONENT_REGEX = '<!-- AUTOINSERT COMPONENT -->';
exports.PREVIEW_DESCRIPTION_REGEX = '<!-- AUTOINSERT DESCRIPTION -->';
