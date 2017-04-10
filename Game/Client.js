
var Client = null;

var clientInit = function(callback) {
    var canvas = document.getElementById("spriteCanvas");
    var glCanvas = document.getElementById("canvas");
    Client = {
        canvas: canvas,
        glCanvas: glCanvas,
        context: canvas.getContext("2d", { antialias: true }),
        gl: Canvas.initGL(glCanvas),
        startTime: Date.now(),
        textures: null,
        player: null,
        playerEntity: null,
        textureManager: null,
        zindices: new Array(3),
        blockPosGood: null,
        blockPosBad: null,
        mouseX: null,
        mouseY: null,
        lastMouseSync: 0,
        keysDown: {},
        socket: null,
    }
    // Resize canvas to correct size
    Canvas.updateSize(canvas);
    Canvas.updateSize(spriteCanvas);
    addEventListener('resize', function() {
        Canvas.updateSize(canvas);
        Canvas.updateSize(spriteCanvas);
    }, false);

    for (var i = 0; i < Client.zindices.length; ++i)
        Client.zindices[i] = new SpriteContainer();

    $('*').keydown(function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();

        // Arrow keys:
        if (event.keyCode == 37)
            char = "a";
        else if (event.keyCode == 38)
            char = "w";
        else if (event.keyCode == 39)
            char = "d";
        else if (event.keyCode == 40)
            char = "s";

        if (!Client.keysDown[char]) {
            Client.keysDown[char] = true;
            var key = null;
            if (char == "w") key = Keys.UP;
            if (char == "a") key = Keys.LEFT;
            if (char == "s") key = Keys.DOWN;
            if (char == "d") key = Keys.RIGHT;
            if (char == " ") key = Keys.SPACEBAR;
            if (char == "r") key = Keys.R;

            if (key == Keys.SPACEBAR && Client.keysDown["lmb"]) return;

            if (key != null)
                new MessageRequestKeyStatusUpdate(key, true).send(Client.socket);
        }


    });
    $('*').keyup(function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();

        // Arrow keys:
        if (event.keyCode == 37)
            char = "a";
        else if (event.keyCode == 38)
            char = "w";
        else if (event.keyCode == 39)
            char = "d";
        else if (event.keyCode == 40)
            char = "s";

        if (Client.keysDown[char]) {
            Client.keysDown[char] = false;
            var key = null;
            if (char == "w") key = Keys.UP;
            if (char == "a") key = Keys.LEFT;
            if (char == "s") key = Keys.DOWN;
            if (char == "d") key = Keys.RIGHT;
            if (char == " ") key = Keys.SPACEBAR;
            if (char == "r") key = Keys.R;

            if (key == Keys.SPACEBAR && Client.keysDown["lmb"]) return;

            if (key != null)
                new MessageRequestKeyStatusUpdate(key, false).send(Client.socket);
        }
    });
    $("#eventdiv").mousedown(function(event) {
        if (event.button == 0 && !Client.keysDown["lmb"]) {
            Client.keysDown["lmb"] = true;
            if (Client.keysDown[" "]) return;
            new MessageRequestKeyStatusUpdate(Keys.SPACEBAR, true).send(Client.socket);
        }
    });
    $('*').mouseup(function(event) {
        if (event.button == 0 && Client.keysDown["lmb"]) {
            Client.keysDown["lmb"] = false;
            if (Client.keysDown[" "]) return;
            new MessageRequestKeyStatusUpdate(Keys.SPACEBAR, false).send(Client.socket);
        }
    });

    clientInitTextures(() => clientInitSocket(callback));
}



var clientInitTextures = function(callback) {
    Client.textures = loadTextures("data/textures/", ["block.png", "egg.png"], () => {
        Client.textureManager = new TextureManager(() => {
            Client.blockPosGood = new Sprite("blockPosGood.png");
            Client.blockPosGood.anchor = [0, 0];
            Client.zindices[2].add(Client.blockPosGood);
            Client.blockPosBad = new Sprite("blockPosBad.png");
            Client.blockPosBad.anchor = [0, 0];
            Client.zindices[2].add(Client.blockPosBad);
            $("*").mousemove(function(event) {
                Client.mouseX = event.pageX;
                Client.mouseY = event.pageY;
            });
            callback();
        });
    }, function(percentage, name) {
        console.log(percentage + "% complete. (" + name + ")");
    });
}

var clientInitSocket = function(callback) {
    var ip = window.vars.ip;
    var port = Config.port;
    console.log("Connecting to " + ip + ":" + port + "...");
    Client.socket = io(ip + ":" + port, {
        reconnection: false
    });
    global.sentInit2 = false;
    global.playersReceived = 0;

    Client.socket.on('connect', function() {

        setInterval(function() {
            //startTime = Date.now();
            Client.socket.emit('ping');
        }, 2000);

        console.log("Connected.");
        callback();
    });

    Client.socket.on('message', function(msg) {
        console.log("Message from server: " + msg);
    });

    Client.socket.on('error', function(error) {
        console.log("Connection failed. " + error);
    });

    Client.socket.on('ping', function() {
        Client.socket.emit('pong', Date.now());
    });

    Client.socket.on('pong', function(time) {
        global.ping = 2 * (Date.now() - time);
    });

    RegisterMessage.ToClient.forEach(function(messageType) {
        Client.socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData);
            if (Client.messageCallbacks[messageType.prototype.id])
                Client.messageCallbacks[messageType.prototype.id](message);
        });
    });
}

/*var Client = function(gameData, ip) {

    // This is code to test serialization and deserialization of UTF-8 strings.
    / *var test = "test1 test2 123 !@,@£€$€734ÅÄÖ";
    console.log("serializing \"" + test + "\"");
    var testArray = new Uint8Array(5000);
    var counter = new IndexCounter();
    Serialize.utf8(testArray, counter, test);
    console.log("serialized length " + testArray.length);
    counter = new IndexCounter();
    var testOut = Deserialize.utf8(testArray, counter);
    console.log("unserialized \"" + testOut + "\"");* /

    var port = Config.port;
    console.log("Connecting to " + ip + ":" + port + "...");
    global.socket = io(ip + ":" + port, {
        reconnection: false
    });
    global.sentInit2 = false;
    global.playersReceived = 0;

    socket.on('connect', function() {

        setInterval(function() {
            //startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        console.log("Connected.");
        global.World.events.trigger("connected");
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
        global.ping = 2 * (Date.now() - time);
    });

    RegisterMessage.ToClient.forEach(function(messageType) {
        socket.on(messageType.prototype.idString, function(data) {
            var message = new messageType();
            message.receive(gameData, data);
            message.execute(gameData);
            if (Client.messageCallbacks[messageType.prototype.id])
                Client.messageCallbacks[messageType.prototype.id](message);
        });
    });
}
global.Client = Client;

Client.prototype.sendMessage = function(message) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, command.id);
    command.serialize(byteArray, counter);
    socket.emit("command", byteArray);
}*/
