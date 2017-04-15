
process.on('warning', e => console.warn(e.stack));
(() => {
global.isServer = true;

var ModuleLoader = require("./ModuleLoader.js");

var console = require("console");
var fs = require("fs");
var path = require("path");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var present = require('present');
var vm = require("vm");

var srcList = [];
ModuleLoader.loadModule(srcList, {}, "Game/");
for (var i = 0; i < srcList.length; i++) {
    var file = srcList[i];
    var src = fs.readFileSync(file, "utf8");
    var script = new vm.Script(src, { filename: file, displayErrors: true });
    script.runInThisContext();
    //require(file));//eval(src);

}

serverInit(io);
gameInit();
gameModeChange(new GameModeZombieInvasion());
gameModeTick(0.0);

var firstTickTime = process.hrtime();
var tickNum = 0;
var skippedTicks = 0;
var messageCallbacks = {};

// Används inte, men svårt att ta bort detta:
var names = ["Runny", "Buttercup", "Dinky", "Stinky", "Crusty",
    "Greasy", "Gidget", "Cheesypoof", "Lumpy", "Wacky", "Tiny", "Flunky",
    "Fluffy", "Zippy", "Doofus", "Gobsmacked", "Slimy", "Grimy", "Salamander",
    "Oily", "Burrito", "Bumpy", "Loopy", "Snotty", "Irving", "Egbert"];

var lastnames = ["face", "dip", "nose", "brain", "head", "breath",
    "pants", "shorts", "ears", "mouth", "muffin", "butter", "bottom", "elbow",
    "honker", "toes", "buns", "mister", "fanny", "squirt", "chunks",
    "brains", "wit", "juice", "shower"];


var update = function() {
    var server_has_players = (Object.keys(Server.connections).length > 0);
    var diff = process.hrtime(firstTickTime);
    var diff_ms = diff[0] * 1e3 + diff[1] / 1e6;
    var delay = -diff_ms + (tickNum + skippedTicks) * Config.tickDuration;
    if (delay < -Config.tickDuration) {
        var numTicksToSkip = Math.ceil(-delay / Config.tickDuration);
        skippedTicks += numTicksToSkip;
        console.log(numTicksToSkip + " ticks skipped!");
    }
    setTimeout(update, delay);
    if (server_has_players)
        tick(Config.tickDuration / 1000.0);
    tickNum++;
}

var measureTicks = 100;
var currentMeasureTicks = 0;
var totalTickTime = 0;
var tick = function(dt) {
    var tick_begin = process.hrtime();

    serverTick(dt);
    gameTick(dt);
    gameModeTick(dt);
    worldTick(dt);

    var tick_end = process.hrtime(tick_begin);
    totalTickTime += (tick_end[0] * 1e3 + tick_end[1] / 1e6);
    ++currentMeasureTicks;
    if (currentMeasureTicks > measureTicks) {
        var tickMs = totalTickTime / measureTicks;
        console.log(measureTicks + " ticks average: " + tickMs.toFixed(1) + "ms (" + ((tickMs / 50.0 * 100).toFixed(1)) + "%) numEntities: " + World.entities.objectArray.length);
        currentMeasureTicks = 0;
        totalTickTime = 0;
    }
}

http.listen(Config.port, function() {
    console.log("Listening on :3000");
});

update();
})();
