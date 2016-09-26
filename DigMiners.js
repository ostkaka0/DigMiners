var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { 'transparent': true });
var stage = new PIXI.Container();
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);

var gameData = new GameData();
var camera = new Camera();
var chunkRenderer = new ChunkRenderer(gl, gameData.tileWorld, 32.0);
var commands = [];
var playerEntity = null;
var animationManager = new AnimationManager();
var keysDown = {};
var messageCallbacks = {};
var textureManager = new TextureManager();

loadGame = function() {
    animationManager.load();
    // Player input
    document.addEventListener('keydown', function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        if(!keysDown[char]) {
            keysDown[char] = true;
            var playerMoveDirection = null;
            if(char == "w") playerMoveDirection = PlayerMoveDirection.ENABLE_UP;
            if(char == "a") playerMoveDirection = PlayerMoveDirection.ENABLE_LEFT;
            if(char == "s") playerMoveDirection = PlayerMoveDirection.ENABLE_DOWN;
            if(char == "d") playerMoveDirection = PlayerMoveDirection.ENABLE_RIGHT;
            if(char == " ") playerMoveDirection = PlayerMoveDirection.ENABLE_SPACEBAR;
            if(playerMoveDirection != null)
                client.sendCommand(new CommandPlayerMove(player.playerId, playerMoveDirection));
        }
    });
    document.addEventListener('keyup', function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        if(keysDown[char]) {
            keysDown[char] = false;
            var playerMoveDirection = null;
            if(char == "w") playerMoveDirection = PlayerMoveDirection.DISABLE_UP;
            if(char == "a") playerMoveDirection = PlayerMoveDirection.DISABLE_LEFT;
            if(char == "s") playerMoveDirection = PlayerMoveDirection.DISABLE_DOWN;
            if(char == "d") playerMoveDirection = PlayerMoveDirection.DISABLE_RIGHT;
            if(char == " ") playerMoveDirection = PlayerMoveDirection.DISABLE_SPACEBAR;
            if(playerMoveDirection != null)
                client.sendCommand(new CommandPlayerMove(player.playerId, playerMoveDirection));
        }
    });

    // Start gameLoop
    gameLoop(tick, render, gameData.tickDuration);
}

tick = function(dt) {
    //console.log(dt);
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if(entity.physicsBody && entity.physicsBody.angle)
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    });

    commands.forEach(function(command) {
        command.execute(gameData);
    });
    commands.length = 0;
    gameData.playerWorld.update();
    entityFunctionPlayerMovement(gameData, dt);
    entityFunctionPhysicsBodySimulate(gameData, dt);
    gameData.entityWorld.update();
}

render = function(tickFracTime) {
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.frustrum.x = tickFracTime * 32.0 * playerEntity.physicsBody.pos[0] + (1 - tickFracTime) * 32.0 * playerEntity.physicsBody.posOld[0];
    camera.frustrum.y = tickFracTime * 32.0 * playerEntity.physicsBody.pos[1] + (1 - tickFracTime) * 32.0 * playerEntity.physicsBody.posOld[1];

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.frustrum.x, -camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(gameData.tileWorld, projectionMatrix.clone().append(viewMatrix), camera);

    gameData.entityWorld.objectArray.forEach(function(entity) {
        if(entity.physicsBody && entity.drawable) {
            var x = -camera.frustrum.x + canvas.width / 2 + tickFracTime * 32.0 * entity.physicsBody.pos[0] + (1 - tickFracTime) * 32.0 * entity.physicsBody.posOld[0];
            var y = camera.frustrum.y + canvas.height / 2 - (tickFracTime * 32.0 * entity.physicsBody.pos[1] + (1 - tickFracTime) * 32.0 * entity.physicsBody.posOld[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI * 2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI * 2) - a) * tickFracTime;
            //console.log("angle " + entity.physicsBody.angle + " old " + entity.physicsBody.angleOld);
            entity.drawable.positionAll(x, y, rotation);

            var entitySpeed = Math.sqrt(entity.physicsBody.speed[0] * entity.physicsBody.speed[0] + entity.physicsBody.speed[1] * entity.physicsBody.speed[1]);
            //console.log(entitySpeed);
            if(entity.drawable.bodyparts.feet)
                entity.drawable.animate("feet", "feet", entitySpeed * 16.0, false);
        }
    });

    //TODO: animationmanager use dt? maybe not needed
    animationManager.update();
    renderer.render(stage);
}

loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    gameData.generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}

onMessage = function(messageType, callback) {
    messageCallbacks[messageType.prototype.id] = callback;
}

onTexturesLoadProgress = function(name, file, progress) {

}

onTexturesLoadComplete = function() {
    // Must wait until all textures have loaded to continue! important

    client = new Client(gameData, "127.0.0.1", 3000);
}

onMessage(MessageInit, function(message) {
    player = gameData.playerWorld.objects[message.playerId];
    playerEntity = gameData.entityWorld.objects[message.entityId];
    loadGame();
});

onMessage(MessagePlayerInventory, function(message) {
    player = gameData.playerWorld.objects[message.playerId];
    player.setName(message.itemName, gameData);
});