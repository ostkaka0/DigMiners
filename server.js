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
    for(var i = 0; i < files.length; ++i) {
        var filePath = dir + "/" + files[i];
        var stat = fs.statSync(filePath);

        if(stat.isDirectory())
            loadScriptsRecursive(filePath);
        else if(stat.isFile() && path.extname(filePath) == ".js")
            loadScript(filePath)
    }
}

loadScriptsRecursive("lib");
loadScriptsRecursive("src");
loadScriptsRecursive("game");

//Unit testing
loadScript("UnitTest.js");
loadScriptsRecursive("unit_tests");
runUnitTests();

console.log("compressing!");
var testArray = new Array(256);
//testArray.fill(123);
console.log(compressRLE(testArray));

var idList = new IdList();
var connections = new Array(); // key socketId, value player object
var gameData = new GameData(idList);
var animationManager = {};
var zindices = {};

var tickDuration = gameData.tickDuration;
var firstTickTime = process.hrtime();
var tickNum = 0;
var messageCallbacks = {};

loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    gameData.generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}

for(var x = -4; x < 4; ++x) {
    for(var y = -4; y < 4; ++y) {
        loadChunk(gameData.tileWorld, x, y);
    }
}
carveCircle(gameData, 0, 0, 12);

update = function() {
    var now = process.hrtime();

    var diff = process.hrtime(firstTickTime);
    var diff_ms = diff[0] * 1e3 + diff[1] / 1e6;
    var delay = -diff_ms + tickNum * tickDuration;
    setTimeout(update, delay);

    tick(gameData.tickDuration / 1000.0);
    tickNum++;
}

tick = function(dt) {
    // Send commands
    new MessageCommands(gameData).send(io.sockets);

    gameData.tick(dt);

    gameData.playerWorld.objectArray.forEach(function(player) {
        var entity = gameData.entityWorld.objects[player.entityId];
        if(entity.movement && entity.movement.spacebar && entity.physicsBody) {
            var angle = entity.physicsBody.angle;
            var moveDir = [Math.cos(-angle), Math.sin(-angle)];
            var command = new CommandPlayerDig(player.playerId, entity.physicsBody.pos[0], entity.physicsBody.pos[1], moveDir, 1.5);
            gameData.commands.push(command);
        }
    })
}

io.on("connection", function(socket) {
    connections[socket.id] = { 'socket': socket };

    connections[socket.id].pingIntervalId = setInterval(function() {
        startTime = Date.now();
        socket.emit('ping');
    }, 2000);

    var template = entityTemplates.player(idList.next(), idList.next(), "karl", gameData);
    template.player.socket = socket;
    var player = template.player;
    var entity = template.entity;
    connections[socket.id].player = player;
    connections[socket.id].entity = entity;

    // Send init message to player
    new MessageInit(gameData, player).send(gameData, socket);
    // Send playerJoin message to other players
    new MessagePlayerJoin(player).send(socket.broadcast);

    for(var x = -4; x < 4; ++x) {
        for(var y = -4; y < 4; ++y) {
            var chunk = gameData.tileWorld.get(x, y);
            var message = new MessageChunk(chunk, x, y);
            message.send(socket);
        }
    }

    socket.on("disconnect", function() {
        clearInterval(connections[socket.id].pingIntervalId);
        new MessagePlayerLeave(connections[socket.id].player).send(socket.broadcast);
        gameData.entityWorld.remove(connections[socket.id].entity);
        gameData.playerWorld.remove(connections[socket.id].player);
        delete connections[socket.id];
        console.log(socket.id + " disconnected.");
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
        gameData.commands.push(command);
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
            if(messageCallbacks[messageType.prototype.id])
                messageCallbacks[messageType.prototype.id](message);
        });
    });

    console.log(socket.id + " connected.");
});

http.listen(gameData.port, function() {
    console.log("Listening on :3000");
});

update();
console.log("\nTODO: Implement server\n");

