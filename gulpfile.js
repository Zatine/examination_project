var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    inject = require('gulp-inject'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();


gulp.task('sass', function () {
  return sass('dev/style/main.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['>5%', 'IE 9']
    }))
    .pipe(gulp.dest('dev/style'));
});

gulp.task('inject-index', function(){
  var target = gulp.src('./dev/index.html'),
      sources = gulp.src(['scripts/**/*.js', 'style/*.css'], {read: false, cwd: __dirname + '/dev'});
  
  return target.pipe(inject(sources)) 
         .pipe(gulp.dest('./dev'));
});

gulp.task('serve', function(){
    browserSync.init({
        server: "./dev",
        online: false
    });

    gulp.watch("dev/index.html").on('change', browserSync.reload);

    gulp.watch("dev/style/*.scss", ['sass']);
    gulp.watch("dev/style/*.css").on('change', browserSync.reload);
    gulp.watch("dev/style/*.css", function(event){
      if(event.type === 'added' || event.type === 'deleted'){
        gulp.start('inject-index');
      }
    });

    gulp.watch("dev/scripts/**/*.js").on('change', browserSync.reload);
    gulp.watch("dev/scripts/**/*.js", function(event){
      if(event.type === 'added' || event.type === 'deleted'){
        gulp.start('inject-index');
      }
    });
});


gulp.task('dist', function(){
    
});