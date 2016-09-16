console = require("console");
fs = require("fs");
path = require("path");

var isServer = true;

loadScript = function(filePath) {
    console.log("Loading " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    eval(content);
}

loadScriptsRecursive = function(dir) {
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

//Unit testing
loadScript("UnitTest.js");
loadScriptsRecursive("unit_tests");
runUnitTests();

var playerWorld = new ObjectWorld();
var entityWorld = new ObjectWorld();
var tileWorld = new Map2D();
var generator = new Generator();

var tickDuration = 1000/8;
var firstTickTime = process.hrtime();
var tickNum = 0;

update = function() {
	var now = process.hrtime();
	
	var diff = process.hrtime(firstTickTime);
	var diff_ms = diff[0]*1e3 + diff[1]/1e6;
	var delay = -diff_ms + tickNum * tickDuration;
	setTimeout(update, delay);
	
	tick();
	tickNum++;
}

tick = function() {
	console.log("Tick #" + tickNum);
	playerWorld.update();
	entityWorld.update();
}

update();
console.log("\nTODO: Implement server\n");

