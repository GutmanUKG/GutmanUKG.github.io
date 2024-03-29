// import gulp from 'gulp';
// import dartSass from 'sass'
// import gulpSass  from 'gulp-sass'
// import postcss from 'gulp-postcss'
// const postSass = postcss(dartSass)
// const sass = gulpSass(dartSass)
// import sourcemaps  from 'gulp-sourcemaps';
// import image from 'gulp-image';
// import babel from 'gulp-babel'
//
// import autoprefixer from 'gulp-autoprefixer'
// import {create as bsCreate} from 'browser-sync';
//
// const browserSync = bsCreate();
// const pathJs = './assets/js/**/*'
// const pathJsOut = './js'
// const pathScss = './assets/scss/**/*.scss'
// const pathScssOut = './css'
// const pathImg = './assets/imgs/full_imgs/**/*'
// const pathImgOut = './assets/imgs/optimize_imgs'
//
// gulp.task('buildSass', ()=>{
//     return gulp.src(pathScss)
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(autoprefixer({
//             cascade: false ,
//             flexbox: true,
//             grid: true,
//             browsers: ['last 3 versions']
//         }))
//         // .pipe(clean())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(pathScssOut))
//         // .pipe(browserSync.reload())
//         .pipe(browserSync.stream())
// });
//
// gulp.task('img', ()=>{
//     return gulp.src(pathImg)
//         .pipe(image())
//         .pipe(gulp.dest(pathImgOut))
// });
//
//
// gulp.task('buildJs', ()=>{
//     return gulp.src(pathJs)
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(pathJsOut))
//         .pipe(browserSync.stream())
// });
//
// gulp.task('serve',  ()=> {
//     browserSync.init({
//         server: {
//             baseDir: "./",
//             // proxy: 'https://localhost:3000',
//             // https: true
//         }
//     });
//
//     gulp.watch("./css/**/*.css", browserSync.reload);
//     // gulp.watch("./js/**/*.js", browserSync.reload);
//     gulp.watch("./*.html").on('change', browserSync.reload);
// });
//
//
// gulp.task('watch', ()=>{
//     gulp.watch(pathScss, gulp.series('buildSass'))
//     // gulp.watch(pathImg, gulp.series('optimize_imgs'))
//     gulp.watch(pathJs, gulp.series('buildJs'))
//     gulp.watch(pathJs, gulp.series('serve'))
//     gulp.watch(pathScss, gulp.series('serve'))
// });
//
// gulp.task('default', gulp.series('buildSass', 'buildJs'  ,'watch'))
// gulp.task('serve' ,gulp.series('serve'))
// gulp.task('img', gulp.series('img'))
//
//

const gulp = require('gulp');
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
const postcssAnimation = require('postcss-animation')
//Автоматическое скачивание и подлючение шрифтов из GoogleFonts
const pfm = require('postcss-font-magician');
//Включение поддержки импортов
const atImport = require('postcss-import')
//Включение переменных
const pav = require('postcss-advanced-variables')
//Использование БЭМ
const bem = require('postcss-bem')

//SVG sprite
const svgSprite = require('gulp-svg-sprite')
//Компил JS ES6 в ES5
const babel = require('gulp-babel')



const pathJs = './assets/js/**/*'
const pathJsOut = './js'
const pathScss = './assets/scss/**/*.scss'
const pathScssOut = './css'
const pathImg = './assets/imgs/full_imgs/**/*'
const pathImgOut = './assets/imgs/optimize_imgs'
const pathSVG = './assets/imgs/svg/*.svg'
const pathSVGOut = './assets/sprite/'

gulp.task('svg', ()=>{
    return gulp.src(pathSVG)
        .pipe(svgSprite({
            mode: {
                stack:{
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(pathSVGOut))
})
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
        atImport(),
        postcssAnimation(),
        pfm()
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


