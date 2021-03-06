module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		jshint: {
			options: {
				esversion: 6,
			},
			app: ['src/**/*.js'],
		},

		babel: {
			options: {
				sourceMap: false,
				presets: ["es2015"],
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/js/',
						src: '**/*.js',
						dest: 'dist/js/'
					}
				]
			}
		},

		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['jshint', 'babel'],
				options: {
					spawn: false,
				},
			},
			sass: {
				files: ['src/styles/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				},
			}
		},

		copy: {
			debug: {
				cwd: 'dist',  // set working folder / root to copy
				src: '**/*',           // copy all files and subfolders
				dest: 'N:/layout-task-debug',    // destination folder
				expand: true           // required when using cwd
			},
			release: {
				cwd: 'dist',
				src: '**/*',
				dest: 'N:/layout-task',
				expand: true
			}
		},

		sass: {
			dist: {
				options: {
					sourcemap: 'none',
            		style: 'expanded'
        		},
				files: {
					'dist/css/main.css': 'src/styles/main.scss'
				}
			}
		}
	});

	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('release', ['jshint', 'babel', 'preprocess:release', 'sass', 'copy:release']);
	grunt.registerTask('debug', ['jshint', 'babel', 'sass', 'copy:debug']);

	[
		'grunt-contrib-concat',
		'grunt-contrib-copy',
		'grunt-contrib-watch',
		'grunt-contrib-jshint',
		'grunt-contrib-sass'
	].forEach(function(task) {
		grunt.loadNpmTasks(task);
	});
};