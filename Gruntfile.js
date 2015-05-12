module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /* Handle Images */

        responsive_images: {
            icons : {
                options: {
                    sizes: [{
                        width: 36,
                        height: 36
                    }, {
                        width: 48,
                        height: 48
                    }, {
                        width: 60,
                        height: 60
                    }, {
                        width: 72,
                        height: 72
                    }, {
                        width: 76,
                        height: 76
                    }, {
                        width: 96,
                        height: 96
                    }, {
                        width: 120,
                        height: 120
                    }, {
                        width: 144,
                        height: 144
                    }, {
                        width: 152,
                        height: 152
                    }, {
                        width: 180,
                        height: 180
                    }, {
                        width: 192,
                        height: 192
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/launcher-icon/',
                    src: ['**/*.png'],
                    dest: './dist/images/launcher-icons/'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [ { removeViewBox: false }, { removeUselessStrokeAndFill: false } ]
            },
            dist: {
                files: {
                    './dist/images/icons/barchart.svg': './dist/images/icons/barchart.svg', // Destination : Source
                    './dist/images/icons/camera.svg': './dist/images/icons/camera.svg',
                    './dist/images/icons/pen.svg': './dist/images/icons/pen.svg',
                    './dist/images/icons/tags.svg': './dist/images/icons/tags.svg',

                    /*barchart.svg
                    camera.svg
                    pen.svg
                    phone.svg
                    tags.svg*/
                }
            }
        },

        /* JavaScript and CSS */

        jshint: {
            files: ['src/js/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                smarttabs: true,
                globals: {}
            }
        },

        uglify: {
            my_target: {
                files: {
                    './dist/js/<%= pkg.name %>.min.js': 'src/js/*.js' // Destination : Source
                }
            }
        },

        cssmin: {
            my_target: {
                src: 'src/css/*.css',
                dest: './dist/css/style.min.css'
            }
        },

        /* HTML */

        processhtml: {
            dist: {
                files: {
                    './dist/index.html': ['src/index.html'] //destination : source  !
                }
            }
        },

        copy: {
            fonts: {
                cwd: 'src/',
                expand: true,
                src: ['fonts/**'],
                dest: 'dist/',
                flatten: false
            },
            chromeManifest: {
                cwd: 'src/',
                expand: true,
                src: ['manifest.json'],
                dest: 'dist/',
                flatten: false
            },
            icons: {
                cwd: 'src/',
                expand: true,
                src: ['images/icons/*.svg'],
                dest: 'dist/',
                flatten: false
            },
        },

        /* Appcache */

        appcache: {
            options: {
                basePath: './dist'
            },
            all: {
                dest: './dist/manifest.appcache',
                cache: './dist/**/*',
                network: '*'
            }
        },

        replace: {
            dist: {
                src: ['./dist/index.html'],
                overwrite: true,
                replacements: [{
                    from: /<html([^>]+)>/,
                    to: '<html$1 manifest="manifest.appcache">'
                }]
            }
        },

        /** LICENSING **/

        usebanner: {
            js: {
                options: {
                    banner: '/** \n<%= grunt.file.read("licenses/MIT.txt") %>\n*/'
                },
                    files: {
                        src: ['./dist/js/<%= pkg.name %>.min.js']
                    }
                },

            css: {
                options: {
                    banner: [
                        '/**',
                        '<%= grunt.file.read("licenses/MIT.txt") %>',
                        '<%= grunt.file.read("licenses/animate-css.txt") %>',
                        '*/'].join('\n\n---\n\n')
                },
                files: {
                    src: ['./dist/css/style.min.css']
                }
            }
        }

    });
        
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-appcache');
    grunt.loadNpmTasks('grunt-svgmin');

    // Default
    grunt.registerTask('default', [
        'responsive_images:icons',
        'jshint',
        'uglify',
        'cssmin',
        'processhtml',
        'copy:fonts',
        'copy:chromeManifest',
        'copy:icons',
        'replace',
        'usebanner:js',
        'usebanner:css',
        'appcache',
        'svgmin'
    ]);

};
