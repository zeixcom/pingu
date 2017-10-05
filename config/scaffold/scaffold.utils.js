var fs = require('fs-extra');
var path = require('path');
var yaml = require('js-yaml');
var _ = require('lodash');

exports.ADDABLE_NODES = ['Component', 'Layout', 'Page']

exports.FIND_REPLACES = [
  {
    label: 'NODE_NAME',
    value: 'fileAndComponent'
  },
  {
    label: 'CLASS_NAME',
    value: 'classWithPrefix'
  }
];

exports.normalizeNodeName = function(nodeName, nodeType) {
  var baseName = _.camelCase(nodeName);

  return {
    directory: _.capitalize(baseName),
    class: _.kebabCase(baseName),
    fileAndComponent: baseName,
    classWithPrefix: this.getNodeTypePrefix(nodeType) + _.kebabCase(baseName),
  };
};

exports.getNodeTypePrefix = function(nodeType) {
  switch (nodeType) {
    case 'Layout':
      return 'l_';
    case 'Page':
      return 'p_';
    default:
      return '';
  }
}

