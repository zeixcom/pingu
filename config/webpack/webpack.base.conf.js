var path = require('path');

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

module.exports = {
  // @TODO: Replace to global Path Handling
  entry: ['./src/assets/js/main.js', './src/assets/css/main.scss'],
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
