module.exports = function(grunt)
{
    var babel = require('rollup-plugin-babel');

    grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}');
    var grunt_config = {
        pkg : grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['rollup']
            }
        },
        babel: {
            options: {
                presets: ['es2015-rollup'],
                sourceMap: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['./**/*.jsm', './**/*.js'],
                        ext: '.js',
                        dest: './dist/lib'
                    }
                ]
            }
        },
        rollup: {
            options: {
                format: 'umd',
                moduleName: 'NGINT',
                plugins: function() {
                    return [babel( {
                            exclude: './node_modules/**',
                            presets: ['es2015-rollup']
                        }
                    )];
                }
            },
            files: {
                'dest': './dist/js/<%= pkg.name %>.js',
                'src' : './src/app.js'
            }
        },
        uglify:
        {
            options: {
                banner: '/*<%= pkg.name %> <%= pkg.version %>*/'
            },
            build:
            {
                files:
                {
                    './dist/js/<%= pkg.name %>.min.js' : ['./dist/js/<%= pkg.name %>.js']
                }
            }
        },
        nodeunit: {
            all: ['test/*_test.js'],
            options: {
                reporter: 'junit',
                reporterOptions: {
                    output: 'outputdir'
                }
            }
        },
        clean: ['dist/lib', 'dist/js']
    };

    grunt.initConfig(grunt_config);

    //Grunt plugins
    grunt.loadNpmTasks('grunt-babel');              // Babel
    grunt.loadNpmTasks('grunt-rollup');             // Rollup
    grunt.loadNpmTasks('grunt-contrib-uglify');     // Minify JS
    grunt.loadNpmTasks('grunt-contrib-watch');      // Watch JS for live changes
    grunt.loadNpmTasks('grunt-contrib-nodeunit');   // Unit testing
    grunt.loadNpmTasks('grunt-contrib-clean');      // Clean up build files

    //Tasks
    grunt.registerTask('dev', ['rollup' , 'watch']);
    grunt.registerTask('test', ['babel', 'nodeunit']);
    grunt.registerTask('clean_dist', ['clean', 'babel', 'rollup', 'uglify']);
    grunt.registerTask('dist', ['babel', 'rollup', 'uglify']);
};
