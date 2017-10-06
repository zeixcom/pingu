var path = require('path');

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

module.exports = {
  entry: ['./src/assets/js/main.js'],
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
	test: /\.js$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	options: {
	  formatter: require('eslint-formatter-pretty')
	}
      },
      {
	test: /\.js$/,
	loader: 'babel-loader',
	exclude: '/node_modules/',
      },
    ]
  }
};
