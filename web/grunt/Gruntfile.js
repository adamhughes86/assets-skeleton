module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 2. Configuration for module files goes here.
    // plugins http://gruntjs.com/plugins

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
    grunticon: {
      svgIcons: {
        files: [{
          expand: true,
          cwd: '<%= pkg.assetsPath %>/images/svg/input',
          src: ['*.svg', '*.png'],
          dest: '<%= pkg.assetsPath %>/images/svg/output'
        }],
        options: {
          enhanceSVG: true,
          datasvgcss: 'icons-data-svg.css',
          datapngcss: 'icons-data-png.css',
          customselectors: {
            '*': ['.icon-$1-pseudo:before', '.icon-$1-pseudo:after']
          }
        }
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
    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        doctype: 'HTML5',
        remotePath: 'http://player.arsenal.com/', // Set your testing site (remote or local)
        remoteFiles: [
            ' ',
            'features/'
        ], // Set the urls you want to test here
        serverUrl: 'http://localhost/w3c-validator/check' // You need to have a local version of the w3c validator installed on your computer / network
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
    phantomcss: {
      options: {
        mismatchTolerance: 0.05,
        screenshots: 'regression-tests/baselines',
        results: 'regression-tests/results',
        viewportSize: [1280, 800],
      },
      src: [
        'regression-tests/pre.js',
        'regression-tests/js-tests/*.js'
      ]
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
      },
      svg : {
        files: ['<%= pkg.assetsPath %>/images/svg/input/*'],
        tasks: ['grunticon:svgIcons'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-phantomcss');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify', 'grunticon:svgIcons', 'copy', 'sass', 'postcss', 'jshint', 'notify_hooks']);
  grunt.registerTask('dev', ['concat', 'sprite', 'scsslint', 'grunticon:svgIcons', 'copy', 'sass', 'postcss', 'jshint', 'kss', 'notify_hooks', 'watch']);
  grunt.registerTask('regression', ['concat', 'sprite', 'scsslint', 'grunticon:svgIcons', 'sass', 'postcss', 'jshint', 'kss', 'phantomcss', 'notify_hooks']);
  grunt.registerTask('validate', ['validation']);
};
