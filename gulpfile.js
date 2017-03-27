var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
// var mongoPopulator = require('gulp-mongo-populator');

var jsFiles = ['./express-server/*.js', '.express-server/app/**/*.js'];

gulp.task('serve', ['style', 'inject'], function() {
    var options = {
        script: './express-server/server.js',
        delayTime: 1,
        env: {
            'PORT': process.env.PORT || 3000
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting.....');
        });
});

gulp.task('inject', function () {
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css'], {read: false});
    var options = {
        ignorePath: '/public'
    };

    return gulp.src('./src/*.html')
        .pipe(inject(injectSrc, options))
        .pipe(gulp.dest('./src'));
});

gulp.task('style', function () {
    return gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {
        verbose: true,
    }))
      .pipe(jscs());
});

// gulp.task('populate', function () {
//     return gulp.src('./db/initial-state/*.json')
//     .pipe(mongoPopulator('adverse-events'));
// });
