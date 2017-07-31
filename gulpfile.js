var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    pug = require('gulp-pug'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

  var path = {
        build: {
            html: 'build/templates',
            css: 'build/css/',
            js: 'build/scripts/',
            img: 'build/img/',
            fonts: 'build/fonts/'
        },
        src: {
            html: 'src/templates/*.pug',
            style: 'src/style/index.scss',
            js: 'src/scripts/*.js',
            img: 'src/img/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        watch: {
            html: 'src/templates/**/*.pug',
            style: 'src/style/**/*.scss',
            js: 'src/scripts/*.js',
            img: 'src/img/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        clean: './build'
    };

    gulp.task('webserver', () => {
        const config = {
            server: {
                baseDir: "./build",
                index: './templates/index.html',
                routes: {
                    'css': '../css',
                    'img': '../img',
                }
            },
            tunnel: false,
            host: 'localhost',
            port: 3000
        };
        browserSync(config);
    });


    gulp.task('html:build', function () {
        gulp.src(path.src.html)
            .pipe(pug().on('error', (err) => console.log(err)))
            .pipe(gulp.dest(path.build.html))
            .pipe(reload({stream: true}));
    });

    gulp.task('style:build', function () {
        gulp.src(path.src.style) //Выберем наш main.scss
            .pipe(sourcemaps.init()) //То же самое что и с js
            .pipe(sass()) //Скомпилируем
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.build.css)) //И в build
            .pipe(reload({stream: true}));
    });

    gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
    });

    gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
    });

    gulp.task('js:build', function() {
        gulp.src(path.src.js)
            .pipe(gulp.dest(path.build.js))
    });


    gulp.task('build', [
    'html:build',
    'style:build',
    'image:build',
    'fonts:build',
    'js:build'
    ]);


    gulp.task('watch', () => {
      watch([path.watch.html], () => {
        gulp.start('html:build');
      });
      watch([path.watch.style], () => {
          gulp.start('style:build');
      });
      watch([path.watch.img], () => {
          gulp.start('image:build');
      });

      watch([path.watch.fonts], () => {
          gulp.start('fonts:build');
      });

      watch([path.watch.js], () => {
          gulp.start('js:build')
      });
    });

gulp.task('default', ['build', 'webserver', 'watch']);
