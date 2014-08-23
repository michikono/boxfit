/**
 * License: MIT.
 * Copyright (C) 2014 Michi Kono
 */

'use strict';

module.exports = function (grunt) {
  // configs located in grunt/`
  require('load-grunt-config')(grunt);

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'copy',
    'uglify'
  ]);

  grunt.registerTask('default', ['build']);
};
