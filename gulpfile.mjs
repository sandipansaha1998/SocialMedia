import gulp from 'gulp';
import cssnano from 'gulp-cssnano'; // Minifies css files
import rev from 'gulp-rev';
import * as del from 'del';
import uglify from 'gulp-uglify-es';
//  Minified CSS task
gulp.task('css', function(done) {
   gulp.src('./assets/**/*.css')
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// Minified JS task
gulp.task('js',function(done){
  gulp.src('./assets/**/*.js')
  .pipe(uglify.default())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
  .pipe(gulp.dest('./public/assets'));
  done();
});

// empty the public assets directory
gulp.task('clean:assets',function(done){
  del.deleteSync('./public/assets');
  done();
})

// 
gulp.task('build',gulp.series('clean:assets','css','js'),function(done){
  console.log("Building assets");
  done();
})

// The callback functions done are called on task completion.