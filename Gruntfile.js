module.exports = function (grunt) {
  var files = [
    'build/bower_components.js',
    'sigmajs-cola.js'
  ];

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
    bower_concat: {
      all: {
        dest: 'build/bower_components.js',
        include: [
          'animation-frame',
          'WebCola'
        ]
      }
    },
    concat: {
      dist: {
        src: files,
        dest: 'build/sigma.layout.cola.js'
      }
    },
    jshint: {
      options: {
        'jshintrc': 'jshint.json'
      },
      src: 'sigmajs-cola.js'
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.registerTask('default', [
    'bower_concat',
    'concat',
    'closureLint',
    'jshint'
  ]);
};
