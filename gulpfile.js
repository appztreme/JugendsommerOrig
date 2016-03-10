var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
	return gulp.src('public/src/*.js')
	       .pipe(jshint())
			   .pipe(jshint.reporter(jshintStylish))
			   .pipe(jshint.reporter('fail'));
});

gulp.task('build', ['lint'], function() {
	gulp.src(['public/src/app.js', 'public/src/*.js', 'public/src/*/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/build'));
});

gulp.task('watch:js', ['build'], function() {
	gulp.watch(['public/src/*.js', 'public/src/*/*.js'], ['build']);
});

gulp.task('dev:server', function() {
	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['public*', 'gulp*']
	});
});

gulp.task('dev', ['watch:js', 'dev:server'], function() {
	console.log('continuous build...');
});
