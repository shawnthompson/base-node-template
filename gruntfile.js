module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		bower : {
			install : {}
		},

		concat : {
			options : {
				seperator: '\n\n//--------------------------------\n',
				banner: '\n\n//--------------------------------\n'
			},
			dist : {
				src : [
					'./bower_components/jquery/dist/jquery.js',
					'./bower_components/bootstrap/dist/js/bootstrap.js',
					'./components/scripts/*.js'
					],
				dest : './builds/development/js/scripts.js'
			}
		},

		uglify: {
			my_target: {
				files: {
					'./builds/development/js/scripts.min.js': [
						'./builds/development/js/scripts.js'
					]
				}
			}
		},

		copy: {
			main: {
				expand: true,
				cwd: './bower_components/bootstrap/dist/',
				src: ['**/*'],
				dest: './builds/development/bootstrap/'
			},
			js: {
				expand: true,
				cwd: 'components/scripts/',
				src: ['**/*'],
				dest: 'builds/development/js/'
			}
		},

		assemble: {
		  options: {
		    assets: 'assets',
		    plugins: ['permalinks'],
		    partials: ['components/includes/**/*.hbs'],
		    layout: ['components/layouts/default.hbs'],
		    data: ['components/data/*.{json,yml}']
		  },
		  site: {
		    src: ['./components/pages/*.hbs'],
		    dest: './builds/development/'
		  }
		},

		sass : {
			dist : {
				options : {
					style: 'expanded'
				},

				files : [{
					src : './components/sass/styles.scss',
					dest : './builds/development/css/style.css'
				}]
			}
		},

		cssmin : {
			target : {
				files : [{
					expand : true,
					cwd : './builds/development/css/',
					src : ['*.css', '!*.min.css'],
					dest : './builds/development/css/',
					ext : '.min.css'
				}]
			}
		},

		responsive_images: {
			myTask: {
				options: {
					sizes: [{
						height: 200,
						rename: false
					}]
				},
				files: [{
					expand: true,
					src: ['**.{jpg,gif,png}'],
					cwd: './components/images/',
					dest: './builds/development/img/'
				}]
			}
		},

		'gh-pages': {
			options: {
				base: './builds/development'
			},

			src: ['**']
		},

		watch: {
			css: {
				files: ['./components/sass/*.*'],
				tasks: ['sass']
			},

			html: {
				files: ['./components/pages/*.html'],
				tasks: ['copy:pages']
			},

			script: {
				files: ['./components/scripts/*.*'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	grunt.registerTask(
		'default', [
			'copy',
			'assemble',
			'concat',
			'uglify',
			'sass',
			// 'responsive_images',
			'cssmin'
	]);
};
