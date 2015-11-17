module.exports = function(grunt) {

  // We load in grunt modules with require. Some need to be manually called though
  require('jit-grunt')(grunt, {
    notify_hooks: 'grunt-notify',
    sprite: 'grunt-spritesmith',
    scsslint: 'grunt-scss-lint'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      vendor : {
        src: [
          '<%= pkg.assetsPath %>/js/app.js'
        ],
        dest: '<%= pkg.assetsPath %>/js/main.js'
      }
    },

    uglify: {
      build: {
        src: '<%= pkg.assetsPath %>/js/main.js',
        dest: '<%= pkg.assetsPath %>/js/main.min.js'
      },
      options: {
        sourceMap : true
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

    sprite: {
      all: {
        src: '<%= pkg.assetsPath %>/images/sprites/*.png',
        dest: '<%= pkg.assetsPath %>/images/sprite.png',
        destCss: '<%= pkg.assetsPath %>/sass/settings/_sprite.scss',
        imgPath: '<%= pkg.assetsPath %>/assets/images/sprite.png',
        padding: 5
      }
    },

    copy: {
      svgCss: {
        src: '<%= pkg.assetsPath %>/images/svg/output/icons-data-svg.css',
        dest: '<%= pkg.assetsPath %>/sass/settings/_icons-data-svg.scss',
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.assetsPath %>/sass',
          src: ['*.scss'],
          dest: '<%= pkg.assetsPath %>/css',
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
          '<%= pkg.assetsPath %>/sass/settings/_sprite.scss',
          '<%= pkg.assetsPath %>/sass/settings/_icons-data-svg.scss'
        ]
      },
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('autoprefixer-core')({
            browsers: 'last 2 versions'
          })
        ]
      },
      dist: {
        src: '<%= pkg.assetsPath %>/css/*.css'
      }
    },

    jshint: {
      all: ['Gruntfile.js', '../js/app.js'],
      options: {
        smarttabs : true
      }
    },

    kss: {
      options: {
        css: '../css/styles.css',
        template: 'nice-kss', // This should be the path to a better KSS template
      },
      dist: {
        files: {
          '<%= pkg.assetsPath %>/styleguide': ['<%= pkg.assetsPath %>/sass']
        }
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
        tasks: ['scsslint', 'sass', 'kss'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ['<%= pkg.assetsPath %>/js/**/*.*.js', '<%= pkg.assetsPath %>/js/app.js'],
        tasks: ['jshint', 'concat'],
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

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'postcss', 'jshint', 'notify_hooks']);
  grunt.registerTask('dev', ['concat', 'sprite', 'scsslint', 'copy', 'sass', 'postcss', 'jshint', 'kss', 'notify_hooks', 'watch']);
};
