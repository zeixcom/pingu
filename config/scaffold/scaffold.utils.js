var fs = require('fs-extra');
var path = require('path');
var yaml = require('js-yaml');
var _ = require('lodash');

exports.ADDABLE_NODES = ['Component', 'Layout', 'Page']

exports.normalizeNodeName = function(nodeName) {
  var baseName = _.camelCase(nodeName);

  return {
    directory: _.capitalize(baseName),
    class: _.kebabCase(baseName),
    fileAndComponent: baseName,
  };
};


/**
 * Generating a new page from scaffold templates
 */
exports.generateNewPage = function(nodeName) {
  const directory = `./src/pages/${this.getDirectoryName(nodeName)}/`;

  const yamlTpl = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './page/page.yml'), 'utf8'));

  yamlTpl.config.title = nodeName;

  fs.openSync(`${directory}${nodeName}.yml`, 'w');

  fs.writeFile(`${directory}${nodeName}.yml`, yaml.safeDump(yamlTpl));
  fs.copySync(path.resolve(__dirname, './page/page.twig'), `${directory}${nodeName}.twig`);
}

/**
 * Generating a new layout, from scaffold templates
 */
exports.generateNewLayout = function(nodeName) {
  const directory = `./src/layouts/${this.getDirectoryName(nodeName)}/`;

  fs.copySync(path.resolve(__dirname, './layout/layout.twig'), `${directory}${nodeName}.twig`);
  fs.copySync(path.resolve(__dirname, './layout/layout.yml'), `${directory}${nodeName}.yml`);
}
