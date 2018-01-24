// server.js 
const gulp = require('gulp')
    , connect = require('gulp-connect')
    , browserify = require('gulp-browserify')
    , rename = require('gulp-rename')
    , babel = require('gulp-babel')
    , path = require('path')
    , BASE = path.join(__dirname, '../../')
    , join = b => path.join(BASE, b)
    , WWW_BASE = join('dist')
    , SRC_BASE = join('src')
    , mkdir = require('../mkdir')

// mkdir dir 
mkdir(WWW_BASE); 
console.log('WWW_BASE', WWW_BASE); 

let ALL_WWW_BASE = path.join(WWW_BASE, '**/*'); 
let ALL_SRC_BASE = path.join(SRC_BASE, '**/*');

gulp.task('js-bundle', function(){
    return gulp.src(path.join(SRC_BASE, 'index.js'))
        .pipe(browserify({
			insertGlobals: true, 
			debug: false
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest(WWW_BASE))
}); 

gulp.task('html-css-bundle', function(){
    let html_css = [
        path.join(SRC_BASE, 'index.html'), 
        path.join(SRC_BASE, '**/*.css')
    ]; 

    return gulp.src(html_css)
        .pipe(gulp.dest(WWW_BASE))
}); 

gulp.task('bundle', ['js-bundle', 'html-css-bundle']); 

gulp.task('reload', ['bundle'], function(){
    let temp = [
        ALL_WWW_BASE
    ];

    console.log('reload'); 

    setTimeout(() => {
        gulp.src(temp).pipe(connect.reload()); 
    }, 200); 
}); 


/**
 * @description init and start server
 */
gulp.task('serve', function(){
    connect.server({
        root: WWW_BASE,
        port: 12345,
        livereload: true
    });
    
    gulp.watch(ALL_SRC_BASE, ['bundle']); 
    gulp.watch(ALL_WWW_BASE, ['reload']); 
}); 
