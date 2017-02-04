var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var fs = require("fs");
var path = require("path");
var copydir = require('copy-dir');

var rollup = require("rollup-stream");
var nodeResolve = require('rollup-plugin-node-resolve');
var nodeGlobals = require("rollup-plugin-node-globals");
var nodeBuiltins = require("rollup-plugin-node-builtins");
var commonjs = require('rollup-plugin-commonjs');
var amd = require("rollup-plugin-amd");
var multiEntry = require('rollup-plugin-multi-entry');
var pluginRootImport = require("./rollup-plugin-root.js");

gulp.task("browserify", function() {
    var b = browserify();
    b.add("DigMiners.js");
    b.bundle()
        .pipe(source("src.js"))
        .pipe(gulp.dest("./html"));
});

var rollupCache;
gulp.task("rollup", function() {
    rollup({
        entry:  [/* "Game/** /*.js", */"DigMiners.js"], //"tests/TestPointWorld.js",//
        format: 'iife',
        moduleName: 'Game',
        cache: rollupCache,
        plugins: [
            multiEntry(),
            commonjs({
              include: 'node_modules/**',
              extensions: [".js"],
              sourceMap: false,
            }),
            nodeResolve({
                browser: true,  // Default: false
            }),
            nodeBuiltins(),
            //nodeGlobals(),
      ]
    }).on('error', e => {
        console.error(e);
    }).on('bundle', bundle => {
        console.log("Bundling done!");
        //rollupCache = bundle;
    }).pipe(source("src.js")).pipe(gulp.dest("./html"));
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
    gulp.watch(["Engine/**/*.js", "Game/**/*.js", "tests/**/*.js", "DigMiners.js"], ["rollup"]);
});
gulp.task("default", [ "rollup", "watch", "copy" ]);
