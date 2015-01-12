module.exports = function (grunt) {
  var files = [
    'bower_components/animation-frame/AnimationFrame.js',
    'bower_components/WebCola/WebCola/cola.v3.min.js',
    'sigmajs-cola.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    closureLint: {
      app: {
        closureLinterPath: '/usr/local/bin',
        command: 'gjslint',
        src: 'sigmajs-cola.js',
        options: {
          stdout: true,
          strict: true,
          opt: '--disable 6,13'
        }
      }
    },
    concat: {
      options: {},
      dist: {
        src: files,
        dest: 'build/sigma.layout.cola.js'
      }
    },
    jshint: {
      options: {
        "jshintrc": "jshint.json"
      },
      src: 'sigmajs-cola.js'
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', [
    'concat',
    'closureLint',
    'jshint'
  ]);
};
