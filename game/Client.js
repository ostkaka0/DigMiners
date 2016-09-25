Client = function(gameData, ip, port) {

    // This is code to test serialization and deserialization of UTF-8 strings.
    /*var test = "test1 test2 123 !@,@£€$€734ÅÄÖ";
    console.log("serializing \"" + test + "\"");
    var testArray = new Uint8Array(5000);
    var counter = new IndexCounter();
    serializeUTF8(testArray, counter, test);
    console.log("serialized length " + testArray.length);
    counter = new IndexCounter();
    var testOut = deserializeUTF8(testArray, counter);
    console.log("unserialized \"" + testOut + "\"");*/

    console.log("Connecting to " + ip + ":" + port + "...");
    socket = io(ip + ":" + port);
    sentInit2 = false;
    playersReceived = 0;

    socket.on('connect', function() {

        setInterval(function() {
            startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        console.log("Connected.");
    });

    socket.on('message', function(msg) {
        console.log("Message from server: " + msg);
    });

    gameData.clientMessages.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData);
            if(messageCallbacks[messageType.prototype.id])
                messageCallbacks[messageType.prototype.id](message);
        });
    });

    socket.on('error', function(error) {
        console.log("Connection failed. " + error);
    });

    socket.on('ping', function() {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function(time) {
        ping = 2 * (Date.now() - time);
    });

    /*socket.on('playerJoin', function (data) {
        var playerId = data[0];
        var entityId = data[1];
        var playerName = data[2];
        console.log(playerName + " connected with playerId " + playerId);
        var template = entityTemplates.player(playerId, entityId, playerName, gameData);
        var player = template.player;
        var entity = template.entity;

        if (!sentInit2) {
            playersReceived++;
            {//if (playersReceived >= playersToReceive) {
                gameData.entityWorld.update();
                gameData.playerWorld.update();
                socket.emit("init2");
                sentInit2 = true;
            }
        }
    });*/

    /*socket.on('playerLeave', function (data) {
        var playerId = data[0];
        var entityId = data[1];
        var player = gameData.playerWorld.objects[playerId];
        var entity = gameData.entityWorld.objects[entityId];
        entity.drawable.remove();
        gameData.playerWorld.remove(player);
        gameData.entityWorld.remove(entity);
        //TODO: Delete more things
    });*/
}

Client.prototype.sendCommand = function(command) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    var counter = new IndexCounter();
    serializeInt32(byteArray, counter, command.id);
    command.serialize(byteArray, counter);
    socket.emit("command", byteArray);
}
