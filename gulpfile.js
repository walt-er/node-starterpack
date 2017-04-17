
// Dependencies
var gulp    = require('gulp'),
	debug   = require('gulp-debug'),
	sass    = require('gulp-sass'),
	uglify  = require('gulp-uglify'),
	rename  = require('gulp-rename'),
	webpack  = require('webpack'),
	webpackStream  = require('webpack-stream'),
	webpackConfig = require('./webpack.config.js');

// Function to log errors and continue
function errorHandler (error) {
	console.log(error.toString());
	this.emit('end');
};

// Lint and bundle with Webpack
gulp.task('js:webpack', function () {

	return gulp.src('./public_html/app/*')
		.pipe(webpackStream(webpackConfig, webpack))
		.on('error', errorHandler)
		.pipe(gulp.dest('./public_html/dist'));;

});

// Ugligfy JS for production 
gulp.task('js:uglify', function () {

	return gulp.src(['./public_html/dist/app.js'])
		.pipe(uglify())
		.on('error', errorHandler)
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./public_html/dist'));

});

// Compile all SASS into one styleheet
gulp.task('sass:compile', function() {

	return gulp.src('./public_html/css/main.scss')
		.pipe(debug())
		.on('error', errorHandler)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./public_html/css'));

});

// Run tasks on file change (just for SCSS, Webpack does its own watch task)
gulp.task('watch', function() {

	gulp.watch('./public_html/css/*.scss', ['sass:compile']);
	gulp.watch('./public_html/app/*.js', ['js:webpack']);

});

// Default: run all tasks and then wait for changes
gulp.task('default', [
	'js:webpack',
	'js:uglify',
	'sass:compile',
	'watch'
]);