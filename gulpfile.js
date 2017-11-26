/**
 * 1、启动webserver
 * 2、通过反向代理实现mock数据
 * 3、JS模块化开发
 * 4、less编译
 * 5、打包压缩
 * 6、版本号控制
 */

var gulp = require('gulp')

var webserver = require('gulp-webserver')

var webpack = require('gulp-webpack')

var less = require('gulp-less')

var proxy = require('http-proxy-middleware')

var uglify = require('gulp-uglify')

var minifyCss = require('gulp-minify-css')

// 运行 dev-server
gulp.task('webserver', function () {
  gulp.src('./dist/')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
      directoryListing: {
        enable: true,
        path: './dist/'
      },
      // 反向代理
      middleware: [
        proxy('/api', {
          target: 'http://localhost:9000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        })
      ]
    }))
})

// packjs
gulp.task('packjs', function () {
  gulp.src('./src/scripts/app.js')
    .pipe(webpack({
      output: {
        filename: 'app.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'imports-loader',
            exclude: './node_modules'
          },
          {
            test: /\.html$/,
            loader: 'string-loader'
          }
        ]
      }
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
})

// packcss
gulp.task('packless', function () {
  gulp.src('./src/styles/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/styles/'))
})

// copy index到dist目录
gulp.task('packhtml', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
})

// copy iconfonts到dist目录
gulp.task('copyiconfonts', function () {
  gulp.src('./src/iconfonts/**/*')
    .pipe(gulp.dest('./dist/iconfonts'))
})

// copy json到dist目录
gulp.task('copyjson', function () {
  gulp.src('./src/mock/**/*')
    .pipe(gulp.dest('./dist/mock'))
})

// 监测文件的变化
gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['packhtml'])
  gulp.watch('./src/scripts/**/*', ['packjs'])
  gulp.watch('./src/templates/**/*', ['packjs'])
  gulp.watch('./src/styles/**/*', ['packless'])
})

// 默认任务
gulp.task('default', ['packhtml', 'packjs', 'packless', 'copyjson', 'copyiconfonts' ,'watch', 'webserver'], function () {
  console.log('done.');
})
