// Require node modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),

    paths = {
      'sass': './src/sass/',
      'css': './build/css/'
    };


// Sass task
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.css))
});
