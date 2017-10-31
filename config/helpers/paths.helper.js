'use strict';
var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// config after eject: we're in ./config/
module.exports = {
  tmp: resolveApp('.tmp'),
  build: resolveApp('build'),
  src: resolveApp('src'),
  config: resolveApp('config'),
  scaffold: resolveApp('config/scaffold'),
  components: resolveApp('src/components'),
  pages: resolveApp('src/pages'),
  layouts: resolveApp('src/layouts'),
  assets: resolveApp('src/assets'),
  images: resolveApp('src/assets/images'),
  js: resolveApp('src/assets/js'),
  css: resolveApp('src/assets/css'),
  mainJs: resolveApp('src/assets/js/main.js'),
  mainScss: resolveApp('src/assets/css/main.scss'),
  pinguAppJs: resolveApp('src/assets/js/helpers/PinguApp.js'),
  previewMainScss: resolveApp('src/preview/assets/css/main.scss'),
  previewMainJs: resolveApp('src/preview/assets/js/main.js'),
  relativePaths: {
    js: 'assets/js',
    css: 'assets/js'
  },
  webpackEntries: {
    js: 'assets/js/main.bundle.js',
    css: 'assets/css/styles.css',
    previewJs: 'preview/assets/js/pew.bundle.js',
    previewCss: 'preview/assets/css/pew.css'
  }
};
