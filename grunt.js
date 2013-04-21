module.exports = function(grunt){
  grunt.initConfig({
    min: {
      dist: {
        src : ['lib/private.js'],
        dest : 'lib/private.min.js'
      }
    },
    watch : {
      scripts : {
        files : ['lib/*.js'],
        tasks : 'min'
      }
    }
  });
  grunt.registerTask('default', 'min');
};