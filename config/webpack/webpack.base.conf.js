var path = require('path');
<<<<<<< HEAD
=======
// var utils = require('./utils.webpack.js');
>>>>>>> PNG-9 add webpack

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

module.exports = {
<<<<<<< HEAD
  // @TODO: Replace to global Path Handling
  entry: ['./src/assets/js/main.js', './src/assets/css/main.scss'],
=======
  entry: ['./src/assets/main.js'],
>>>>>>> PNG-9 add webpack
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
