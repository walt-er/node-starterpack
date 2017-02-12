
// Dependencies
var gulp    = require('gulp'),
    babel   = require('gulp-babel'),
	concat  = require('gulp-concat'),
    debug   = require('gulp-debug'),
    jshint  = require('gulp-jshint'),
	sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify');

// Function to log errors and continue
function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
};

// Ignore compiled JS; lint, uglify and concat all other JS
gulp.task('lint-uglify-concat-js', function () {

    gulp.src([
            './public_html/js/*',
            '!./public_html/js/app.min.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(babel())
        .pipe(uglify()) 
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./public_html/js'));
});

// Compile all SASS into one styleheet
gulp.task('compile-sass', function() {

	gulp.src('./public_html/css/main.scss')
    	.pipe(debug())
        .on('error', errorHandler)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public_html/css'));
});

// Run tasks on file change
gulp.task('watch', function() {

    gulp.watch('./public_html/css/*.scss', ['compile-sass']);
    gulp.watch('./public_html/js/*.js', ['lint-uglify-concat-js']);

});

// Default: run all tasks and then wait for changes
gulp.task('default', [
	'lint-uglify-concat-js',
	'compile-sass',
    'watch',
]);