var commander = require("commander");
var fs = require("fs");
var path = require("path");
var util = require("util");
var path = require("path");
var copydir = require('copy-dir');

var rollup = require("rollup");
var nodeResolve = require('rollup-plugin-node-resolve');
var nodeGlobals = require("rollup-plugin-node-globals");
var nodeBuiltins = require("rollup-plugin-node-builtins");
var commonjs = require('rollup-plugin-commonjs');
var amd = require("rollup-plugin-amd");
var multiEntry = require('rollup-plugin-multi-entry');
var pluginRootImport = require("./rollup-plugin-root.js");

var NameMangler = require("./NameMangler.js");

var createDir = function(dir) {
    if (fs.existsSync(dir)) return;
    createDir(path.resolve(dir, ".."));
    fs.mkdirSync(dir);
}

var run2 = function() {
    var nameExceptions = ["loadTextures", "clearCommands"];
    var catchError = (error) => console.log(error);
    console.log("Prefetching...")
    var strGameFiles = "Game/**/*.js";
    var strServerFile = "server.js";
    var strClientFile = "DigMiners.js"
    var tempFiles = [];
    var gameFiles = [];
    var mangledNames = {};
    loadRecursive("Game", file => gameFiles.push(file));

    if (!fs.existsSync("build/")) fs.mkdirSync("build/");
    if (!fs.existsSync("build/html/")) fs.mkdirSync("build/html/");

    var isGameFile = function(file) {
        if (!file.endsWith(".js")) return false;
        return (file.includes("Engine/") || file.includes("Game/") || file.includes("engine/") || file.includes("game/") || file.includes(strServerFile) || file.includes(strClientFile));
    }

    bundleCode("./", gameFiles.concat([strServerFile, strClientFile])).then((cache) => {
        console.log("Prefetch done!");
        console.log("Mangling...");

        cache.modules.pop(); // Last file is generated by rollup-plugin-multi-entry

        // Add name exceptions from node_modules
        for (var i = 0; i < cache.modules.length; i++) {
            var cacheModule = cache.modules[i];
            var moduleCode = cacheModule.code;
            var moduleId = cacheModule.id;
            if (isGameFile(moduleId)) continue;
            console.log("reserving", moduleId);
            var tokens = NameMangler.scan(moduleCode);
            nameExceptions = nameExceptions.concat(NameMangler.reserveNames(tokens));
        }
        // Generate mangled words:
        for (var i = 0; i < cache.modules.length; i++) {
            var cacheModule = cache.modules[i];
            var moduleCode = cacheModule.code;
            var moduleId = cacheModule.id;
            if (!isGameFile(moduleId)) continue;
            var tokens = NameMangler.scan(moduleCode);
            NameMangler.genNames(mangledNames, tokens, nameExceptions, false);
        }

        console.log(mangledNames);

        // Mangle words:
        for (var i = 0; i < cache.modules.length; i++) {
            var cacheModule = cache.modules[i];
            //var moduleCode = "";//cacheModule.originalCode;
            var moduleId = cacheModule.id;
            if (!isGameFile(moduleId)) continue;
            console.log("mangling", moduleId);
            var relativePath = path.relative(process.cwd(), moduleId);
            var moduleCode = fs.readFileSync(relativePath, "utf8");
            var tokens = NameMangler.scan(moduleCode);
            NameMangler.mangle(tokens, mangledNames);
            tokens.forEach(token=>console.log(token));
            moduleCode = "\n" + NameMangler.genJS(tokens) + "\n";
            //console.log(moduleCode);
            var dirPath = "temp/" + path.dirname(relativePath);
            //cacheModule.code = moduleCode;
            createDir(dirPath);
            fs.writeFileSync("temp/" + relativePath, moduleCode);
            tempFiles.push("temp/" + relativePath);
            //cacheModule.originalCode = moduleCode;
            //console.log(moduleCode);
            //cacheModule.ast = null;//console.log("ast:", cacheModule.ast);
        }
        fs.writeFileSync("NameMangler.log", JSON.stringify(mangledNames, null, "\t"));

        bundleCode("temp/", gameFiles.concat([strServerFile]), null).then((bundle) => {
            console.log("Bundling done");
            var result = bundle.generate({
                // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
                format: 'iife',
                moduleName: "notSureWhatThisIsFor",
            });
            fs.writeFileSync("build/server.js", result.code);

            /*bundleCode("temp/", gameFiles.concat([strClientFile]), null).then((bundle) => {
                var result = bundle.generate({
                    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
                    format: 'iife',
                    moduleName: "notSureWhatThisIsFor",
                });
                fs.writeFileSync("build/html/src.js", "var global = window;\n" + result.code)
*/
                // Remove temporary files:
                tempFiles.forEach(file => {
                    return;
                    console.log("removing", file);
                    if (fs.existsSync(file))
                        fs.unlinkSync(file);
                });

            //}).catch(catchError);
        }).catch(catchError);

    }).catch(catchError);
}

var bundleCode = function(rootDir, srcFiles, cache, inPlugins) {
    var importStr = "";
    for (var i = 0; i < srcFiles.length; i++) {
        importStr = importStr + "import \"" + srcFiles[i] + "\";\n";
    }
    fs.writeFileSync(rootDir + "TEMP_MAIN.js", importStr);

    return rollup.rollup({
        entry: rootDir + "TEMP_MAIN.js",// srcFiles,//["Game/**/*.js", "DigMiners.js"], //"tests/TestPointWorld.js",//
        cache: cache,
        plugins: [
            //multiEntry(),
            pluginRootImport({
                // Will first look in `client/src/*` and then `common/src/*`.
                root: __dirname + rootDir,
                useEntry: 'prepend',

                // If we don't find the file verbatim, try adding these extensions
                extensions: '.js'
            }),
            //amd(),
            commonjs({
              // non-CommonJS modules will be ignored, but you can also
              // specifically include/exclude files
              include: 'node_modules/**',  // Default: undefined
              exclude: [ ],  // Default: undefined

              extensions: [".js"],
              //ignoreGlobal: true,
              sourceMap: false,
              // explicitly specify unresolvable named exports
              // (see below for more details)
              //namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
            }),
            nodeResolve({
                module: true, // Default: true

                // use "jsnext:main" if possible
                // – see https://github.com/rollup/rollup/wiki/jsnext:main
                jsnext: false,  // Default: false

                // use "main" field or index.js, even if it's not an ES6 module
                // (needs to be converted from CommonJS to ES6
                // – see https://github.com/rollup/rollup-plugin-commonjs
                main: true,  // Default: true

                skip: [ ],  // Default: []

                // some package.json files have a `browser` field which
                // specifies alternative files to load for people bundling
                // for the browser. If that's you, use this option, otherwise
                // pkg.browser will be ignored
                browser: true,  // Default: false

                extensions: [ '.js', '.json' ],  // Default: ['.js']

                // whether to prefer built-in modules (e.g. `fs`, `path`) or
                // local ones with the same names
                preferBuiltins: true  // Default: true
            }),
            nodeBuiltins(),
            //nodeGlobals(),
            //amd(),
      ]
  });
}

function run() {
    // used to track the cache for subsequent bundles
    var cache;
    console.log("rollup:", rollup);
    rollup.rollup({
        entry: ["Engine/Quadtree.js"],//["Game/**/*.js", "DigMiners.js"], //"tests/TestPointWorld.js",//
        cache: cache,
        plugins: [
            multiEntry(),
            //amd(),
            commonjs({
              // non-CommonJS modules will be ignored, but you can also
              // specifically include/exclude files
              include: 'node_modules/**',  // Default: undefined
              exclude: [ ],  // Default: undefined

              extensions: [".js"],
              //ignoreGlobal: true,
              sourceMap: false,
              // explicitly specify unresolvable named exports
              // (see below for more details)
              //namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
            }),
            nodeResolve({
                module: true, // Default: true

                // use "jsnext:main" if possible
                // – see https://github.com/rollup/rollup/wiki/jsnext:main
                jsnext: false,  // Default: false

                // use "main" field or index.js, even if it's not an ES6 module
                // (needs to be converted from CommonJS to ES6
                // – see https://github.com/rollup/rollup-plugin-commonjs
                main: true,  // Default: true

                skip: [ ],  // Default: []

                // some package.json files have a `browser` field which
                // specifies alternative files to load for people bundling
                // for the browser. If that's you, use this option, otherwise
                // pkg.browser will be ignored
                browser: true,  // Default: false

                extensions: [ '.js', '.json' ],  // Default: ['.js']

                // whether to prefer built-in modules (e.g. `fs`, `path`) or
                // local ones with the same names
                preferBuiltins: true  // Default: true
            }),
            nodeBuiltins(),
            //nodeGlobals(),
            //amd(),
      ]
    }).then(function (bundle) {
        console.log("THEN");
        var result = bundle.generate({
            // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
            format: 'iife',
            moduleName: "notSureWhatThisIsFor",
        });
        cache = bundle;
        console.log("bundle", bundle);
        var src = result.code + "";
        src = src.replace("global", "window");
        fs.writeFileSync("html/src.js", "var global = window;\n" + src);
        console.log("DONE!");
        // Alternatively, let Rollup do it for you
        // (this returns a promise). This is much
        // easier if you're generating a sourcemap
        /*bundle.write({
            format: 'cjs',
            dest: 'bundle.js'
        });*/
    }).catch(function(error) {
        console.log(error);
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


run2();