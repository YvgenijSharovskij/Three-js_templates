module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 


  // initiate grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),   // read JSON meta, 
                                                // e.g. <%= pkg.name %>, <%= pkg.version %>

    // variables template
    var: {
      js_src: 'js/main.js',
      js_dest: 'js/main.min.js',
      sass_dir: 'sass',
      css_dir: 'stylesheets'
    },

    // minify
    uglify: {
      js: {
        files: {
            // 'destination': 'source' 
           '<%= var.js_dest %>': '<%= var.js_src %>'  
        }
      }
    },

    // compass with default config.rb
    compass: {
      dist: {
        options: {
          //sassDir: '<%= var.sass_dir %>',
          //cssDir: '<%= var.css_dir %>'
          config: 'config.rb'
        }
      }
    },

    // JavaDoc-style JS-doc
    jsdoc: {
        dist : {
          src: ['<%= var.js_src %>'],
            options: {
                destination: 'js/jsdoc'
            }
        }
    },

    // watch
    watch: {
      js: {
        files: ['js/*.js'],
        tasks: ['uglify:js']
      },
      jsdoc: {
        files: ['<%= var.js_src %>'],
        tasks: ['jsdoc']
      },
      css: {
        files: '**/*.scss',
        tasks: ['compass']
      }
    }


});



  // load npm tasks:
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('load-grunt-tasks');
  grunt.loadNpmTasks('grunt-jsdoc');
  


  // register default tasks, executed as: 
  // grunt default, or
  // grunt
  grunt.registerTask('default',  ['watch']);

};