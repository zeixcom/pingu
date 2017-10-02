module.exports = function(grunt) {
  'use strict';
  
  grunt.config('browserSync', {
    dev: {
      bsFiles: {
        src: [
          'build/index.html'
        ]
      },
      options: {
        watchTask: true,
        ghostMode: false,
        server: {
          baseDir: ['build']
        }
      }
    },
    sync: {
      options: {
        watchTask: false,
        server: {
          baseDir: [".tmp", "app"]
        }
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-browser-sync');
};
