module.exports = function(grunt){
  grunt.initConfig({
    min: {
      dist: {
        src : ['lib/private.js'],
        dest : 'lib/private.min.js'
      }
    }
  });
  grunt.registerTask('default', 'min');
};