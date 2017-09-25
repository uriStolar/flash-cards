var gulp = require('gulp');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
gutil = require('gulp-util');

gulp.task('js', function () {
    gulp.src(['web-app/src/js/**/*js'])
        .pipe(concat('flash-cards.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('minify-css', function () {
    return gulp.src('web-app/src/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(concat('flash-cards.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('minify', ["js", "minify-css"], function () {
    gutil.log('Completed  task!');
});

gulp.task('server', function () {
  nodemon({
    script: 'app.js',
    ext: 'js html css'
  });
});

gulp.task('default', ["server"]);
