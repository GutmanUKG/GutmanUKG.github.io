const gulp = require('gulp')
//Плагины для postcss
const postcss = require('gulp-postcss')
//Переименование файла
const rename = require('gulp-rename');
//Автопрефиксы
const autoprefixer = require('autoprefixer');
//из scss в css
const Nested = require('postcss-nested')
//Автообновление браузреа
const browserSync = require('browser-sync').create();
//Карта
const sourcemaps = require('gulp-sourcemaps')
//Поддержка css4
const postcssPresetEnv = require('postcss-preset-env');
//Автоматическое скачивание и применение анимаций из animate.css
const postcssAnimation = require('postcss-animation');
//Автоматическое скачивание и подлючение шрифтов из GoogleFonts
const pfm = require('postcss-font-magician');
//Включение поддержки импортов
const atImport = require('postcss-import')
//Включение переменных
const pav = require('postcss-advanced-variables')
//Компил JS ES6 в ES5
const babel = require('gulp-babel')

const pathJs = './assets/js/**/*'
const pathJsOut = './js'
const pathScss = './assets/scss/main.scss'
const pathScssOut = './css'
const pathImg = './assets/imgs/full_imgs/**/*'
const pathImgOut = './assets/imgs/optimize_imgs'


gulp.task('serve',  ()=> {
    browserSync.init({
        server: {
            baseDir: "./",
        }
    });
    gulp.watch("./css/**/*.css", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('buildJs', ()=>{
    return gulp.src(pathJs)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pathJsOut))
        .pipe(browserSync.stream())
});



gulp.task('buildSass', function () {
    let plugins = [
        autoprefixer({browsers: ['last 2 version']}),
        require('postcss-advanced-variables'),
        require('postcss-import')(),
        Nested(),
        postcssPresetEnv(),
        postcssAnimation(),
        pfm({
            hosted: ['./fonts']
        }),
    ];
    return gulp.src(pathScss)
        .pipe(postcss(plugins))

        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(pathScssOut))
        .pipe(browserSync.stream())
});

gulp.task('watch', ()=>{
    gulp.watch(pathScss, gulp.series('buildSass'))
    // gulp.watch(pathImg, gulp.series('optimize_imgs'))
    gulp.watch(pathJs, gulp.series('buildJs'))
    gulp.watch(pathJs, gulp.series('serve'))
    gulp.watch(pathScss, gulp.series('serve'))
})
gulp.task('default', gulp.series('buildSass', 'buildJs',  'watch'))