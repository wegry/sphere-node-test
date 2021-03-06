import del from 'del'

import gulp from 'gulp'
import run from 'gulp-run'
import less from 'gulp-less'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import gls from 'gulp-live-server'
import minifyCSS from 'gulp-minify-css'

import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.js'


gulp.task('default', ['client', 'server'])

gulp.task('dev', ['client-watch', 'server-watch'])

gulp.task('server', ['server-transpile'], () => {
  var server = gls.new('public/server.js')
  server.start()  
})

gulp.task('server-transpile', () =>
  gulp.src(['app/server.js'])
  .pipe(babel())
  .pipe(gulp.dest('public'))
)

gulp.task('server-watch', ['server-transpile'], () => {
  var server = gls.new('public/server.js')
  server.start()      

  gulp.watch(['app/server.js'], ['server-transpile'])
  gulp.watch('public/server.js', () => server.start())
})

gulp.task('client', ['less', 'markup', 'client-pack'])

gulp.task('client-pack', () =>
  gulp.src('app/app.jsx')
    .pipe(webpack(webpackConfig))
    // .pipe(uglify())
    .pipe(gulp.dest('public')))

gulp.task('client-watch', ['client'], () => {
  gulp.watch('app/*.jsx', ['client-pack'])
  gulp.watch('less/*.less', ['less'])
  gulp.watch('html/*.html', ['markup'])
})

gulp.task('markup', () =>
  gulp.src('html/*.html')
    .pipe(gulp.dest('public'))
)

gulp.task('less', () =>
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename(path => path.basename += '.min'))
    .pipe(gulp.dest('public')))

gulp.task('clean', () =>
  del(['public']))

gulp.task('test', () => 
  run('npm test').exec()
    .pipe(gulp.dest('output')))