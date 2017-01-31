var io = require("socket.io-client")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")

var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var Client = function(gameData, ip) {

    // This is code to test serialization and deserialization of UTF-8 strings.
    /*var test = "test1 test2 123 !@,@£€$€734ÅÄÖ";
    console.log("serializing \"" + test + "\"");
    var testArray = new Uint8Array(5000);
    var counter = new IndexCounter();
    Serialize.utf8(testArray, counter, test);
    console.log("serialized length " + testArray.length);
    counter = new IndexCounter();
    var testOut = Deserialize.utf8(testArray, counter);
    console.log("unserialized \"" + testOut + "\"");*/

    var port = Config.port;
    console.log("Connecting to " + ip + ":" + port + "...");
    socket = io(ip + ":" + port, {
        reconnection: false
    });
    sentInit2 = false;
    playersReceived = 0;

    socket.on('connect', function() {

        setInterval(function() {
            //startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        console.log("Connected.");
        Global.gameData.world.events.trigger("connected");
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

    Config.messagesToClient.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(Global.gameData, data);
            message.execute(Global.gameData);
            if (Global.gameData.messageCallbacks[messageType.prototype.id])
                Global.gameData.messageCallbacks[messageType.prototype.id](message);
        });
    });
}
module.exports = Client

Client.prototype.sendMessage = function(message) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, command.id);
    command.serialize(byteArray, counter);
    socket.emit("command", byteArray);
}