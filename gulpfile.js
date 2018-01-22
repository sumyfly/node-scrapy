var replace = require('gulp-replace')
var gulp = require('gulp')

gulp.task('svg', function () {
  gulp.src(['./a.svg'])
    .pipe(replace(/<\?xml.*\?>/g, ''))
    .pipe(replace('version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"', ''))
    .pipe(replace(/<title>.*<\/title>/g, ''))
    .pipe(replace(/<desc>.*<\/desc>/g, ''))
    .pipe(replace(/<([a-z]+?)/g, function (x) {
      return '<' + x[1].toUpperCase()
    }))
    .pipe(replace(/<\/([a-z]+?)/g, function (x) {
      return '</' + x[2].toUpperCase()
    }))

    .pipe(replace('<stop', '</stop'))
    .pipe(replace('</stop>', '</stop>'))

    .pipe(replace('stop-color', 'stopColor'))
    .pipe(replace('stroke-width', 'strokeWidth'))
    .pipe(replace('fill-rule', 'fillRule'))

    .pipe(replace('<rect', '</Rect'))
    .pipe(replace('</rect>', '</Rect>'))

    .pipe(gulp.dest('dest'));
})