var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var pug = require('gulp-pug');
var copy = require('gulp-copy');
var sass = require('gulp-sass');


gulp.task('html', function(){
    return gulp
        .src('src/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
    });

gulp.task('sass', function(){
return gulp
    .src('src/sass/*.s*ss')
    .pipe(sass())
    .pipe(gulp.dest('dist/sass'))
    .pipe(browserSync.stream())
});

gulp.task('serve', function(){
   browserSync.init({server: './dist/', port:8080});

   gulp.watch('src/assets/**/*', ['copy']);
   gulp.watch('src/*.pug', ['html']);
   gulp.watch('src/*.s*ss', ['sass']);

});

gulp.task('copy', function() {
    return gulp
      .src('src/assets/**/*')
      .pipe(copy('dist/assets/', { prefix: 2 }))
      .pipe(gulp.dest('dist/assets'))
      .pipe(browserSync.stream())
  });
  
  gulp.task('default', [
    'copy',
    'html',
    'sass',
    'serve'
  ]);