import gulp from 'gulp';
import {create as bsCreate} from 'browser-sync';

const browserSync = bsCreate();


gulp.task('serve',  ()=> {
    browserSync.init({
        server: {
            baseDir: "./",
            // proxy: 'https://localhost:3000',
            // https: true
        }
    });

    gulp.watch("./assets/css/*.css", browserSync.reload);
    gulp.watch("./assets/js/*.js", browserSync.reload);
    // gulp.watch("./js/**/*.js", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'))