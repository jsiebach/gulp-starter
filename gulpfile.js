var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

// Server - listed on localhost:8080
gulp.task('webserver', function() {
  connect.server();
});

gulp.task('styles', function() {
  return gulp.src('src/scss/style.scss')
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('dist'))
	.pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('src/js/app.js')
		.pipe(gulp.dest('dist'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(livereload());
});

// Watch
gulp.task('watch', function() {

  livereload.listen();
  // Watch .scss files
  gulp.watch('src/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('img/**/*', ['images']);

  // Watch image files
  gulp.watch('**/*.html', ['html']);

  // Create LiveReload server
  var server = livereload();

});

gulp.task('default', ['webserver','styles', 'scripts', 'html', 'watch']);
