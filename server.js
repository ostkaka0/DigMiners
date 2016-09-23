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

var idList = new IdList();
var playerWorld = new ObjectWorld();
playerWorld.onRemove = function (player) { idList.remove(player.id); };
var entityWorld = new ObjectWorld();
entityWorld.onRemove = function (entity) { idList.remove(entity.id); };
var tileWorld = new Map2D();
var generator = new Generator();
var players = new Array(); // key socketId, value player object
var gameData = { playerWorld: playerWorld, entityWorld: entityWorld, tileWorld: tileWorld };

var tickDuration = 1000 / 8;
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
    playerWorld.update();
    entityFunctionPlayerMovement(gameData, dt);
    entityFunctionPhysicsBodySimulate(gameData, dt);
    entityWorld.update();
}

io.on("connection", function (socket) {
    players[socket.id] = { 'socket': socket };

    players[socket.id].pingIntervalId = setInterval(function () {
        startTime = Date.now();
        socket.emit('ping');
    }, 2000);

    players[socket.id].name = "Bertil";

    players[socket.id].entity = entityWorld.add({}, idList.next());
    var entity = players[socket.id].entity;

    players[socket.id].player = playerWorld.add(new Player("karl", entity.id, socket.id), idList.next());
    var player = players[socket.id].player;

    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
    entity.movement = new Movement(50.0);

    socket.emit("init", [socket.id, player.id, entity.id, players[socket.id].name, Object.keys(players).length - 1]);
    for (var key in players) {
        if (key != socket.id) {
            socket.emit("playerJoin", [key, players[key].entity.id, players[key].name]);
        }
    }
    socket.broadcast.emit("playerJoin", [socket.id, entity.id, players[socket.id].name]);

    socket.on("init2", function () {
        for (var key in players) {
            if (key != socket.id) {
                var commandEntityStatus = new CommandEntityStatus(players[key].entity.id, players[key].entity.physicsBody);
                socket.emit("command", [commandEntityStatus.getName(), commandEntityStatus.getData()]);
            }
        }
        var commandEntityStatus = new CommandEntityStatus(entity.id, entity.physicsBody);
        io.sockets.emit("command", [commandEntityStatus.getName(), commandEntityStatus.getData()]);
        console.log("sent init2");
    });

    socket.on("disconnect", function () {
        clearInterval(players[socket.id].pingIntervalId);
        socket.broadcast.emit("playerLeave", players[socket.id].entity.id);
        entityWorld.remove(players[socket.id].entity);
        playerWorld.remove(players[socket.id].player);
        delete players[socket.id];
        console.log(socket.id + " disconnected.");
    });

    socket.on('message', function (msg) {
        console.log("Message from " + socket.id + ": " + msg);
    });

    socket.on('command', function (data) {
        setTimeout(function () {
            var command = deserializeCommand(data);
            commands.push(command);
            var byteArray = serializeCommand(command);
            io.sockets.emit("command", byteArray);
        }, 300);
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

