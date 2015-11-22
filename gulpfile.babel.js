import del from 'del'
import gulp from 'gulp'
import run from 'gulp-run'
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

gulp.task('server-watch', ['server-transpile'], () => {
  var server = gls.new('./dist/server.js')
  server.start()      
  gulp.watch(['./server.js'], ['server-transpile'])
  gulp.watch('dist/server.js', () => server.start())
})

gulp.task('server', ['server-transpile'], () => {
  var server = gls.new('./dist/server.js')
  server.start()  
})

gulp.task('client', () => {
  return gulp.src('./app/app.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public'))
})

gulp.task('client-watch', () => {
    return webpack(extend(webpackConfig, {
      watch: true
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('clean', () => {
  return del([
    'dist/*',
    'public/*.min.js*'
    ])
})

gulp.task('test', () => {
  run('npm test').exec()
    .pipe(gulp.dest('output'))
})

gulp.task('dev', ['client-watch', 'server-watch'])

gulp.task('default', ['client', 'server'])