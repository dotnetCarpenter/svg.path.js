module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		bwr: grunt.file.readJSON('bower.json'),
		pkg: grunt.file.readJSON('package.json'),
		banner: '/** <%= pkg.main || pkg.name %>.js - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed under the <%= pkg.license %> license */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: "block"
			},
			dist: {
				src: ['<%= pkg.name %>.js'],
				dest: '<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: '<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				globals: { "window": true, "SVG": true }
			},
			svgpathfile: {
				src: 'svg.path.js'
			}
		},
		watch: {
			svgpathfile: {
				files: '<%= jshint.svgpathfile.src %>',
				tasks: ['jshint:svgpathfile']
			}
		},
    bower: {
      install: {
        options: {
          targetDir: "spec/lib/",
          cleanup: true
        }
      }
    }
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('update', ['bower']);

};