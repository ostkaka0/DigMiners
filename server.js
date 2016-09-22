console = require("console");
fs = require("fs");
path = require("path");
app = require("express")();
http = require("http").Server(app);
io = require("socket.io")(http);

var isServer = true;

loadScript = function (filePath) {
    console.log("Loading " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    eval(content);
}

loadScriptsRecursive = function (dir) {
	var files = fs.readdirSync(dir);
	for (var i = 0; i < files.length; ++i) {
		var filePath = dir + "/" + files[i];
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
var players = new Array();

var tickDuration = 1000 / 8;
var firstTickTime = process.hrtime();
var tickNum = 0;

update = function () {
	var now = process.hrtime();

	var diff = process.hrtime(firstTickTime);
	var diff_ms = diff[0] * 1e3 + diff[1] / 1e6;
	var delay = -diff_ms + tickNum * tickDuration;
	setTimeout(update, delay);

	tick();
	tickNum++;
}

tick = function () {
	//console.log("Tick #" + tickNum);
	playerWorld.update();
	entityWorld.update();
}

io.on("connection", function (socket) {
	players[socket.id] = { 'socket': socket };

	players[socket.id].pingIntervalId = setInterval(function () {
		startTime = Date.now();
		socket.emit('ping');
	}, 2000);

	socket.on("disconnect", function () {
		clearInterval(players[socket.id].pingIntervalId);
		delete players[socket.id];
		console.log(socket.id + " disconnected.");
	});

	socket.on('message', function (msg) {
		console.log("Message from " + socket.id + ": " + msg);
    });

	socket.on('command', function (data) {
		setTimeout(function () { io.sockets.emit("command", data) }, 300);
		//console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

    socket.on('ping', function () {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function (time) {
        players[socket.id].ping = 2 * (Date.now() - time);
    });

	console.log(socket.id + " connected.");
});

http.listen(3000, function () {
	console.log("Listening on :3000");
});

update();
console.log("\nTODO: Implement server\n");

