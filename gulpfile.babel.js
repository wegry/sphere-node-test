import del from 'del'

import gulp from 'gulp'
import run from 'gulp-run'
import less from 'gulp-less'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'
import LessPluginCleanCSS from 'less-plugin-clean-css'

import {extend} from 'underscore'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.js'


const cleancss = new LessPluginCleanCSS({ advanced: true }),
      serverPath = './app/server.js'

gulp.task('server-transpile', () => {
  gulp.src([serverPath])
  .pipe(babel())
  .pipe(gulp.dest('public'))
})

gulp.task('server-watch', ['server-transpile'], () => {
  var server = gls.new('./public/server.js')
  server.start()      
  gulp.watch([serverPath], ['server-transpile'])
  gulp.watch('public/server.js', () => server.start())
})

gulp.task('server', ['server-transpile'], () => {
  var server = gls.new('./public/server.js')
  server.start()  
})

gulp.task('less', () => {
  gulp.src('./less/*.less')
    .pipe(less({
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('./public/'))
})

gulp.task('client', ['less'], () => {
  return gulp.src('./app/app.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public'))
})

gulp.task('client-watch', () => {
  gulp.watch(['./less/*.less'], ['less']);
  return webpack(extend(webpackConfig, {
    watch: true
  }))
    .pipe(gulp.dest('./public'))
})

gulp.task('clean', () => {
  return del([
    'public',
    'output'
    ])
})

gulp.task('test', () => {
  run('npm test').exec()
    .pipe(gulp.dest('output'))
})

gulp.task('dev', ['client-watch', 'server-watch'])

gulp.task('default', ['client', 'server'])