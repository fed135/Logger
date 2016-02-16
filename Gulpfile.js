var gulp = require('gulp');
var mocha = require('gulp-mocha');
var minify = require('gulp-minify');
 
gulp.task('default', function() {
  gulp.src('src/*.js')
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

gulp.task('test', function() {
	gulp.src('tests/index.js')
  	.pipe(mocha({reporter: 'nyan'}))
});