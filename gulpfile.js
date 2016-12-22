const gulp = require('gulp');
const path = require('path');
const highlightJS = require('highlight.js')
const markdown = require('gulp-markdown');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const ghpages = require('gh-pages');

const srcPath = path.join( __dirname, 'src' );
const outputPath = path.join( __dirname, 'dist')

gulp.task('clean', function() {
	gulp.src( outputPath + '/**/*', { read: false } )
		.pipe( clean() )
})

gulp.task('default', [ 'clean', 'marked' ], function() {
	gulp.src( [srcPath + '/**/*','!/**/*.md'] )
		.pipe( gulp.dest( outputPath ) )
		.pipe(connect.reload())
});

gulp.task('marked', function() {
	gulp.src( srcPath + '/**/*.md' )
		.pipe( markdown({
		  	highlight: function (code) {
		    	return highlightJS.highlightAuto(code).value;
		  	}
		}) )
		.pipe( gulp.dest( outputPath ) )
});

gulp.task('watch', function() {
	gulp.watch( 'src/**/*' , ['default']);
})

gulp.task('dev', [ 'default', 'watch'], function () {
	connect.server({
	    name: 'Dist App',
	    root: 'dist',
	    livereload: true
  	});

});
 
gulp.task( 'publish', ['default'], function(){

	ghpages.publish( outputPath , {
	  user: {
	    name: 'asjmtz',
	    email: 'asjmtz@gmail.com'
	  }
	}, function(err) { 
		if( err ){ throw err }
	}); 
} )
// gulp.task('connectDev', function () {
//   	connect.server({
// 	    name: 'Dev server',
//     	root: 'src',
//     	livereload: true
//   	});
// });

// gulp.task('connectDist', function () {
// 	connect.server({
// 	    name: 'Dist App',
// 	    root: 'dist',
// 	    port: 8001,
// 	    livereload: true
//   	});
// });