
Client = function (gameData, ip, port) {

    console.log("Connecting to " + ip + ":" + port + "...");
    socket = io(ip + ":" + port);
    sentInit2 = false;
    playersReceived = 0;

    socket.on('connect', function () {

        setInterval(function () {
            startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        console.log("Connected.");
    });

    socket.on('message', function (msg) {
        console.log("Message from server: " + msg);
    });

    socket.on('command', function (data) {
        var command = gameData.commandTypes.deserializeCommand(data);
        commands.push(command);
        //console.log("Received " + JSON.stringify(command));
    });
    socket.on('entityStatus', function(data) {
        var message = new MessageEntityStatus();
        message.deserialize(data, 0);
        message.execute(gameData);
    })

    socket.on('error', function (error) {
        console.log("Connection failed. " + error);
    });

    socket.on('ping', function () {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function (time) {
        ping = 2 * (Date.now() - time);
    });

    socket.on("init", function (data) {
        var playerId = data[0];
        var entityId = data[1];
        var playerName = data[2];
        playersToReceive = data[3];

        animationManager = new AnimationManager();
        animationManager.load();

        var template = entityTemplates.player(playerId, entityId, playerName, gameData);
        player = template.player;
        playerEntity = template.entity;

        //todo: commands is global
        commands = [];
        keysDown = [];

        loadGame();
    });

    socket.on('init2', function () {
        //console.log("test " + gameData.entityWorld.objects[4]);
    });

    socket.on('playerJoin', function (data) {
        var playerId = data[0];
        var entityId = data[1];
        var playerName = data[2];
        console.log(playerName + " connected with playerId " + playerId);
        var template = entityTemplates.player(playerId, entityId, playerName, gameData);
        var player = template.player;
        var entity = template.entity;

        if (!sentInit2) {
            playersReceived++;
            if (playersReceived >= playersToReceive) {
                gameData.entityWorld.update();
                gameData.playerWorld.update();
                socket.emit("init2");
                sentInit2 = true;
            }
        }
    });

    socket.on('playerLeave', function (data) {
        var playerId = data[0];
        var entityId = data[1];
        var player = gameData.playerWorld.objects[playerId];
        var entity = gameData.entityWorld.objects[entityId];
        entity.drawable.remove();
        gameData.playerWorld.remove(player);
        gameData.entityWorld.remove(entity);
        //TODO: Delete more things
    });
}

Client.prototype.sendCommand = function (command) {
    socket.emit("command", gameData.commandTypes.serializeCommand(command));
    //console.log("Sent " + JSON.stringify(command.getData()));
}
