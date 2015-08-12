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
                    enhanceSVG: true
                }
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
                    '<%= pkg.assetsPath %>/sass/core/_normalize.scss',
                    '<%= pkg.assetsPath %>/sass/settings/_iconfont.scss',
                    '<%= pkg.assetsPath %>/sass/settings/_sprite.scss'
                ]
            },
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
            },
            files: {
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
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kss');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'grunticon:svgIcons', 'sass', 'jshint', 'notify_hooks']);
    grunt.registerTask('dev', ['concat', 'sprite', 'scsslint', 'grunticon:svgIcons', 'sass', 'jshint', 'kss', 'notify_hooks', 'watch']);
    grunt.registerTask('validate', ['validation']);
};
