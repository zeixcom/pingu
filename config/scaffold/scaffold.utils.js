var _ = require('lodash');

exports.ADDABLE_NODES = ['Component', 'Layout', 'Page'];

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
  }
];

exports.normalizeNodeName = function(nodeName, nodeType) {
  var baseName = _.camelCase(nodeName);

  return {
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
