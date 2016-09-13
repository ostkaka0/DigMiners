console = require("console");
fs = require("fs");
path = require("path");

var isServer = true;

function loadScript(filePath) {
    console.log("Loading " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    eval(content);
}

function loadScriptsRecursive(dir) {
	var files = fs.readdirSync(dir);
	for(var i = 0; i < files.length; ++i) {
		var filePath = dir + "/"+ files[i];
		var stat = fs.statSync(filePath);

		if (stat.isDirectory())
			loadScriptsRecursive(filePath);
        else if (stat.isFile() && path.extname(filePath) == ".js")
			loadScript(filePath)
	}
}

loadScriptsRecursive("lib");
loadScriptsRecursive("src");

////Unit testing
//loadScript("UnitTest.js");
//loadScriptsRecursive("unit_tests");
//runUnitTests();

var world = new Map2D();
var generator = new Generator();

console.log("\nTODO: Implement server\n");
