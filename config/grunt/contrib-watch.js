module.exports = function(grunt) {
  'use strict';

  grunt.config('watch', {
    html: {
      files: ['.tmp/*.html'],
      tasks: ['newer:htmlhint:dev']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
