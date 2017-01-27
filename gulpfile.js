//var gulp = require('gulp');
//var pug = require('gulp-pug');
//var less = require('gulp-less');
//var minifyCSS = require('gulp-csso');

var gulp = require('gulp');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var nodeResolve = require("rollup-plugin-node-resolve");

gulp.task('rollup', function() {
  return rollup({
      entry: './tests/TestPointWorld.js',
      plugins: [
        nodeResolve({
          // use "module" field for ES6 module if possible
          module: true, // Default: true

          // use "jsnext:main" if possible
          // – see https://github.com/rollup/rollup/wiki/jsnext:main
          jsnext: false, //true,  // Default: false

          // use "main" field or index.js, even if it's not an ES6 module
          // (needs to be converted from CommonJS to ES6
          // – see https://github.com/rollup/rollup-plugin-commonjs
          main: true,  // Default: true

          // if there's something your bundle requires that you DON'T
          // want to include, add it to 'skip'. Local and relative imports
          // can be skipped by giving the full filepath. E.g.,
          // `path.resolve('src/relative-dependency.js')`
          skip: [],//[ 'some-big-dependency' ],  // Default: []

          // some package.json files have a `browser` field which
          // specifies alternative files to load for people bundling
          // for the browser. If that's you, use this option, otherwise
          // pkg.browser will be ignored
          browser: true,  // Default: false

          // not all files you want to resolve are .js files
          extensions: [ '.js'],//, '.json' ],  // Default: ['.js']

          // whether to prefer built-in modules (e.g. `fs`, `path`) or
          // local ones with the same names
          preferBuiltins: false  // Default: true

        })
      ]
    })

    // give the file the name you want to output with
    .pipe(source('src.js'))

    // and output to ./dist/app.js as normal.
    .pipe(gulp.dest('./html'));
});


/*gulp.task('html', function(){
  return gulp.src('client/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/html'))
});

gulp.task('css', function(){
  return gulp.src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});*/

gulp.task("watch", function() {
    gulp.watch(["engine/**/*.js", "game/**/*.js", "tests/**/*.js", "DigMiners.js"], ["rollup"]);
});
gulp.task('default', [ 'watch' ]);
