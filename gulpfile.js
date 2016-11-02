﻿// Gather used gulp plugins
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    styleguide = require('sc5-styleguide'),
    livereload = require('gulp-livereload');
    mustache = require('gulp-mustache');


// Set paths
var paths = {
  sass: {
    input: 'sass/app.sass',
    allfiles: 'sass/**/*.+(scss|sass)',
    output: 'css'
  },
  mustache: {
    input: './html-workspace/*.html',
    output: './html-preview'
  },
  styleguide: {
    sass: [
      'sass/**/*.+(scss|sass)',
      '!sass/_*.+(scss|sass)'
    ],
    html: 'sass/**/*.html',
    output: 'styleguide',
  }
};

// Define SASS compiling task
gulp.task('sass', function () {
  gulp.src(paths.sass.input)
    .pipe(sass(
      {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.sass.output))
    .pipe(livereload());
});

// Define Mustache compiling task
gulp.task('mustache', function() {
  return gulp.src(paths.mustache.input)
    .pipe(mustache())
    .pipe(gulp.dest(paths.mustache.output))
    //.pipe(livereload());
});

// Define rendering styleguide task
// https://github.com/SC5/sc5-styleguide#build-options
gulp.task('styleguide:generate', function() {
  return gulp.src(paths.styleguide.sass)
    .pipe(styleguide.generate({
        title: 'Bootsmacss styleguide',
        server: true,
        sideNav: true,
        rootPath: paths.styleguide.output,
        overviewPath: 'README.md',
        commonClass: 'body'
      }))
    .pipe(gulp.dest(paths.styleguide.output));
});
gulp.task('styleguide:applystyles', function() {
  return gulp.src('sass/app.sass')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide.output));
});
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
// Define copying images for styleguide task
gulp.task('images', function() {
  gulp.src(['images/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/images'));
});
// Define copying javascript for styleguide task
gulp.task('js', function() {
  gulp.src(['js/components/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/js/components'));
});


// Listen folders for changes and apply defined tasks
gulp.task('default', [
    'styleguide',
    'sass',
    'images',
    'js',
    'mustache'
  ], function() {
  livereload.listen();
  gulp.watch([paths.sass.allfiles, paths.styleguide.html, paths.mustache.input], [
    'styleguide',
    'sass',
    'images',
    'js',
    'mustache'
  ]);
});
