import del from 'del'
import gulp from 'gulp'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'

import {extend} from 'underscore'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.js'


gulp.task('server-transpile', () => {
  gulp.src(['./server.js'])
  .pipe(babel())
  .pipe(gulp.dest('dist'))
})

gulp.task('server-watch', ['transpile'], () => {
  var server = gls.new('dist/server.js')
  server.start()      
  gulp.watch(['./server.js'], ['server-transpile'])
  gulp.watch('dist/server.js', () => server.start())
})

gulp.task('client', () => {
  return gulp.src('./app/details.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public'))
})

gulp.task('client-watch', () => {
    return gulp.src('./app/details.js')
    .pipe(webpack(extend(webpackConfig, {
      watch: true
    })))
    .pipe(gulp.dest('./public'))
})

gulp.task('clean', () => {
  return del([
    'dist/*',
    'public/*.min.js*'
    ])
})

gulp.task('default', ['client', 'server-transpile'])