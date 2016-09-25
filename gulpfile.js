// Gather used gulp plugins
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    styleguide = require('sc5-styleguide'),
    livereload = require('gulp-livereload');
    mustache = require('gulp-mustache');


// Set paths
var paths = {
  sass: ['sass/**/*.+(scss|sass)'],
  sassStyleguide: [
    'sass/**/*.+(scss|sass)',
    '!sass/_*.+(scss|sass)'
  ],
  html: ['sass/**/*.html'],
  mustache: [
    'html-workspace/*.html',
    'html-workspace/**/*.mustache'
  ],
  styleguide: 'styleguide',
  scripts: {
    base:       'js',
    components: 'js/components/**/*.js'
  }
};

// TODO: contat scripts and add them to styleguide
gulp.task('scripts', function(){
  return gulp.src(paths.scripts.components)
    .pipe(concat('bootsmacss.js'))
    .pipe(gulp.dest('js'));
});


// Define SASS compiling task
gulp.task('sass', function () {
  gulp.src('sass/app.sass')
    .pipe(sass(
      {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});


// Define Mustache compiling task
gulp.task('mustache', function() {
  return gulp.src("./html-workspace/*.html")
    .pipe(mustache())
    .pipe(gulp.dest("./html-prototype"));
});


// Define rendering styleguide task
// https://github.com/SC5/sc5-styleguide#build-options
gulp.task('styleguide:generate', function() {
  return gulp.src(paths.sassStyleguide)
    .pipe(styleguide.generate({
        title: 'Bootsmacss styleguide',
        server: true,
        sideNav: true,
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
// Define copying images for styleguide task
gulp.task('images', function() {
  gulp.src(['images/**'])
    .pipe(gulp.dest(paths.styleguide + '/images'));
});
// Define copying javascript for styleguide task
gulp.task('js', function() {
  gulp.src(['js/components/**'])
    .pipe(gulp.dest(paths.styleguide + '/js/components'));
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
  gulp.watch([paths.sass, paths.html, paths.mustache], [
    'styleguide',
    'sass',
    'images',
    'js',
    'mustache']);
});
