var upperFirst = require('lodash/upperFirst');
var uniqueId = require('lodash/uniqueId');
var kebabCase = require('lodash/kebabCase');
var fs = require('fs');

var pathsHelper = require('../helpers/paths.helper');

exports.FILTERS = [
  {
    name: "ucFirst",
    func: function (string) {
      return upperFirst(string);
    }
  }
];

exports.FUNCTIONS = [
  {
    name: "uuid",
    func: function(name) {
      return uniqueId(kebabCase(name));
    }
  },
  {
    name: 'icon',
    func: function(name, className) {
      var svg = fs.readFileSync(`${pathsHelper.icon}/${name}.svg`, 'utf8');

      if (typeof className !== typeof undefined) {
        svg = svg.replace('<svg', `<svg class="${className}"`)
      }

      return svg;
    }
  }
]
