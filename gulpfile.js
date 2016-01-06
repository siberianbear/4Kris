var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    styleguide = require('sc5-styleguide'),
    livereload = require('gulp-livereload');

var paths = {
  sass: ['sass/**/*.+(scss|sass)'],
  sassStyleguide: ['sass/**/*.+(scss|sass)', '!sass/_mixins.+(scss|sass)'],
  html: ['sass/**/*.html'],
  styleguide: 'styleguide'
};

gulp.task('sass', function () {
  gulp.src('sass/app.sass')
    .pipe(sass(
      {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('styleguide:generate', function() {
  return gulp.src(paths.sassStyleguide)
    .pipe(styleguide.generate({
        title: 'Bootsmacss',
        server: true,
        rootPath: paths.styleguide,
        overviewPath: 'README.md',
        commonClass: 'body'
      }))
    .pipe(gulp.dest(paths.styleguide));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('sass/app.sass')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

gulp.task('default', ['styleguide', 'sass'], function() {
  livereload.listen();
  gulp.watch([paths.sass, paths.html], ['styleguide', 'sass']);
});
