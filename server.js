console = require("console");
fs = require("fs");
path = require("path");

var isServer = true;

function loadScriptsRecursive(dir) {
	var files = fs.readdirSync(dir);
	for(var i = 0; i < files.length; ++i) {
		var filePath = dir + "/"+ files[i];
		var stat = fs.statSync(filePath);

		if (stat.isDirectory())
			loadScriptsRecursive(filePath);
        else if (stat.isFile()) {
			if (path.extname(filePath) != ".js")
				continue;

			var content = fs.readFileSync(filePath, "utf8");
            console.log("Loading " + filePath + "...");
            eval(content);
		}
	}
}

loadScriptsRecursive("src");

var world = new Map2D();
var generator = new Generator();

console.log("\nTODO: Implement server\n");
