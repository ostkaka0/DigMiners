global.isServer = true;

/*import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Event from "Engine/Core/Event.js";

import Config from "Game/Config.js";
import gameData from "Game/GameData.js";
import Items from "Game/Items.js";
import Blocks from "Game/Blocks.js";
import Tiles from "Game/Tiles.js";
import RegisterMessage from "Engine/Register/Message.js";

import MessageCommands from "Game/Message/ToClient/Commands.js";
import CommandPlayerJoin from "Engine/Command/PlayerJoin.js";
import CommandPlayerLeave from "Engine/Command/PlayerLeave.js";
import IndexCounter from "Engine/Core/IndexCounter.js";*/

var ModuleLoader = require("./ModuleLoader.js");

var console = require("console");
var fs = require("fs");
var path = require("path");
var app = require("express")();
var http = require("http").Server(app);
global.io = require("socket.io")(http);
var present = require('present');
var vm = require("vm");

var isServer = true;

var srcList = [];
ModuleLoader.loadModule(srcList, {}, "Game/");
for (var i = 0; i < srcList.length; i++) {
    var file = srcList[i];
    var src = fs.readFileSync(file, "utf8");
    var script = new vm.Script(src, { filename: file, displayErrors: true });
    script.runInThisContext();
    //require(file));//eval(src);

}

/*var loadScript = function(filePath) {
    console.log("Loading " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    eval(content);
}

var loadScriptsRecursive = function(dir) {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; ++i) {
        var filePath = dir + "/" + files[i];
        var stat = fs.statSync(filePath);

        if (stat.isDirectory())
            loadScriptsRecursive(filePath);
        else if (stat.isFile() && path.extname(filePath) == ".js"))
            loadScript(filePath)
    }
}*/

/*loadScriptsRecursive("lib");
loadScriptsRecursive("engine");
loadScriptsRecursive("game");

//Unit testing
loadScript("UnitTest.js"));
loadScriptsRecursive("unit_tests");
runUnitTests();
*/
var commandsToSend = [];
global.sendCommand = function(command) {
    commandsToSend.push(command);
}
global.clearCommands = function() {
    commandsToSend.length = 0;
}

global.connections = new Array(); // key socketId, value player object
gameData.init();
var zindices = {};

var firstTickTime = process.hrtime();
var tickNum = 0;
var skippedTicks = 0;
var messageCallbacks = {};

var names = ["Runny", "Buttercup", "Dinky", "Stinky", "Crusty",
    "Greasy", "Gidget", "Cheesypoof", "Lumpy", "Wacky", "Tiny", "Flunky",
    "Fluffy", "Zippy", "Doofus", "Gobsmacked", "Slimy", "Grimy", "Salamander",
    "Oily", "Burrito", "Bumpy", "Loopy", "Snotty", "Irving", "Egbert"];

var lastnames = ["face", "dip", "nose", "brain", "head", "breath",
    "pants", "shorts", "ears", "mouth", "muffin", "butter", "bottom", "elbow",
    "honker", "toes", "buns", "mister", "fanny", "squirt", "chunks",
    "brains", "wit", "juice", "shower"];


var update = function() {
    var server_has_players = (Object.keys(connections).length > 0);//!gameData.playerWorld || gameData.playerWorld.length > 0);
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
    gameData.world.commands = gameData.world.commands.concat(commandsToSend);
    //console.log("sheduled " + commandsToSend.length + " commands to be sent in tick " + gameData.world.tickId);
    commandsToSend.length = 0;

    // Send commands
    new MessageCommands(gameData).send(io.sockets);

    gameData.tick(dt);


    var tick_end = process.hrtime(tick_begin);
    totalTickTime += (tick_end[0] * 1e3 + tick_end[1] / 1e6);
    ++currentMeasureTicks;
    if (currentMeasureTicks > measureTicks) {
        var tickMs = totalTickTime / measureTicks;
        console.log(measureTicks + " ticks average: " + tickMs.toFixed(1) + "ms (" + ((tickMs / 50.0 * 100).toFixed(1)) + "%) numEntities: " + gameData.world.entityWorld.objectArray.length);
        currentMeasureTicks = 0;
        totalTickTime = 0;
    }
}

io.on("connection", function(socket) {
    connections[socket.id] = { socket: socket };

    connections[socket.id].pingIntervalId = setInterval(function() {
        //startTime = Date.now();
        socket.emit('ping');
    }, 2000);

    var playerId = gameData.playerIdList.next();
    var entityId = gameData.world.idList.next();
    //var name = names[Math.round(Math.random() * names.length)] + " " + lastnames[Math.round(Math.random() * lastnames.length)];
    var name = "Guest" + playerId;

    // Send playerJoin message
    sendCommand(new CommandPlayerJoin(playerId, entityId, name, socket.id));

    socket.on("disconnect", function() {
        clearInterval(connections[socket.id].pingIntervalId);
        var player = connections[socket.id].player;
        if (player)
            sendCommand(new CommandPlayerLeave(player.playerId, player.entityId));
        delete connections[socket.id];
    });

    socket.on('message', function(msg) {
        console.log("Message = require(" + socket.id + ": " + msg);
    });

    socket.on('ping', function() {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function(time) {
        connections[socket.id].ping = 2 * (Date.now() - time);
    });

    socket.on("chat", function(text) {
        var player = connections[socket.id].player;
        if (player)
            io.sockets.emit("chat", player.name + ": " + text);
    });

    RegisterMessage.ToServer.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData, connections[socket.id].player);
            if (messageCallbacks[messageType.prototype.id])
                messageCallbacks[messageType.prototype.id](message);
        });
    });
});

http.listen(Config.port, function() {
    console.log("Listening on :3000");
});

update();
