var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    browserify('./src/js/Main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('Main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy',function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
    gulp.src('src/css/**/*.*')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default',['browserify', 'copy'], function() {
    return gulp.watch('src/**/*.*', ['browserify', 'copy'])
});