
var Server = null;

var serverInit = function(io) {
    Server = {
        io: io,
        connections: {}, // socketId: connection
        commands: [],
    };
    io.on("connection", function(socket) {
        Server.connections[socket.id] = { socket: socket };

        Server.connections[socket.id].pingIntervalId = setInterval(function() {
            //startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        var playerId = Game.playerIdList.next();
        var entityId = World.idList.next();
        //var name = names[Math.round(Math.random() * names.length)] + " " + lastnames[Math.round(Math.random() * lastnames.length)];
        var name = "Guest" + playerId;

        // Send playerJoin message
        sendCommand(new CommandPlayerJoin(playerId, entityId, name, socket.id));

        socket.on("disconnect", function() {
            clearInterval(Server.connections[socket.id].pingIntervalId);
            var player = Server.connections[socket.id].player;
            if (player)
                sendCommand(new CommandPlayerLeave(player.playerId, player.entityId));
            delete Server.connections[socket.id];
        });

        socket.on('message', function(msg) {
            console.log("Message = require(" + socket.id + ": " + msg);
        });

        socket.on('ping', function() {
            socket.emit('pong', Date.now());
        });

        socket.on('pong', function(time) {
            Server.connections[socket.id].ping = 2 * (Date.now() - time);
        });

        socket.on("chat", function(text) {
            var player = Server.connections[socket.id].player;
            if (player)
                io.sockets.emit("chat", player.name + ": " + text);
        });

        RegisterMessage.ToServer.forEach(function(messageType) {
            console.log("Message:", messageType.name);
            socket.on(messageType.prototype.idString, function(data) {
                var message = new messageType();
                message.receive(gameData, data);
                message.execute(gameData, Server.connections[socket.id].player);
                //if (messageCallbacks[messageType.prototype.id])
                //    messageCallbacks[messageType.prototype.id](message);
            });
        });
    });
}

var serverTick = function() {
    if (World)
        World.commands = World.commands.concat(Server.commands)
    new MessageCommands(Server.commands).send(Server.io.sockets);
    Server.commands = [];
}

var sendCommand = (command) => Server.commands.push(command);
