const marked = require('marked');
const fs = require('fs');
const path = require('path');
const highlightJS = require('highlight.js')
marked.setOptions({
  highlight: function (code) {
    return highlightJS.highlightAuto(code).value;
  }
});

const mdDir = path.join(__dirname, '..', 'doc')
const outputPath = path.join( 'src', 'page')

function getBasename (name) {
	return path.basename( name, path.extname(name) )
}

fs.access( outputPath, (err) => {
	if( err ){
		fs.mkdir( outputPath, (err) => { if (err) throw err; } )
	}
} )

fs.readdir( mdDir, (err, files)=>{
  	if (err) throw err;

	console.log('files',err, files)

	files.forEach((filename) => {
		var inputPath = path.join( mdDir, filename )
		fs.readFile( inputPath, 'utf8', (err, data) => {
		  	if (err) throw err;

		  	marked( data, (err, htmlString)=>{
		  		// console.log(htmlString)
		  		fs.writeFile( path.join( outputPath, getBasename(filename) + '.html' ) , htmlString, (err)=>{
		  			if (err) throw err;	
		  		});
		  	} );
		});
	})
})