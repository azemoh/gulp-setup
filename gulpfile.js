// Require node modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ts = require('gulp-typescript'),

    paths = {
      'sass': './src/sass/',
      'css': './build/css/',
      'scripts': './src/scripts/',
      'js': './build/js/',
      'site': './build/'
    };


// Sass task: Compile SCSS files to CSS
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});


// Browser sync task: to launch a server and auto-reload
gulp.task('browser-sync', ['sass', 'scripts'], function () {
  browserSync({ server: {
      baseDir: paths.site
    }});
});


// Scripts task: Compile TypeScript files to js
gulp.task('scripts', ['reload'], function () {
  return gulp.src(paths.scripts + '*.ts')
    .pipe(ts())
    .pipe(gulp.dest(paths.js));
});


// Reload browser
gulp.task('reload', function () {
  browserSync.reload();
});


// Watch task: watch for file changes and
// trigger appropriate task.
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']); // Watch sass files
  gulp.watch(paths.scripts + '**/*.ts', ['scripts']); // Watch .ts files
  gulp.watch(paths.site + '**/*.html', ['reload']); // Watch html files
});


// Default task: Run `gulp` to launch browser-sync
//and watch for file changes.
gulp.task('default', ['browser-sync', 'watch']);
