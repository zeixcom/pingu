var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var pathsHelper = require('../helpers/paths.helper');

exports.ADDABLE_NODES = ['Component', 'Layout', 'Page'];

exports.SCSS_PLACEHOLDER_DELIMITERS = [
  '/* insert new ',
  ' */'
];

exports.JS_COMPONENT_STRING = 'addcomponenttothis';
exports.JS_AUTOIMPORT_STRING = 'autoimportcomponent';

exports.JS_COMPONENT_REGEX = new RegExp(`\/\/ ${this.JS_COMPONENT_STRING}`, 'g');

exports.JS_AUTOIMPORT_REGEX = new RegExp(`\/\/ ${this.JS_AUTOIMPORT_STRING}`, 'g');

exports.FIND_REPLACES = [
  {
    label: 'NODE_NAME',
    value: 'file'
  },
  {
    label: 'CLASS_NAME',
    value: 'classWithPrefix'
  },
  {
    label: 'COMP_NAME',
    value: 'component',
  },
  {
    label: 'COMP_TITLE',
    value: 'title',
  }
];

exports.NON_NODE_DIRECTORIES = [
  '.DS_Store'
];

exports.normalizeNodeName = function(nodeName, nodeType) {
  var baseName = _.camelCase(nodeName);

  return {
    title: nodeName,
    directory: _.upperFirst(baseName),
    component: _.upperFirst(baseName),
    class: _.kebabCase(baseName),
    file: baseName,
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
  };
};

exports.getAllNodesByNodeType = function(nodeType) {

  var directoryPath = `${pathsHelper.src}/${nodeType.toLowerCase()}s/`;

  if (fs.existsSync(directoryPath)) {
    var isDirectory = fs.lstatSync(directoryPath).isDirectory();
    var that = this;

    var directories = [];

    if (isDirectory) {
      directories = fs.readdirSync(directoryPath).filter(function (dir) {
        var isInNotANode = that.NON_NODE_DIRECTORIES.indexOf(dir);

        var isADirectory = fs.lstatSync(path.join(directoryPath, dir)).isDirectory();

        return isInNotANode === -1 && isADirectory;
      });

    }

    return directories;
  }

  return [];
};

exports.getFileTypesToPipe = function(hasJS, hasSCSS, isCraft) {
  var fileTypes = isCraft ? ['html'] : ['twig', 'yml', 'md'];

  hasJS ? fileTypes.push('js') : null;
  hasSCSS ? fileTypes.push('scss') : null;

  return fileTypes.join();
};

exports.isNodeAlreadyExisting = function(nodeType, nodeName) {
  var nodesByNodeType = this.getAllNodesByNodeType(nodeType);
  var nodeNameNormalized = _.upperFirst(_.camelCase(nodeName));

  return nodesByNodeType.indexOf(nodeNameNormalized) === -1;
};

exports.isCraftPath = function(isCraft) {
  return isCraft ? '/craft' : '';
}
