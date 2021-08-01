const gulp = require("gulp")
const sass = require("gulp-sass")(require("node-sass"))
const postcss = require("gulp-postcss")
const concat = require("gulp-concat")
const rename = require("gulp-rename")
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const size = require("gulp-size")
const uglify = require("gulp-uglify")
const browserSync = require("browser-sync").create()

gulp.task("sass", function () {
  let plugin = [autoprefixer()]

  return gulp
    .src("./app/styles/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(plugin))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./app/temp/styles"))
})

gulp.task("watch", function () {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: "app",
    }
  })
  gulp.watch("./app/index.html", function reload(cb) {
    browserSync.reload()
    cb()
  })
  gulp.watch('./app/styles/**/*.scss', gulp.series(['sass', 'cssInject']))
})

gulp.task("cssInject", () => {
  return gulp.src("./app/temp/styles/styles.css").pipe(browserSync.stream())
})
