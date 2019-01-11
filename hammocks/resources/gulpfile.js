var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');

var BaseDir = './';
var assetsDir = './assets/';
var Dir = {
  Sass: './assets/sass/',
  Css: '../public/css/'
}
var LocalDomain = 'campbug'; // ローカルのドメイン


gulp.task('SassToCss', function() {
	 gulp.src(Dir.Sass+'style.scss')
      .pipe(plumber({
      errorHandler: notify.onError({
        title: "失敗してるよ！", // 任意のタイトルを表示させる
        message: "<%= error.message %>" // エラー内容を表示させる
        })
    }))
      .pipe(sourcemaps.init())
      .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
            cascade: false
         }))
      .pipe(sourcemaps.write('./'))
       .pipe(cssmin()) 
      .pipe(gulp.dest(Dir.Css))
      //.pipe(browserSync.stream());
      .pipe(browserSync.reload({stream: true}));
      
    gulp.src(Dir.Sass+'/pages/**/*.scss')
      .pipe(plumber({
      errorHandler: notify.onError({
        title: "失敗してるよ！", // 任意のタイトルを表示させる
        message: "<%= error.message %>" // エラー内容を表示させる
        })
    }))
      .pipe(sourcemaps.init())
      .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
            cascade: false
         }))
      .pipe(sourcemaps.write('./'))
       .pipe(cssmin()) 
      .pipe(gulp.dest(Dir.Css+'pages/'))
       .pipe(browserSync.stream());
});
 
 gulp.task('browser-sync', function () {
    browserSync({
        proxy: LocalDomain
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
}); 
 
gulp.task('default',['browser-sync'], function() {
    gulp.watch(Dir.Sass+'**/*.scss',['SassToCss']);
    gulp.watch(BaseDir+"**/*.php", ['bs-reload']);
});