const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

const browserSync = require('browser-sync')

const paths = {
  scss: 'assets/scss/**/*.scss',
  js: 'assets/js/**/*.js',
  images: 'assets/images/**/*'
}

gulp.task('styles', () => {
  return gulp
    .src(paths.scss)
    .pipe(concat('styles.scss'))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['assets/scss']
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

gulp.task('js', () => {
  return gulp
    .src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('scripts', ['js'], browserSync.reload)

gulp.task('images', () => {
  return gulp
    .src(paths.images)
    .pipe(gulp.dest('dist/images'))
})

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: '../index.html'
    }
  })

  gulp.watch(paths.scss, ['styles'])
  gulp.watch(paths.js, ['scripts'])
  gulp.watch(paths.images, ['images'])
})

gulp.task('default', ['styles', 'js', 'images'])
