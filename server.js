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

update = function () {
    var now = process.hrtime();

    var diff = process.hrtime(firstTickTime);
    var diff_ms = diff[0] * 1e3 + diff[1] / 1e6;
    var delay = -diff_ms + tickNum * tickDuration;
    setTimeout(update, delay);

    tick(1.0 / 20.0);
    tickNum++;
}

tick = function (dt) {
    //console.log(dt);
    //console.log("Tick #" + tickNum);
    commands.forEach(function (command) {
        command.execute(gameData);
    });
    commands.length = 0;
    gameData.playerWorld.update();
    entityFunctionPlayerMovement(gameData, dt);
    entityFunctionPhysicsBodySimulate(gameData, dt);
    gameData.entityWorld.update();

    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.movement && entity.movement.spacebar && entity.physicsBody)
            io.sockets.emit("command", gameData.commandTypes.serializeCommand(new CommandDig(entity.physicsBody.pos[0], entity.physicsBody.pos[1], 4.0)));
    })
}

io.on("connection", function (socket) {
    connections[socket.id] = { 'socket': socket };

    connections[socket.id].pingIntervalId = setInterval(function () {
        startTime = Date.now();
        socket.emit('ping');
    }, 2000);

    var template = entityTemplates.player(idList.next(), idList.next(), "karl", gameData);
    var player = template.player;
    var entity = template.entity;
    connections[socket.id].player = player;
    connections[socket.id].entity = entity;

    socket.emit("init", [player.id, entity.id, player.name, Object.keys(connections).length - 1]);
    for (var key in connections) {
        if (key != socket.id) {
            socket.emit("playerJoin", [connections[key].player.id, connections[key].entity.id, connections[key].player.name]);
        }
    }
    socket.broadcast.emit("playerJoin", [player.id, entity.id, player.name]);

    socket.on("init2", function () {
        for (var key in connections) {
            if (key != socket.id) {
                sendCommand(socket, new CommandEntityStatus(connections[key].entity.id, connections[key].entity.physicsBody));
            }
        }
        sendCommand(io.sockets, new CommandEntityStatus(entity.id, entity.physicsBody));
        socket.emit("init2");
        console.log("sent init2");
    });

    socket.on("disconnect", function () {
        clearInterval(connections[socket.id].pingIntervalId);
        socket.broadcast.emit("playerLeave", [connections[socket.id].player.id, connections[socket.id].entity.id]);
        gameData.entityWorld.remove(connections[socket.id].entity);
        gameData.playerWorld.remove(connections[socket.id].player);
        delete connections[socket.id];
        console.log(socket.id + " disconnected.");
    });

    socket.on('message', function (msg) {
        console.log("Message from " + socket.id + ": " + msg);
    });

    socket.on('command', function (data) {
        setTimeout(function () {
            var command = gameData.commandTypes.deserializeCommand(data);
            commands.push(command);
            sendCommand(io.sockets, command);
        }, 300);
        //console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

    socket.on('ping', function () {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function (time) {
        connections[socket.id].ping = 2 * (Date.now() - time);
    });

    console.log(socket.id + " connected.");
});

sendCommand = function (socket, command) {
    socket.emit("command", gameData.commandTypes.serializeCommand(command));
    //console.log("Sent " + command.getName() + " and " + JSON.stringify(command.getData()));
}

http.listen(3000, function () {
    console.log("Listening on :3000");
});

update();
console.log("\nTODO: Implement server\n");

