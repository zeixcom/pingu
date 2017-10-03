var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./.tmp"
    }
  })
});
