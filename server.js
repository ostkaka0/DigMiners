console = require("console");
fs = require("fs");
path = require("path");
app = require("express")();
http = require("http").Server(app);
io = require("socket.io")(http);

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

var idList = new IdList();
var connections = new Array(); // key socketId, value player object
var gameData = new GameData(idList);

var tickDuration = gameData.tickDuration;
var firstTickTime = process.hrtime();
var tickNum = 0;

var commands = [];

loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    gameData.generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}

for(var x = -2; x < 2; ++x) {
    for(var y = -2; y < 2; ++y) {
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

    tick(1.0 / 20.0);
    tickNum++;
}

tick = function(dt) {
    // Send commands
    var messageCommands = new MessageCommands(commands);
    messageCommands.send(io.sockets);

    commands.forEach(function(command) {
        command.execute(gameData);
    });
    commands.length = 0;
    gameData.playerWorld.update();
    entityFunctionPlayerMovement(gameData, dt);
    entityFunctionPhysicsBodySimulate(gameData, dt);
    gameData.entityWorld.update();

    gameData.entityWorld.objectArray.forEach(function(entity) {
        if(entity.movement && entity.movement.spacebar && entity.physicsBody) {
            var command = new CommandDig(entity.physicsBody.pos[0], entity.physicsBody.pos[1], 4.0);
            commands.push(command);
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
    var player = template.player;
    var entity = template.entity;
    connections[socket.id].player = player;
    connections[socket.id].entity = entity;

    var playerJoinMessages = [];
    var entityStatusMessages = [];
    for(var socketId in connections) {
        if(socketId != socket.id) {
            playerJoinMessages.push(new MessagePlayerJoin(connections[socketId].player));
            entityStatusMessages.push(new MessageEntityStatus(connections[socketId].entity.id, connections[socketId].entity.physicsBody));
        }
    }

    // Send init message to player
    new MessageInit(player, playerJoinMessages, entityStatusMessages).send(socket);
    // Send playerJoin message to other players
    new MessagePlayerJoin(player).send(socket.broadcast);

    for(var x = -2; x < 2; ++x) {
        for(var y = -2; y < 2; ++y) {
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
        setTimeout(function() {
            var counter = new IndexCounter();
            var commandId = deserializeInt32(data, counter);
            var command = new gameData.commandTypes.list[commandId]();
            command.deserialize(data, counter);
            commands.push(command);
        }, 300);
        //console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

    socket.on('ping', function() {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function(time) {
        connections[socket.id].ping = 2 * (Date.now() - time);
    });

    gameData.serverMessages.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData);
        });
    });

    console.log(socket.id + " connected.");
});

http.listen(3000, function() {
    console.log("Listening on :3000");
});

update();
console.log("\nTODO: Implement server\n");

