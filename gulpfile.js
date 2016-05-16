'use strict';

var gulp = require('gulp');
var fontmin = require('gulp-fontmin');
var htmlToText = require('html-to-text');
var Fontmin = require('fontmin');

gulp.task('font', function() {

	var buffers = [];

	gulp.src("haiyang.io/*.html")
		.on('data', function(file) {
			buffers.push(file.contents);
		})
		.on('end', function() {
			var text = htmlToText.fromString(Buffer.concat(buffers).toString('utf-8'));
      console.log("the text: " + text);
			var fontmin = new Fontmin()
				.src('HYQuanTangShiJ.ttf')
				.use(Fontmin.glyph({
					text: text,
					hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
				}))
				.use(Fontmin.ttf2woff())
				.dest('haiyang.io/');
			fontmin.run(function(err, files) {
				if (err) {
					throw err;
				}

				console.log(files[0]);
				// => { contents: <Buffer 00 01 00 ...> }
			});
		});
});

gulp.task('default', ['serve']);
