/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var args = require('yargs').argv;
var config = require('./gulp.config')();
var gulp = require('gulp');
var path = require('path');
var webserver = require('gulp-webserver');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({
    lazy: true,
    rename: {
        'gulp-sass': 'sass',
        'gulp-clean-css' : 'cleanCSS'
    }
});

var colors = $.util.colors;

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Compile Sass to CSS
 * @return {Stream}
 */
gulp.task('styles', [], function() {
    log('Compiling Sass --> CSS');

    return gulp
        .src(config.sassRoot)
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.build));
});

/**
 * Watch and
 * Compile Sass to CSS
 */
gulp.task('styles-watcher', function() {
    gulp.watch([config.sass], ['styles']);
});

/**
* Compress app and js libraries
*/
gulp.task('compress-lib-js', function(){

    return gulp
        .src(config.allLibjs)
        .pipe($.concat(config.optimized.lib))
        .pipe($.uglify())
        .pipe(gulp.dest(config.build));
});

gulp.task('compress-app-js', function(){

    return gulp
        .src(config.allAppJs)
        .pipe($.concat(config.optimized.app), {newLine: ';'})
        //.pipe($.uglify())
        .pipe(gulp.dest(config.build));
});

/**
 * Watch and
 * Compile all controller, services and modules
 */
gulp.task('js-watcher', function() {
    gulp.watch([config.allAppJs], ['compress-app-js']);
});

/**
*Webserver
*/
gulp.task('webserver', function() {
    log(' Webserver is opening on browser ');

    return gulp
        .src('./')
        .pipe(webserver(config.serverOptions));
});

/**
* Multiple task in one -- Webserver , styles-watcher
*/
gulp.task('run', ['styles', 'compress-lib-js', 'compress-app-js', 'webserver', 'js-watcher', 'styles-watcher'], function(){
    log('Webserver and style watcher running');
});

/**
* Test Environment -- Styles, Compress-js and Compress-app
*/
gulp.task('testEnvironment', ['styles', 'compress-lib-js', 'compress-app-js'], function(){
    log('test Environment');
});

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Log an error message and emit the end of a task
 */
function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
 function log(msg) {
     if (typeof(msg) === 'object') {
         for (var item in msg) {
             if (msg.hasOwnProperty(item)) {
                 $.util.log($.util.colors.blue(msg[item]));
             }
         }
     } else {
         $.util.log($.util.colors.blue(msg));
     }
 }

module.exports = gulp;
