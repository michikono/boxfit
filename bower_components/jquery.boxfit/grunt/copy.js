// Copies remaining files to places other tasks can use
module.exports = {
  dist: {
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: ['*.js'],
        dest: 'dist/'
      }
    ]
  }

};