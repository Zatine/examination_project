var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-ruby-sass'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    mainBowerFiles = require('main-bower-files'),
    runSequence = require('run-sequence');

var devDest = './dev/',
    distDest = './dist/';

gulp.task('bower', function(){
    var files = mainBowerFiles();
  
    return gulp.src(mainBowerFiles({
              overrides: {
                  angular: {
                      main: [
                          'angular.min.js'
                      ]
                  }
              }
            }))
           .pipe(gulp.dest('dev/lib'));
});

gulp.task('inject-bower', function(){
  var target = gulp.src(devDest + '*.html'),
      lib = gulp.src(['lib/*.js'], {cwd: __dirname + '/dev'});
  
  return target.pipe(inject(lib, {starttag: '<!-- inject:head:{{ext}} -->'}))
         .pipe(gulp.dest(devDest));
});

gulp.task('inject-html', function(){
  var target = gulp.src(devDest + '*.html'),
      sources = gulp.src(['scripts/**/*.js', 'style/*.css'], {read: false, cwd: __dirname + '/dev'});
  
  return target.pipe(inject(sources)) 
         .pipe(gulp.dest(devDest));
});

gulp.task('sass', function () {
  return sass(devDest + 'style/main.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '>5%','ie >= 9']
    }))
    .pipe(gulp.dest(devDest + 'style'));
});

gulp.task('serve', function(){
    browserSync.init({
        server: devDest
    });

    gulp.watch(devDest + "index.html").on('change', browserSync.reload);

    gulp.watch(devDest + "style/*.scss", ['sass']);
    gulp.watch(devDest + "style/*.css").on('change', browserSync.reload);
    gulp.watch(devDest + "style/*.css", function(event){
      if(event.type === 'added' || event.type === 'deleted'){
        gulp.start('inject-html');
      }
    });

    gulp.watch(devDest + "scripts/**/*.js").on('change', browserSync.reload);
    gulp.watch(devDest + "scripts/**/*.js", function(event){
      if(event.type === 'added' || event.type === 'deleted'){
        gulp.start('inject-html');
      }
    });
});

gulp.task('minify-html', function(){
	return gulp.src(devDest + '*.html')
          .pipe(htmlmin({collapseWhitespace: true}))
          .pipe(gulp.dest(distDest));
});

gulp.task('minify-js', function(){
	return gulp.src([devDest + 'scripts/app.js', devDest + 'scripts/**/*.js'])
          .pipe(concat('main.js'))
          //.pipe(uglify('main.js'))
          .pipe(gulp.dest(distDest + 'scripts'));
});

gulp.task('minify-css', function(){
    return gulp.src(devDest + 'style/*.css')
           .pipe(concat('style.css'))
           .pipe(cleanCSS({compatibility: 'ie9'}))
           .pipe(gulp.dest(distDest + 'style'));
});

gulp.task('optimize-images', function(){
  return gulp.src(devDest + 'img/*')
         .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}]
          })
         )
        .pipe(gulp.dest(distDest + 'img'));
});

gulp.task('get-fonts', function() {
    return gulp.src(devDest + 'fonts/**/*')
        .pipe(gulp.dest(distDest + 'fonts'));
});

gulp.task('get-lib', function() {
    return gulp.src(devDest + 'lib/*')
        .pipe(gulp.dest(distDest + 'lib'));
});

gulp.task('clean-dist', function(callback) {
    return gulp.src(distDest, {read: false})
           .pipe(clean());
});

gulp.task('inject-dist', function(){
    var target = gulp.src(distDest + '*.html'),
      lib = gulp.src(['lib/*.js'], {cwd: __dirname + '/dist'}),
      sources = gulp.src(['scripts/*.js', 'style/*.css'], {read: false, cwd: __dirname + '/dist'});

  return target.pipe(inject(lib, {starttag: '<!-- inject:head:{{ext}} -->'}))
         .pipe(inject(sources)) 
         .pipe(gulp.dest(distDest));
});

gulp.task('serve-dist', function(){
    browserSync.init({
        server: distDest
    });

});
  
gulp.task('default', ['bower', 'inject-bower', 'serve']);


gulp.task('build', ['minify-html', 'minify-js', 'minify-css', 'get-lib', 'optimize-images', 'get-fonts', 'serve-dist'], function(callback){
      runSequence(
        ['inject-dist'],
        callback
    );
});