var upperFirst = require('lodash/upperFirst');
var uniqueId = require('lodash/uniqueId');
var kebabCase = require('lodash/kebabCase');

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
  }
]
