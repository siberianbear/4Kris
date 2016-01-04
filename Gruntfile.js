'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // WATCH TASK - important
    watch: {
      sass: {
        files: ['**/*.{scss,sass}', 'sass/**/*.html'],
        tasks: ['clean', 'sass', 'shell', 'copy:main']
      },
    },

    clean: ['styleguide/assets'],
    sass: {
      options: {
        outputStyle: 'compact'
      },
      dist: {
        files: {
          'css/style.css': 'sass/app.sass'
        }
      }
    },
    shell: {
      kss: {
        command: './node_modules/.bin/kss-node sass styleguide/assets --template styleguide/template/custom'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['images/**'], dest: 'styleguide/assets/'},
          {expand: true, src: ['css/**'], dest: 'styleguide/assets/'},
          {expand: true, src: ['js/**'], dest: 'styleguide/assets/'},
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['watch:sass']);
};
