global.isServer = true;

var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Event = require("Engine/Core/Event.js")

var Config = require("Game/Config.js")
var gameData = require("Game/GameData.js")
var Items = require("Game/Items.js")
var Blocks = require("Game/Blocks.js")
var Tiles = require("Game/Tiles.js")
var Message = require("Game/Message/Message.js")

var MessageCommands = require("Game/Message/ToClient/MessageCommands.js")
var CommandPlayerJoin = require("Game/Command/CommandPlayerJoin.js")
var CommandPlayerLeave = require("Game/Command/CommandPlayerLeave.js")
var IndexCounter = require("Engine/IndexCounter.js")

var console = require("console");
var fs = require("fs");
var path = require("path");
var app = require("express")();
var http = require("http").Server(app);
global.io = require("socket.io")(http);
var present = require('present');

var isServer = true;

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

// Add team monster spawners
/*Object.keys(gameData.spawnPoints).forEach(function(teamId) {
    console.log("Team: " + teamId);
    var spawnList = gameData.spawnPoints[teamId];
    spawnList.forEach(function(pos) {
        var entityId = gameData.world.idList.next();
        var entity = entityTemplateTeamBase(entityId, pos, teamId, 10, 2.0, 40);
        //entityTemplateMonsterSpawner(entityId, pos, entityTemplateMonster, 5, 2.0, 120, null, null, teamId);
        gameData.world.entityWorld.add(entity, entityId);
        carveCircle(gameData, pos[0], pos[1], 5.0, 100.0);
    });
});*/

/*// Add monster spawners
for (var i = 0; i < 50; i++) {
    var pos = [Math.floor(80 * (1.0 - 2.0*Math.random())), Math.floor(80 * (1.0 - 2.0*Math.random()))];
    var entityId = gameData.idList.next();
    var entity = entityTemplateMonsterSpawner(entityId, pos, entityTemplateMonster, 2, 2.0, 3000);
    gameData.world.entityWorld.add(entity, entityId);
    carveCircle(gameData, pos[0], pos[1], 2.0, 100.0);
}
// Add gun monster spawners
for (var i = 0; i < 10; i++) {
    var pos = [Math.floor(80 * (1.0 - 2.0*Math.random())), Math.floor(80 * (1.0 - 2.0*Math.random()))];
    var entityId = gameData.idList.next();
    var weaponId = Items.Types.WeaponPistol.id + Math.floor((Items.Types.WeaponSniperRifle.id - Items.Types.WeaponPistol.id + 1) * Math.random());
    var entity = entityTemplateMonsterSpawner(entityId, pos, entityTemplateMonster, 2, 2.0, 3000, [{id: weaponId}, {id: Items.Types.Egg.id, quantity: 1000}]);
    gameData.world.entityWorld.add(entity, entityId);
    carveCircle(gameData, pos[0], pos[1], 6.0, 100.0);
}*/



/*Event.subscribe(gameData.world.entityWorld.onAdd, global, function(entity) {
    if (entity.controlledByPlayer) {

        / * // give player shovel at join
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.SteelShovel.id, 1));

        // give player dynamite at join
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.Egg.id, 800));

        // give player blocks at join
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.StoneWall.id, 100));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.BlueForcefield.id, 10));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.BunkerWindow.id, 10));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.WoodCrate.id, 100));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.HealthBox.id, 10));

        // Give player weapons
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.WeaponPistol.id, 1));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.WeaponAssaultRifle.id, 1));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.WeaponShotgun.id, 1));
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.WeaponSniperRifle.id, 1)); * /

        // (TEMPORARY) spawn monsters on player join
        for (var i = 0; i < 0; ++i) {
            var monsterEntityId = gameData.world.idList.next();
            var monster = entityTemplateMonster(monsterEntityId, [50 * (-1 + 2 * Math.random()), 50 * (-1 + 2 * Math.random())], gameData);
            sendCommand(new CommandEntitySpawn(gameData, monster, monsterEntityId));
            var weaponId = Items.Types.WeaponPistol.id + Math.floor((Items.Types.WeaponGrenadeLauncher.id - Items.Types.WeaponPistol.id + 1) * Math.random());
            sendCommand(new CommandEntityInventory(monsterEntityId, CommandEntityInventory.Actions.ADD_ITEM, weaponId, 1));
            sendCommand(new CommandEntityEquipItem(monsterEntityId, 0, weaponId, true));
            sendCommand(new CommandEntityInventory(monsterEntityId, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.Egg.id, 1000));
        }
    }
});*/

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
    connections[socket.id] = { 'socket': socket };

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

    Message.ToServer.forEach(function(messageType) {
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
