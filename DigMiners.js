var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { 'transparent': true, 'antialias': true });
var stage = new PIXI.Container();
var zindices = new Array();
zindices[0] = new PIXI.Container();
zindices[1] = new PIXI.Container();
zindices[2] = new PIXI.Container();
for(var i = 0; i < zindices.length; ++i)
    stage.addChild(zindices[i]);
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);

window.addEventListener('resize', function() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    this.camera.width = window.innerWidth;
    this.camera.height = window.innerHeight;
}, false);

var gameData = new GameData();
var camera = {
    width: window.innerWidth,
    height: window.innerHeight,
    pos: v2.create(0, 0)
};
var chunkRenderer = new ChunkRenderer(gl, gameData.tileWorld, 32.0);
var blockChunkRenderer = new BlockChunkRenderer(gl, gameData.blockWorld, 32.0);
var commands = [];
var player = null;
var playerEntity = null;
var keysDown = {};
var messageCallbacks = {};
var textureManager = new TextureManager(gameData);
var global = {};

loadGame = function() {
    gameData.animationManager.load();
    // Player input
    $('*').keydown(function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        if(!keysDown[char]) {
            keysDown[char] = true;
            var playerMoveDirection = null;
            if(char == "w") playerMoveDirection = MoveDir.ENABLE_UP;
            if(char == "a") playerMoveDirection = MoveDir.ENABLE_LEFT;
            if(char == "s") playerMoveDirection = MoveDir.ENABLE_DOWN;
            if(char == "d") playerMoveDirection = MoveDir.ENABLE_RIGHT;
            if(char == " ") playerMoveDirection = MoveDir.ENABLE_SPACEBAR;
            if(playerMoveDirection != null)
                new MessageRequestPlayerMove(playerMoveDirection).send(socket);
        }
    });
    $('*').keyup(function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        if(keysDown[char]) {
            keysDown[char] = false;
            var playerMoveDirection = null;
            if(char == "w") playerMoveDirection = MoveDir.DISABLE_UP;
            if(char == "a") playerMoveDirection = MoveDir.DISABLE_LEFT;
            if(char == "s") playerMoveDirection = MoveDir.DISABLE_DOWN;
            if(char == "d") playerMoveDirection = MoveDir.DISABLE_RIGHT;
            if(char == " ") playerMoveDirection = MoveDir.DISABLE_SPACEBAR;
            if(playerMoveDirection != null)
                new MessageRequestPlayerMove(playerMoveDirection).send(socket);
        }
    });

    // Start gameLoop
    gameLoop(tick, render, gameData.tickDuration);
}

tick = function(dt) {
    //console.log(dt);
    var readyTicks = 0;
    for(var i = 0; i <= 6 && gameData.pendingCommands[gameData.tickId + i]; i++)
        readyTicks++;

    //console.log("Ready ticks: " + readyTicks);

    if(readyTicks >= 3) {
        while(readyTicks >= 1 && gameData.pendingCommands[gameData.tickId]) {
            gameData.tick(dt);
            readyTicks--;
        }
    }

    if(gameData.pendingCommands[gameData.tickId])
        gameData.tick(dt);

    // Fix interpolation after MessagePlayerMove
    forOf(this, gameData.entityWorld.objectArray, function(entity) {
        if(entity.physicsBody) {
            var physicsBody = entity.physicsBody;
            if(physicsBody.posClient)
                physicsBody.posOld = v2.clone(physicsBody.posClient);
            physicsBody.posClient = v2.clone(physicsBody.pos);
        }
    });

    gameData.entityWorld.objectArray.forEach(function(entity) {
        //console.log("item? " + entity.item);
        if(entity.item && entity.physicsBody && !entity.destroying && (!entity.item.dropped || ((new Date()) - entity.item.dropped) >= 500)) {
            var dis = v2.distance(entity.physicsBody.pos, global.playerEntity.physicsBody.pos);
            //console.log("dis client: " + dis);
            if(dis <= gameData.itemPickupDistance) {
                var message = new MessageRequestItemPickup(entity.id);
                message.send(socket);
            }
        }
    });
}

render = function(tickFracTime) {
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.pos[0] = tickFracTime * 32.0 * global.playerEntity.physicsBody.pos[0] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posOld[0];
    camera.pos[1] = tickFracTime * 32.0 * global.playerEntity.physicsBody.pos[1] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posOld[1];

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-Math.floor(camera.pos[0]), -Math.floor(camera.pos[1]));
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(gameData.tileWorld, projectionMatrix.clone().append(viewMatrix), camera);
    blockChunkRenderer.render(gameData, gameData.blockWorld, projectionMatrix.clone().append(viewMatrix), camera);

    gameData.entityWorld.objectArray.forEach(function(entity) {
        if(entity.physicsBody && entity.drawable) {
            var x = -camera.pos[0] + canvas.width / 2 + tickFracTime * 32.0 * entity.physicsBody.pos[0] + (1 - tickFracTime) * 32.0 * entity.physicsBody.posOld[0];
            var y = camera.pos[1] + canvas.height / 2 - (tickFracTime * 32.0 * entity.physicsBody.pos[1] + (1 - tickFracTime) * 32.0 * entity.physicsBody.posOld[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI * 2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI * 2) - a) * tickFracTime;
            //console.log("angle " + entity.physicsBody.angle + " old " + entity.physicsBody.angleOld);
            entity.drawable.positionAll(x, y, rotation, entity.bodyparts);

            //console.log(entitySpeed);
            if(entity.bodyparts.bodyparts.feet) {
                var entitySpeed = Math.sqrt(entity.physicsBody.speed[0] * entity.physicsBody.speed[0] + entity.physicsBody.speed[1] * entity.physicsBody.speed[1]);
                entity.bodyparts.bodyparts["feet"].animate(gameData, "feet", entitySpeed * 16.0, false);
                //console.log("entity " + entity.id + " speed " + entitySpeed);
            }
        }
    });

    if(global.player.isBuilding) { // isBuilding is set in Player.js line 50+
        var worldCursorPos = [Math.floor((this.mouseX + camera.pos[0] - camera.width / 2) / 32), Math.floor((canvas.height - this.mouseY + camera.pos[1] - camera.height / 2) / 32)];
        var chunkPos = [0, 0];
        var localPos = [0, 0];
        v2WorldToBlockChunk(worldCursorPos, chunkPos, localPos);
        var blockPos = [chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0], chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1]];
        global.player.buildPos = blockPos;
        if(global.player.canPlaceBlock(gameData, blockPos[0], blockPos[1])) {
            this.blockPosBad.visible = false;
            this.blockPosGood.visible = true;
            this.blockPosGood.position.x = blockPos[0] * 32 - camera.pos[0] + camera.width / 2;
            this.blockPosGood.position.y = canvas.height - ((blockPos[1] + 1) * 32 - camera.pos[1] + camera.height / 2);
        } else {
            this.blockPosGood.visible = false;
            this.blockPosBad.visible = true;
            this.blockPosBad.position.x = blockPos[0] * 32 - camera.pos[0] + camera.width / 2;
            this.blockPosBad.position.y = canvas.height - ((blockPos[1] + 1) * 32 - camera.pos[1] + camera.height / 2);
        }
    } else {
        this.blockPosGood.visible = false;
        this.blockPosBad.visible = false;
    }

    //TODO: animationmanager use dt? maybe not needed
    gameData.animationManager.update();

    renderer.render(stage);
}

loadChunk = function(world, x, y) {
    if(gameData.generator) {
        var chunk = new Chunk();
        gameData.generator.generate(chunk, x, y);
        world.set(x, y, chunk);
    }
}

onMessage = function(messageType, callback) {
    messageCallbacks[messageType.prototype.id] = callback;
}

onTexturesLoadProgress = function(name, file, progress) {

}

onTexturesLoadComplete = function(textures) {
    // Must wait until all textures have loaded to continue! important
    this.blockPosGood = new PIXI.Sprite(textures["blockPosGood.png"]);
    this.stage.addChild(this.blockPosGood);
    this.blockPosBad = new PIXI.Sprite(textures["blockPosBad.png"]);
    this.stage.addChild(this.blockPosBad);
    $("*").mousemove(function(event) {
        //console.log(event.pageX + ", " + event.pageY);
        //console.log(worldPos);
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;
    }.bind(this));
    client = new Client(gameData, window.vars.ip);
}

onMessage(MessageInit, function(message) {
    global.player = gameData.playerWorld.objects[message.playerId];
    global.playerEntity = gameData.entityWorld.objects[message.entityId];
    loadGame();
    createHUD(gameData);
});

$(document).click(function(event) {
    if(global.player.isBuilding) {
        var stackId = global.player.inventory.getEquippedStackId("tool");
        var bodies = [];
        if(!global.player.canPlaceBlock(gameData, global.player.buildPos[0], global.player.buildPos[1]))
            return false;
        if(stackId != null) {
            var message = new MessageRequestPlaceBlock(stackId, global.player.buildPos[0], global.player.buildPos[1]);
            message.send(socket);
        }
    }
});

gameData.entityWorld.onAdd.push(function(entity) {
    if(entity.item && entity.item.amount > 1) {
        var text = new PIXI.Text(entity.item.amount, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
        var textSprite = new Sprite(null, text, false);
        entity.drawable.addSprite("textAmount", textSprite, null, false);
    }
    if(!isServer && entity.health && entity.drawable)
        onHealthChange(entity);
    if(entity.drawable && entity.bodyparts)
        entity.drawable.initializeBodyparts(entity.bodyparts.bodyparts);
    if(entity.name && entity.drawable)
        entity.name.applyName(entity);
});
