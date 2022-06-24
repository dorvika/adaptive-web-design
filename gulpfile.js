import del from "del";
import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";

const sass = gulpSass(dartSass);
const bSync = browserSync.create();

function clean() {
  return del("dist");
}

function buildCSS() {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 4 versions"] }))
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist"));
}

function buildJS() {
  return gulp
    .src("src/**/*.js")
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest("dist"));
}

function buildImages(done) {
  gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
  done();
}

function liveServer() {
  bSync.init({
    server: {
      baseDir: "./",
    },
  });
}

export function dev() {
  liveServer();
  gulp
    .watch(["src/**/*.js", "src/**/*.scss"], gulp.parallel(buildCSS, buildJS))
    .on("change", () => bSync.reload());
}

export const build = gulp.series(
  clean,
  gulp.parallel(buildCSS, buildJS, buildImages)
);

export default build;
