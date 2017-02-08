module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		bower : {
			install : {}
		},

		clean: ['builds'],

		sass : {
			dist : {
				options : {
					style: 'expanded'
				},

				files : [{
					src : './components/sass/styles.scss',
					dest : './components/css/style.css'
				}]
			}
		},

		concat : {
			options : {
				seperator: '\n\n//--------------------------------\n',
				banner: '\n\n//--------------------------------\n'
			},

			js : {
				src : [
					'./bower_components/jquery/dist/jquery.js',
					'./bower_components/bootstrap/dist/js/bootstrap.js',
					'./components/scripts/*.js'
					],
				dest : './builds/development/js/scripts.js'
			},
			css : {
				src : [
					'./bower_components/bootstrap/dist/css/bootstrap.css',
					'./components/css/style.css'
					],
				dest : './builds/development/css/style.css'
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
			fonts: {
				expand: true,
				cwd : './bower_components/bootstrap/dist/fonts/',
				src: ['*.*'],
				dest: './builds/development/fonts/'
			}
		},

		assemble: {
		  options: {
		    assets: 'assets',
		    plugins: ['permalinks'],
		    partials: ['components/includes/**/*.hbs'],
				layoutdir: 'components/layouts',
		    layout: ['default.hbs'],
		    data: ['components/data/*.{json,yml}']
		  },

		  site: {
				expand: true,
				cwd: './components/pages/',
		    src: ['*.hbs'],
		    dest: './builds/development/'
		  }
		},

		// cssmin : {
		// 	target : {
		// 		files : [{
		// 			expand : true,
		// 			cwd : './builds/development/css/',
		// 			src : ['*.css', '!*.min.css'],
		// 			dest : './builds/development/css/',
		// 			ext : '.min.css'
		// 		}]
		// 	}
		// },

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
			'clean',
			'sass',
			'copy',
			'assemble',
			'concat',
			'uglify'
			// 'responsive_images',
			// 'cssmin'
	]);
};
