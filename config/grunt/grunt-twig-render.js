module.exports = function(grunt) {
  'use strict';

  grunt.config('twigRender', {
    dev: {
      files: [
        {
          expand: true,
          cwd: 'src/pages',
          src: ['**/*.twig'],
          dest: 'build',
          ext: '.html',
          data: {}
        },
      ]
    }
  });

  grunt.loadNpmTasks('grunt-twig-render');
};
