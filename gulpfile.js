var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create();


gulp.task('sass', function () {
  return sass('dev/style/main.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('dev/style'));
});

gulp.task('serve', function(){
    browserSync.init({
        server: "./dev"
    });

    gulp.watch("dev/index.html").on('change', browserSync.reload);

    gulp.watch("dev/style/*.scss", ['sass']);
    gulp.watch("dev/style/*.css").on('change', browserSync.reload);

    gulp.watch("dev/scripts/**/*.js").on('change', browserSync.reload);
});


gulp.task('dist', function(){
    
});