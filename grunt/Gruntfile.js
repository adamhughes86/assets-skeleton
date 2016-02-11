module.exports = function(grunt) {

  // We load in grunt modules with require. Some need to be manually called though
  require('jit-grunt')(grunt, {
    notify_hooks: 'grunt-notify',
    sprite: 'grunt-spritesmith',
    scsslint: 'grunt-scss-lint',
    bower: 'grunt-bower-task'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: '<%= pkg.assetsPath %>/libs'
        }
      }
    },

    modernizr: {
      dist: {
        devFile: '<%= pkg.assetsPath %>/libs/modernizr/modernizr.js',
        dest: '<%= pkg.assetsPath %>/js/vendor/custom-modernizr.js',
        files: {
          src: [
            '<%= pkg.assetsPath %>/js/src/app.js',
            '<%= pkg.assetsPath %>/js/src/app.*.js',
            '<%= pkg.assetsPath %>/sass/*/*.scss',
          ]
        }
      }
    },

    concat: {
      options: {
        sourceMap: true
      },
      scripts : {
        src: [
          '<%= pkg.assetsPath %>/libs/jquery/jquery.js',
          '<%= pkg.assetsPath %>/js/vendor/custom-modernizr.js',
          '<%= pkg.assetsPath %>/libs/enquire/enquire.js',
          '<%= pkg.assetsPath %>/libs/slick-carousel/slick.min.js',
          '<%= pkg.assetsPath %>/js/src/app.js'
        ],
        dest: '<%= pkg.assetsPath %>/js/build/compiled.js'
      },
      styles : {
        src: [
          '<%= pkg.assetsPath %>/libs/slick-carousel/slick.css',
          '<%= pkg.assetsPath %>/css/src/styles.css'
        ],
        dest: '<%= pkg.assetsPath %>/css/build/compiled.css'
      }
    },

    uglify: {
      files: {
        src: '<%= pkg.assetsPath %>/js/build/compiled.js',
        dest: '<%= pkg.assetsPath %>/js/build/compiled.min.js'
      },
      options: {
        sourceMap : true
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= pkg.assetsPath %>/css/',
          src: [
            'compiled.css'
          ],
          dest: '<%= pkg.assetsPath %>/css/',
          ext: '.min.css'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= pkg.assetsPath %>/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= pkg.assetsPath %>/images/'
        }]
      }
    },

    sprite:{
      all: {
        src: '<%= pkg.assetsPath %>/images/sprites/*.png',
        retinaSrcFilter: '<%= pkg.assetsPath %>/images/sprites/*@2x.png',
        dest: '<%= pkg.assetsPath %>/images/spritesheet.png',
        retinaDest: '<%= pkg.assetsPath %>/images/spritesheet@2x.png',
        destCss: '<%= pkg.assetsPath %>/sass/settings/_sprites.scss',
        imgPath: '../images/spritesheet.png',
        retinaImgPath: '../images/spritesheet@2x.png'
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.assetsPath %>/sass',
          src: ['*.scss'],
          dest: '<%= pkg.assetsPath %>/css/build',
          ext: '.css'
        }]
      }
    },

    scsslint: {
      allFiles: [
        '<%= pkg.assetsPath %>/sass/**/*.scss',
      ],
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true,
        exclude: [
          '<%= pkg.assetsPath %>/sass/core/bourbon/**/*.scss',
          '<%= pkg.assetsPath %>/sass/settings/_iconfont.scss',
          '<%= pkg.assetsPath %>/sass/settings/_sprites.scss',
          '<%= pkg.assetsPath %>/sass/settings/_icons-data-svg.scss'
        ]
      },
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('autoprefixer-core')({
            browsers: 'last 3 versions'
          })
        ]
      },
      dist: {
        src: '<%= pkg.assetsPath %>/css/build/styles.css'
      }
    },

    jshint: {
      all: ['Gruntfile.js', '../js/src/app.js'],
      options: {
        smarttabs : true
      }
    },

    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5 // maximum number of notifications from jshint output
      }
    },

    watch: {
      css : {
        files: ['<%= pkg.assetsPath %>/sass/**/*.scss'],
        tasks: ['scsslint', 'sass', 'postcss', 'concat:styles', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ['<%= pkg.assetsPath %>/js/src/**/*.*.js', '<%= pkg.assetsPath %>/js/src/app.js'],
        tasks: ['jshint', 'concat:scripts', 'uglify'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images : {
        files: ['<%= pkg.assetsPath %>/images/*'],
        tasks: ['newer:imagemin:all'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      sprite : {
        files: ['<%= pkg.assetsPath %>/images/sprites/*'],
        tasks: ['sprite'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['bower', 'modernizr', 'sprite', 'sass', 'postcss', 'concat', 'uglify', 'cssmin', 'jshint', 'notify_hooks']);
  grunt.registerTask('dev', ['bower', 'modernizr', 'sprite', 'scsslint', 'sass', 'postcss', 'jshint', 'concat', 'uglify', 'cssmin', 'notify_hooks', 'watch']);
};
