'use strict';

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass');

var prodFiles = [
	'./app/*.html',
	'./app/assets/fonts/*',
	'./app/assets/img/*',
	'./app/assets/styles/css/*',
	];

/* Move to dist folder */
gulp.task('dist', function(){
	gulp.src(prodFiles, { base: './app' })
		.pipe(gulp.dest('dist'));
});

/* Sass to CSS */
gulp.task('sass', function () {
	return gulp.src('./app/assets/styles/sass/*.scss')
    	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    	.pipe(gulp.dest('./app/assets/styles/css'));
});

/* Create the dev server */
gulp.task('serverDev', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

/* Create the prod server */
gulp.task('serverProd', function () {
	connect.server({
		root: 'dist',
		port: 8000
	});
});

/* Livereload init */
gulp.task('html', function () {
	gulp.src('./app/*.html')
		.pipe(connect.reload());
});

/* Watch tasks */
gulp.task('watch', function () {
	gulp.watch('./app/*.html', ['html']);
	gulp.watch('./app/assets/styles/sass/**', ['sass']);
});

/* Dev tasks */
gulp.task('default', ['serverDev', 'sass', 'watch']);

/* Prod tasks */
gulp.task('prod', ['dist', 'serverProd']);