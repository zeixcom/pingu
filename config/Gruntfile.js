module.exports = function(grunt) {
  grunt.file.setBase('../');

  grunt.loadTasks('./config/grunt');
    
  grunt.registerTask('dev',
    'Dev environment of pingu',
    [
      'twigRender:dev',
      'browserSync:dev',
      'watch'
    ]);
  
  grunt.registerTask('default', ['dev']);
};
