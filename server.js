console = require("console");
fs = require("fs");
path = require("path");
app = require("express")();
http = require("http").Server(app);
io = require("socket.io")(http);
present = require('present');

var isServer = true;

loadScript = function(filePath) {
    console.log("Loading " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    eval(content);
}

loadScriptsRecursive = function(dir) {
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
loadScriptsRecursive("engine");
loadScriptsRecursive("game");

//Unit testing
loadScript("UnitTest.js");
loadScriptsRecursive("unit_tests");
runUnitTests();

var idList = new IdList();
var connections = new Array(); // key socketId, value player object
gameData.init(idList);
gameData.generator = new Generator(Math.random() * 10000);
var zindices = {};

var firstTickTime = process.hrtime();
var tickNum = 0;
var skippedTicks = 0;
var messageCallbacks = {};
var commandsToSend = [];
sendCommand = function(command) {
    commandsToSend.push(command);
}

var names = ["Runny", "Buttercup", "Dinky", "Stinky", "Crusty",
    "Greasy", "Gidget", "Cheesypoof", "Lumpy", "Wacky", "Tiny", "Flunky",
    "Fluffy", "Zippy", "Doofus", "Gobsmacked", "Slimy", "Grimy", "Salamander",
    "Oily", "Burrito", "Bumpy", "Loopy", "Snotty", "Irving", "Egbert"];

var lastnames = ["face", "dip", "nose", "brain", "head", "breath",
    "pants", "shorts", "ears", "mouth", "muffin", "butter", "bottom", "elbow",
    "honker", "toes", "buns", "mister", "fanny", "squirt", "chunks",
    "brains", "wit", "juice", "shower"];

loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    gameData.generator.generate(chunk, x, y);
    world.set(x, y, chunk);

    gameData.generator.generateDungeons(gameData.blockWorld, chunk, x, y);
}

for (var x = -3; x < 3; ++x) {
    for (var y = -3; y < 3; ++y) {
        loadChunk(gameData.tileWorld, x, y);
    }
}

// Dig player spawners
gameData.spawnPoints.forEach(function(pos) {
    carveCircle(gameData, pos[0], pos[1], 4, 100.0);
    setForeground(gameData.blockWorld, pos[0], pos[1], Blocks.BlueForcefieldOpen.id);
});

// Add monster spawners
for (var i = 0; i < 20; i++) {
    var pos = [Math.floor(80 * (1.0 - 2.0*Math.random())), Math.floor(80 * (1.0 - 2.0*Math.random()))];
    var entityId = gameData.idList.next();
    var entity = entityTemplates.monsterSpawner(entityId, pos, entityTemplates.testMonster, 2, 2.0, 3000);
    gameData.entityWorld.add(entity, entityId);
    carveCircle(gameData, pos[0], pos[1], 2.0, 100.0);
}
// Add gun monster spawners
for (var i = 0; i < 20; i++) {
    var pos = [Math.floor(80 * (1.0 - 2.0*Math.random())), Math.floor(80 * (1.0 - 2.0*Math.random()))];
    var entityId = gameData.idList.next();
    var weaponId = Items.WeaponPistol.id + Math.floor((Items.WeaponSniperRifle.id - Items.WeaponPistol.id + 1) * Math.random());
    var entity = entityTemplates.monsterSpawner(entityId, pos, entityTemplates.testMonster, 2, 2.0, 30, [{id: weaponId}, {id: Items.Egg.id, quantity: 1000}]);
    gameData.entityWorld.add(entity, entityId);
    carveCircle(gameData, pos[0], pos[1], 6.0, 100.0);
}

gameData.physicsWorld.onCollision.push(function(collisions) {
    sendCommand(new CommandCollisions(collisions));
});

gameData.entityWorld.onAdd["server.js"] = function(entity) {
    if (entity.controlledByPlayer) {

        // give player shovel at join
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.SteelShovel.id, 1));

        // give player dynamite at join
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.Egg.id, 800));

        // give player blocks at join
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.StoneWall.id, 100));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.BlueForcefield.id, 10));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.BunkerWindow.id, 10));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.WoodCrate.id, 100));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.HealthBox.id, 10));

        // Give player weapons
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.WeaponPistol.id, 1));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.WeaponAssaultRifle.id, 1));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.WeaponShotgun.id, 1));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.ADD_ITEM, Items.WeaponSniperRifle.id, 1));

        // (TEMPORARY) spawn monsters on player join
        for (var i = 0; i < 0; ++i) {
            var monsterEntityId = idList.next();
            var monster = entityTemplates.testMonster(monsterEntityId, [50 * (-1 + 2 * Math.random()), 50 * (-1 + 2 * Math.random())], gameData);
            sendCommand(new CommandEntitySpawn(gameData, monster, monsterEntityId));
            var weaponId = Items.WeaponPistol.id + Math.floor((Items.WeaponGrenadeLauncher.id - Items.WeaponPistol.id + 1) * Math.random());
            sendCommand(new CommandEntityInventory(monsterEntityId, InventoryActions.ADD_ITEM, weaponId, 1));
            sendCommand(new CommandEntityEquipItem(monsterEntityId, 0, weaponId, true));
            sendCommand(new CommandEntityInventory(monsterEntityId, InventoryActions.ADD_ITEM, Items.Egg.id, 1000));
        }
    }
};

update = function() {
    var diff = process.hrtime(firstTickTime);
    var diff_ms = diff[0] * 1e3 + diff[1] / 1e6;
    var delay = -diff_ms + (tickNum + skippedTicks) * gameData.tickDuration;
    if (delay < -gameData.tickDuration) {
        var numTicksToSkip = Math.ceil(-delay / gameData.tickDuration);
        skippedTicks += numTicksToSkip;
        console.log(numTicksToSkip + " ticks skipped!");
    }
    setTimeout(update, delay);
    tick(gameData.tickDuration / 1000.0);
    tickNum++;
}

var measureTicks = 20;
var currentMeasureTicks = 0;
var totalTickTime = 0;
tick = function(dt) {
    var tick_begin = process.hrtime();
    gameData.commands = gameData.commands.concat(commandsToSend);
    //console.log("sheduled " + commandsToSend.length + " commands to be sent in tick " + gameData.tickId);
    commandsToSend.length = 0;

    // Send commands
    new MessageCommands(gameData).send(io.sockets);

    gameData.tick(dt);

    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.behaviourContainer)
            entity.behaviourContainer.update();
    });
    var tick_end = process.hrtime(tick_begin);
    totalTickTime += (tick_end[0] * 1e3 + tick_end[1] / 1e6);
    ++currentMeasureTicks;
    if (currentMeasureTicks > measureTicks) {
        var tickMs = totalTickTime / measureTicks;
        console.log(measureTicks + " ticks average: " + tickMs.toFixed(1) + "ms (" + ((tickMs / 50.0 * 100).toFixed(1)) + "%) numEntities: " + gameData.entityWorld.objectArray.length);
        currentMeasureTicks = 0;
        totalTickTime = 0;
    }
}

io.on("connection", function(socket) {
    connections[socket.id] = { 'socket': socket };

    connections[socket.id].pingIntervalId = setInterval(function() {
        startTime = Date.now();
        socket.emit('ping');
    }, 2000);

    var playerId = idList.next();
    var entityId = idList.next();
    var name = names[Math.round(Math.random() * names.length)] + " " + lastnames[Math.round(Math.random() * lastnames.length)];

    // Send playerJoin message
    sendCommand(new CommandPlayerJoin(playerId, entityId, name, socket.id));

    socket.on("disconnect", function() {
        clearInterval(connections[socket.id].pingIntervalId);
        var player = connections[socket.id].player;
        sendCommand(new CommandPlayerLeave(player.playerId, player.entityId));
        delete connections[socket.id];
    });

    socket.on('message', function(msg) {
        console.log("Message from " + socket.id + ": " + msg);
    });

    socket.on('command', function(data) {
        //setTimeout(function() {
        var counter = new IndexCounter();
        var commandId = deserializeInt32(data, counter);
        var command = new gameData.commandTypes.list[commandId]();
        command.deserialize(data, counter);
        sendCommand(command);
        //}, 300);
        //console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

    socket.on('ping', function() {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function(time) {
        connections[socket.id].ping = 2 * (Date.now() - time);
    });

    gameData.messagesToServer.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData, connections[socket.id].player);
            if (messageCallbacks[messageType.prototype.id])
                messageCallbacks[messageType.prototype.id](message);
        });
    });
});

http.listen(gameData.port, function() {
    console.log("Listening on :3000");
});

update();
