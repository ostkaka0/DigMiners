
Client = function (ip, port) {
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
        //var command = deserializeCommand(data[1], 0);
        if (data[0] == "CommandPlayerMove")
            commands.push(new CommandPlayerMove(data[1][0], data[1][1]));
        else if (data[0] == "CommandEntityStatus")
            commands.push(new CommandEntityStatus(data[1][0], data[1][1]));
        //console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

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
        console.log("init");
        var socketId = data[0];
        var playerId = data[1];
        var entityId = data[2];
        var playerName = data[3];
        playersToReceive = data[4];

        animationManager = new AnimationManager();
        animationManager.load();

        //todo: playerEntity is global
        playerEntity = entityWorld.add({}, entityId);

        //todo: player is global
        player = playerWorld.add(new Player(playerName, playerEntity.id, socketId), playerId);

        playerEntity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
        playerEntity.movement = new Movement(50.0);
        var sprite = new PIXI.Sprite(textures.feet);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        var bodySprite = new PIXI.Sprite(textures.dig);
        bodySprite.anchor.x = 0.5;
        bodySprite.anchor.y = 0.5;
        var bodyparts = {
            "feet": {
                "sprite": sprite
            },
            "body": {
                "sprite": bodySprite
            }
        };
        playerEntity.drawable = new Drawable(stage, bodyparts, animationManager);
        var text = new PIXI.Text(entityId + "(current)", { fill: '#ffffff' });
        playerEntity.drawable.addSprite("username", text, v2.create(- text.width / 2, -80), false);

        //todo: commands is global
        commands = [];
        keysDown = [];

        loadGame();
    });

    socket.on('playerJoin', function (data) {
        console.log("playerjoin");
        var socketId = data[0];
        var entityId = data[1];
        var playerName = data[2];
        console.log(socketId + " connected with entityId " + entityId);
        var entity = entityWorld.add({}, entityId);
        var player = playerWorld.add(new Player(playerName, entityId, socketId), entityId);
        entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
        entity.movement = new Movement(50.0);
        var sprite = new PIXI.Sprite(textures.feet);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        var bodySprite = new PIXI.Sprite(textures.dig);
        bodySprite.anchor.x = 0.5;
        bodySprite.anchor.y = 0.5;
        var bodyparts = {
            "feet": {
                "sprite": sprite
            },
            "body": {
                "sprite": bodySprite
            }
        };
        entity.drawable = new Drawable(stage, bodyparts, animationManager);
        var text = new PIXI.Text(entityId, { fill: '#ffffff' });
        entity.drawable.addSprite("username", text, v2.create(- text.width / 2, -80), false);

        if (!sentInit2) {
            playersReceived++;
            if (playersReceived >= playersToReceive) {
                socket.emit("init2");
                sentInit2 = true;
            }
        }
    });

    socket.on('playerLeave', function (id) {
        var entity = entityWorld.objects[id];
        entity.drawable.remove();
        var player = playerWorld.objects[id];
        entityWorld.remove(entity);
        playerWorld.remove(player);
        //TODO: Delete more things
    });
}

Client.prototype.sendCommand = function (command) {
    socket.emit("command", [command.getName(), command.getData()]);
    //console.log("Sent " + command.getName() + " and " + JSON.stringify(command.getData()));
}