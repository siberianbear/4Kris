var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    styleguide = require('sc5-styleguide'),
    livereload = require('gulp-livereload');

var paths = {
  sass: ['sass/**/*.+(scss|sass)'],
  sassComponents: ['sass/**/*.+(scss|sass)', '!sass/*.+(scss|sass)'],
  html: ['sass/**/*.html'],
  styleguide: 'styleguide'
};

gulp.task('sass', function () {
  gulp.src('sass/app.sass')
    .pipe(sass(
      {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('styleguide:generate', function() {
  return gulp.src(paths.sassComponents)
    .pipe(styleguide.generate({
        title: 'Bootsmacss',
        server: true,
        rootPath: paths.styleguide,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(paths.styleguide));
});

gulp.task('styleguide:applystyles', ['sass'], function() {
  return gulp.src('css/style.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

gulp.task('watch', ['styleguide'], function() {
  gulp.watch([paths.sass, paths.html], ['styleguide']);
});
