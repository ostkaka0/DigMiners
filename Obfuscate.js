var commander = require("commander");
var browserify = require("browserify");
var fs = require("fs");
var path = require("path");
var stream = require("stream");
//var yuicompressor = require('yuicompressor');
var UglifyJS = require("uglify-js");
var util = require("util");
var path = require("path");
var commander = require("commander");
var copydir = require('copy-dir');
var babylon = require("babylon")
var babel = require("babel-core");
var through = require("through2");

var NameMangler = require("./NameMangler.js");

var outputPath = "./html/";

commander.version('0.0.1')
    .usage("[options]")
    .option("-o, --output <s>", "Output directory")
    .option("-d, --debug", "Debug mode. Mangling will only add underline to names, no minification")
    .parse(process.argv)

if (commander.output)
    outputPath = commander.output + "/";

if (commander.debug)
    console.log("Debug mode enabled");

console.log("Output directory:" + outputPath);
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

var transform = function(file) {
    console.log("transforming", file);
    return through(function(buf, enc, next) {
        process.stdout.write(".");
        this.push(buf.toString("utf8"));
        next();
    });
}

function run() {
    var b = browserify();
    var stream = b
        .add("./DigMiners.js")
        //.add("./server.js")
        //.transform(transform)
        .bundle();

    var src = "";
    var reservedKeywords = [];

    console.log("Bundling...")
    b.on("file", function(file, id, parent) {
        process.stdout.write(".");
        //console.log("reading", file);
        //if (!id.endsWith(".js")) return;
        //console.log(id);
        //if (id.startsWith(".Game") || id.startsWith(".Engine"))
        //    return;
        //var fileSrc = fs.readFileSync(file, "utf-8");
        //reservedKeywords = reservedKeywords.concat(NameMangler.reserveWords(fileSrc));
    })
    stream.on("data", function(data) { src += data; });
    stream.on("end", function() {
        console.log("\nBundling done!");
        console.log("Length:", src.length, "char");

        console.log("Babeling...");
        var babelOptions = {
            "presets": ["es2015"],
            "plugins": [/*"remove-comments"*/]
        };
        var result = babel.transform(src, babelOptions) // => { code, map, ast }
        src = result.code;

        //src = NameMangler.mangle(src, reservedKeywords);

        console.log("Minifying...");
        try {
            var uglyResult = UglifyJS.minify(src, {
                fromString: true,
                mangleProperties: 2,
                mangle: true
            });
            src = uglyResult.code;
        } catch (error) {
            console.log(error);
        }

        console.log("Copying...");

        copyFile("html_index.php", outputPath + "index.php");
        copyFile("style.css", outputPath + "style.css");
        copyFile("bootstrap.min.css", outputPath + "bootstrap.min.css");
        copyFile("tether.min.css", outputPath + "tether.min.css");
        copyRecursive("data/", outputPath + "data");

        fs.writeFile(outputPath + "src.js", src, function(err) {
            if (err)
                console.log(err);
        });

        console.log("done!");

    });
}

var loadRecursive = function(dir, load, except) {
    var files = fs.readdirSync(dir);
    for(var i = 0; i < files.length; ++i) {
        var filePath = dir + "/" + files[i];
        var stat = fs.statSync(filePath);

        if(stat.isDirectory())
            loadRecursive(filePath, load);
        else if(stat.isFile() && path.extname(filePath) == ".js")
            load(filePath)
    }
}

var copyFile = function (src, dest) {
    console.log("Copying:", src, "\t->\t", dest);
    dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}

var copyRecursive = function(dir, dest) {
    copydir(dir, dest, function(error) {
        if (error) console.log("Copy error: " + error);
    });
}

run();
