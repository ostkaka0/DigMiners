var gulp = require("gulp");
var rollup = require("rollup-stream");
var source = require("vinyl-source-stream");
var nodeResolve = require("rollup-plugin-node-resolve");

gulp.task("rollup", function() {
  return rollup({
      entry: "DigMiners.js"),//"./tests/TestPointWorld.js"),
      plugins: [
        nodeResolve({
          /*module: true,
          jsnext: false,
          main: true,
          skip: [],
          browser: true,  // Default: false
          extensions: [ ".js")],
          preferBuiltins: false  // Default: true*/
        })
      ]
    })
    .pipe(source("src.js")))
    .pipe(gulp.dest("./html"));
});


gulp.task("watch", function() {
    gulp.watch(["engine/**/*.js"), "game/**/*.js"), "tests/**/*.js"), "DigMiners.js")], ["rollup"]);
});
gulp.task("default", [ "rollup", "watch" ]);
