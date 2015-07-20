module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. Configuration for module files goes here.
        // plugins http://gruntjs.com/plugins

        bower: {
            install: {
                options: {
                    targetDir: '../libs',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: true,
                    bowerOptions: {}
                }
            }
        },
        concat: {
            vendor : {
                src: [
                    // Bower JS libraries
                    '../libs/jquery/jquery.js',
                    '../libs/modernizr/modernizr.js',
                    '../libs/enquire/enquire.js',
                    // Main JS file
                    '../js/app.js'
                ],
                dest: '../js/main.js'
            }
        },
        uglify: {
            build: {
                src: '../js/main.js',
                dest: '../js/main.min.js'
            },
            options: {
                sourceMap : true
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '../images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '../images/'
                }]
            }
        },
        sprite: {
            all: {
                src: '../images/sprites/*.png',
                dest: '../images/sprite.png',
                destCss: '../sass/includes/_sprite.scss',
                imgPath: '../../assets/images/sprite.png',
                padding: 5
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '../sass',
                    src: ['*.scss'],
                    dest: '../css',
                    ext: '.css'
                }]
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
                // Set your local site and urls you want to check here
                remotePath: 'http://lfc.local/',
                remoteFiles: [' ', 'kit/'],
                // You need to have a local version of the w3c validator installed on your computer / network
                serverUrl: 'http://localhost/w3c-validator/check'
            },
            files: {
            }
        },
        kss: {
            options: {
                css: '../css/styles.css',
                template: '/Users/ahughes/Sites/php-skeleton/assets/grunt/nice-kss', // This should be the path to a better KSS template
            },
            dist: {
                files: {
                    '../styleguide': ['../sass']
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
                files: ['../sass/**/*.scss'],
                tasks: ['sass', 'kss'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scripts: {
                files: ['../js/**/*.*.js', '../js/app.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            images : {
                files: ['../images/*'],
                tasks: ['newer:imagemin:all'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            sprite : {
                files: ['../images/sprites/*'],
                tasks: ['sprite'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kss');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['bower:install', 'concat', 'uglify', 'sprite', 'sass', 'kss', 'jshint', 'notify_hooks']);
    grunt.registerTask('dev', ['concat', 'sprite', 'sass', 'jshint', 'kss', 'notify_hooks', 'watch']);
    grunt.registerTask('components', ['bower:install', 'concat']);
    grunt.registerTask('validate', ['validation']);
};
