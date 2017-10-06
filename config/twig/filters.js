var _ = require('lodash');

exports.FILTERS = [
  {
    name: "ucFirst",
    func: function (string) {
      return _.upperFirst(string);
    }
  }
];
