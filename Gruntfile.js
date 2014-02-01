'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.initConfig({
    uglify: {
      dist: {
        src : ['lib/private.js'],
        dest : 'lib/private.min.js'
      }
    }
  });
  
  grunt.registerTask('default', ['uglify']);
};