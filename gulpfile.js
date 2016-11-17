var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

// Server
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8080,
        livereload: true
    });
});

// Sends assets to the dist folder
gulp.task('assets',function() {
    gulp.src('src/images/**')
      .pipe( gulp.dest('./dist/images') );
    gulp.src('src/*.html')
      .pipe(gulp.dest('./dist/'));
    gulp.src('bower_components/jQuery/dist/jquery.min.js')
      .pipe( gulp.dest('./dist/js/jquery/'));
    gulp.src('bower_components/font-awesome/fonts/**')
      .pipe( gulp.dest('./dist/fonts/'));    
});

// Compiles sass
gulp.task('sass', function() {
    return gulp
        .src('./src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['bower_components/font-awesome/scss']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

// Watches for changes on the source files
gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['assets']);
});

// Default task
gulp.task('default', ['connect', 'assets', 'sass', 'watch']);