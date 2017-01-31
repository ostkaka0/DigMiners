var gulp = require("gulp");
var rollup = require("rollup-stream");
var source = require("vinyl-source-stream");
var nodeResolve = require("rollup-plugin-node-resolve");
var browserify = require("browserify");
var fs = require("fs");
var path = require("path");
var copydir = require('copy-dir');

gulp.task("rollup", function() {
  return rollup({
      entry: "DigMiners.js",//"./tests/TestPointWorld.js"),
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
    .pipe(source("src.js"))
    .pipe(gulp.dest("./html"));
});

gulp.task("browserify", function() {
    var b = browserify();
    b.add("DigMiners.js");
    b.bundle()
        .pipe(source("src.js"))
        .pipe(gulp.dest("./html"));
});

gulp.task("copy", function() {
    var copyFile = function (src, dest) {
        dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    }
    var copyRecursive = function(dir, dest) {
        console.log(dir, "copying to", dest);
        copydir(dir, dest, function(error) {
            if (error) console.log("Copy error: " + error);
        });
    }
    var outputPath = "html/";

    copyFile("html_index.php", outputPath + "index.php");
    copyFile("style.css", outputPath + "style.css");
    copyFile("bootstrap.min.css", outputPath + "bootstrap.min.css");
    copyFile("tether.min.css", outputPath + "tether.min.css");
    copyRecursive("data/", outputPath + "data");
});


gulp.task("watch", function() {
    gulp.watch(["Engine/**/*.js", "Game/**/*.js", "tests/**/*.js", "DigMiners.js"], ["browserify"]);
});
gulp.task("default", [ "browserify", "watch", "copy" ]);
