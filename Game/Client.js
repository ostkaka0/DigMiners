
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
        sprites: {},
        player: null,
        playerId: -1,
        playerEntity: null,
        textureManager: null,
        //zindices: new Array(3),
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
    Canvas.updateSize(glCanvas);
    addEventListener('resize', function() {
        Canvas.updateSize(canvas);
        Canvas.updateSize(glCanvas);
    }, false);

    //for (var i = 0; i < Client.zindices.length; ++i)
    //    Client.zindices[i] = new SpriteContainer();

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
    $("*").mousemove(function(e) {
        if (!Client.player || !Client.playerEntity) return;
        if (World.tickId - Client.lastMouseSync < 1) return;
        if (!WorldRenderer) return;
        if (!Client.socket) return;

        var entity = Client.playerEntity;
        Client.lastMouseSync = World.tickId;
        var worldCursorPos = [(e.pageX + WorldRenderer.camera.pos[0] - WorldRenderer.camera.width / 2) / 32, (Client.canvas.height - e.pageY + WorldRenderer.camera.pos[1] - WorldRenderer.camera.height / 2) / 32];
        var pos = entity.physicsBody.getPos();
        var diff = [worldCursorPos[0] - pos[0], worldCursorPos[1] - pos[1]];
        new MessageRequestRotate(diff).send(Client.socket);
    });
    $(document).mousedown(function(event) {
        if (!Client.socket) return;
        if (Client.player && Client.playerEntity && Client.playerEntity.isBuilding) {
            if (event.button == 0) {
                var stackId = Client.playerEntity.inventory.getEquippedStackId("tool");
                var bodies = [];
                if (!Client.player.canPlaceBlock(Client.player.buildPos[0], Client.player.buildPos[1]))
                    return false;
                if (stackId != null) {
                    var message = new MessageRequestPlaceBlock(stackId, Client.player.buildPos[0], Client.player.buildPos[1]);
                    message.send(Client.socket);
                }
            }
        } else if (Client.player && Client.playerEntity) {
            var worldCursorPos = [(event.pageX + WorldRenderer.camera.pos[0] - WorldRenderer.camera.width / 2) / 32, (canvas.height - event.pageY + WorldRenderer.camera.pos[1] - WorldRenderer.camera.height / 2) / 32];
            if (v2.distance(Client.playerEntity.physicsBody.getPos(), worldCursorPos) > 0.5) {
                var chunkPos = [0, 0];
                var localPos = [0, 0];
                BlockChunk.fromV2World(worldCursorPos, chunkPos, localPos);
                var blockPos = [chunkPos[0] * BlockChunk.dim + localPos[0], chunkPos[1] * BlockChunk.dim + localPos[1]];
                new MessageRequestClickBlock(blockPos, (event.button == 0 ? ClickTypes.LEFT_CLICK : (event.button == 2 ? ClickTypes.RIGHT_CLICK : ClickTypes.UNKNOWN))).send(Client.socket);
            }
        }
    });

    clientInitTextures(() => clientInitSocket(callback));
}



var clientInitTextures = function(callback) {
    Client.textures = loadTextures("data/textures/", Config.textures, () => {
        $("*").mousemove(function(event) {
            Client.mouseX = event.pageX;
            Client.mouseY = event.pageY;
        });
        callback();
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
    Client.playersReceived = 0;

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
            message.receive(data);
            message.execute();
        });
    });
}