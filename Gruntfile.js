module.exports = function(grunt) {
	grunt.initConfig({
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		simplemocha: {
			options: {
				ui: 'bdd',
				reporter: 'spec',
			},

			all: {
				src: ['test/**/*.js']
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					ignore: ['node_modules/**', 'test/**']
				}
			}
		},
		watch: {
			files: ['test/**/*.js', 'config/**/*.js'],
			tasks: ['simplemocha']
		}
	});
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.registerTask('default', ['concurrent']);
};
