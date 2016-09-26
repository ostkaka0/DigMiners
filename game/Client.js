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

    socket.on('error', function(error) {
        console.log("Connection failed. " + error);
    });

    socket.on('ping', function() {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function(time) {
        ping = 2 * (Date.now() - time);
    });

    gameData.messagesToClient.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData);
            if(messageCallbacks[messageType.prototype.id])
                messageCallbacks[messageType.prototype.id](message);
        });
    });
}

Client.prototype.sendMessage = function(message) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    var counter = new IndexCounter();
    serializeInt32(byteArray, counter, command.id);
    command.serialize(byteArray, counter);
    socket.emit("command", byteArray);
}
