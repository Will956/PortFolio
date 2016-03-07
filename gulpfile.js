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

gulp.task('dist', function(){
	gulp.src(prodFiles, { base: './app' })
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	return gulp.src('./app/assets/styles/sass/*.scss')
    	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    	.pipe(gulp.dest('./app/assets/styles/css'));
});

gulp.task('serverDev', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

gulp.task('serverProd', function () {
	connect.server({
		root: 'dist',
		port: 8000
	});
});

gulp.task('html', function () {
	gulp.src('./app/*.html')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('./app/**', ['html']);
	gulp.watch('./app/assets/styles/sass/**', ['sass']);
});

gulp.task('default', ['serverDev', 'sass', 'watch']);

gulp.task('prod', ['dist', 'serverProd']);