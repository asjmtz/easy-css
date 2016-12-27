const gulp = require('gulp');
const path = require('path');
const highlightJS = require('highlight.js')
const markdown = require('gulp-markdown');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const ghpages = require('gh-pages');
const sass = require('gulp-sass');

const srcPath = path.join( __dirname, 'src' );
const outputPath = path.join( __dirname, 'dist')

gulp.task('clean', function() {
	return gulp.src( outputPath, { read: false } )
		.pipe( clean() )
})

// we need clean done before marked 
// so add a clean as a dependency in marked task
gulp.task('marked', function() {
	return gulp.src( srcPath + '/**/*.md' )
		.pipe( markdown({
		  	highlight: function (code) {
		    	return highlightJS.highlightAuto(code).value;
		  	}
		}) )
		.pipe( gulp.dest( outputPath ) )
		.pipe(connect.reload())
});

/**
 * copy file to dist
 */
gulp.task( 'normal', function () {
	return gulp.src( ['src/**/*','!src/**/*.md','!src/**/*.scss'] )
		.pipe( gulp.dest( outputPath ) )
		.pipe(connect.reload())
} )



gulp.task('sass',  function () {
  return gulp.src(srcPath + '/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest( outputPath+'/css' ))
    .pipe(connect.reload())
});

gulp.task( 'build', ['marked', 'sass', 'normal']  )

gulp.task('default', [ 'build'  ]);
 
gulp.task('sass:watch', function () {
	return gulp.watch(srcPath + '/css/**/*.scss', ['sass']);
});


gulp.task('marked:watch', function() {
	return gulp.watch( srcPath + '/**/*.md' , ['marked']);
})

gulp.task('normal:watch', function() {
	return gulp.watch( ['src/**/*','!src/**/*.md','!src/**/*.scss'] , ['normal']);
})


gulp.task('watch', ['marked:watch', 'sass:watch', 'normal:watch' ])


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
	    email: 'asjmtzhang@gmail.com'
	  }
	}, function(err) { 
		if( err ){ throw err }
	}); 
} )
