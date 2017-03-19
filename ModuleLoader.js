var Path = require("path");
var FS = require("fs");

exports.loadModule = function(fileList, fileTable, path) {
    path = Path.normalize(path);
    if (fileTable[path]) return;
    fileTable[path] = path;
    console.log(path);

    var moduleFilePath = path + "jsmodule";
    var depsCode = (FS.existsSync(moduleFilePath))? FS.readFileSync(moduleFilePath, "utf8") : null;
    if (depsCode) {
        var lines = depsCode.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var filePath = path + lines[i].split("//", 1)[0].trim();
            if (!FS.existsSync(filePath)) {
                console.error("Warning: File/Dir does not exist:", filePath);
                continue;
            }
            var stat = FS.statSync(filePath);
            if (stat.isDirectory())
                exports.loadModule(fileList, fileTable, filePath);
            else if (stat.isFile() && Path.extname(filePath) == ".js")
                exports.loadModuleFile(fileList, fileTable, filePath);
        }
    }

    var dirs = [];
    var files = [];
    var filePaths = FS.readdirSync(path);
    for(var i = 0; i < filePaths.length; ++i) {
        var filePath = path + "/" + filePaths[i];
        var stat = FS.statSync(filePath);

        if(stat.isDirectory())
            dirs.push(filePath);
        else if(stat.isFile() && Path.extname(filePath) == ".js")
            files.push(filePath);
    }
    for (var i = 0; i < files.length; i++)
        exports.loadModuleFile(fileList, fileTable, files[i]);
    for (var i = 0; i < dirs.length; i++)
        exports.loadModule(fileList, fileTable, dirs[i]);
}

exports.loadModuleFile = function(fileList, fileTable, path) {
    path = Path.normalize(path);
    if (fileTable[path]) return;
    fileTable[path] = path;
    fileList.push(path);
    console.log(path);
}

exports.loadModule([], [], "Game/");
