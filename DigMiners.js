var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { 'transparent': true, 'antialias': true });
var stage = new PIXI.Container();
var zindices = new Array();
zindices[0] = new PIXI.Container();
zindices[1] = new PIXI.Container();
zindices[2] = new PIXI.Container();
for (var i = 0; i < zindices.length; ++i)
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
        if (!keysDown[char]) {
            keysDown[char] = true;
            var key = null;
            if (char == "w") key = Keys.UP;
            if (char == "a") key = Keys.LEFT;
            if (char == "s") key = Keys.DOWN;
            if (char == "d") key = Keys.RIGHT;
            if (char == " ") key = Keys.SPACEBAR;
            if (key != null)
                new MessageRequestKeyStatusUpdate(key, true).send(socket);
        }
    });
    $('*').keyup(function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        if (keysDown[char]) {
            keysDown[char] = false;
            var key = null;
            if (char == "w") key = Keys.UP;
            if (char == "a") key = Keys.LEFT;
            if (char == "s") key = Keys.DOWN;
            if (char == "d") key = Keys.RIGHT;
            if (char == " ") key = Keys.SPACEBAR;
            if (key != null)
                new MessageRequestKeyStatusUpdate(key, false).send(socket);
        }
    });

    // Start gameLoop
    gameLoop(tick, render, gameData.tickDuration);
}

tick = function(dt) {
    var readyTicks = 0;
    for (var i = 0; i <= 6 && gameData.pendingCommands[gameData.tickId + i]; i++)
        readyTicks++;

    if (readyTicks >= 3) {
        while (readyTicks >= 1 && gameData.pendingCommands[gameData.tickId]) {
            gameData.tick(dt);
            readyTicks--;
        }
    }

    if (gameData.pendingCommands[gameData.tickId])
        gameData.tick(dt);

    // Fix interpolation after MessagePlayerMove
    forOf(this, gameData.entityWorld.objectArray, function(entity) {
        if (entity.physicsBody) {
            var physicsBody = entity.physicsBody;
            physicsBody.posClientOld = v2.clone(physicsBody.posClient);
            physicsBody.posClient = v2.clone(physicsBody.pos);
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

    if (global.playerEntity && global.playerEntity.isActive) {
        camera.pos[0] = tickFracTime * 32.0 * global.playerEntity.physicsBody.posClient[0] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posClientOld[0];
        camera.pos[1] = tickFracTime * 32.0 * global.playerEntity.physicsBody.posClient[1] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posClientOld[1];
    } else // TODO: do something else instead of centering camera at 0,0?
        camera.pos = [0, 0];

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-Math.floor(camera.pos[0]), -Math.floor(camera.pos[1]));
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(gameData.tileWorld, projectionMatrix.clone().append(viewMatrix), camera);
    blockChunkRenderer.render(gameData, gameData.blockWorld, projectionMatrix.clone().append(viewMatrix), camera);

    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.drawable) {
            var x = -camera.pos[0] + canvas.width / 2 + tickFracTime * 32.0 * entity.physicsBody.posClient[0] + (1 - tickFracTime) * 32.0 * entity.physicsBody.posClientOld[0];
            var y = camera.pos[1] + canvas.height / 2 - (tickFracTime * 32.0 * entity.physicsBody.posClient[1] + (1 - tickFracTime) * 32.0 * entity.physicsBody.posClientOld[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI * 2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI * 2) - a) * tickFracTime;
            //console.log("angle " + entity.physicsBody.angle + " old " + entity.physicsBody.angleOld);
            entity.drawable.positionAll(x, y, rotation, entity.bodyparts);

            //console.log(entitySpeed);
            if (entity.bodyparts.bodyparts.feet) {
                var speed = v2.distanceSquared(entity.physicsBody.posClient, entity.physicsBody.posClientOld);
                entity.bodyparts.bodyparts["feet"].animate(gameData, "feet", speed * 450.0, false);
                //console.log("entity " + entity.id + " speed " + entitySpeed);
            }
        }
    });

    if (global.player && global.playerEntity && global.playerEntity.isBuilding) {
        var worldCursorPos = [Math.floor((this.mouseX + camera.pos[0] - camera.width / 2) / 32), Math.floor((canvas.height - this.mouseY + camera.pos[1] - camera.height / 2) / 32)];
        var chunkPos = [0, 0];
        var localPos = [0, 0];
        v2WorldToBlockChunk(worldCursorPos, chunkPos, localPos);
        var blockPos = [chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0], chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1]];
        global.player.buildPos = blockPos;
        if (global.player.canPlaceBlock(gameData, blockPos[0], blockPos[1])) {
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
    if (gameData.generator) {
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

$(document).click(function(event) {
    if (global.player && global.playerEntity && global.playerEntity.isBuilding) {
        var stackId = global.playerEntity.inventory.getEquippedStackId("tool");
        var bodies = [];
        if (!global.player.canPlaceBlock(gameData, global.player.buildPos[0], global.player.buildPos[1]))
            return false;
        if (stackId != null) {
            var message = new MessageRequestPlaceBlock(stackId, global.player.buildPos[0], global.player.buildPos[1]);
            message.send(socket);
        }
    }
});

gameData.entityWorld.onAdd.push(function(entity) {
    if (!global.playerEntity && entity.id == global.playerEntityId)
        global.playerEntity = entity;

    if (entity.item && entity.item.amount > 1) {
        var text = new PIXI.Text(entity.item.amount, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
        var textSprite = new Sprite(null, text, false);
        entity.drawable.addSprite("textAmount", textSprite, null, false);
    }

    if (!isServer && entity.health && entity.drawable)
        onHealthChange(entity);

    if (entity.drawable && entity.bodyparts)
        entity.drawable.initializeBodyparts(entity.bodyparts.bodyparts);

    if (entity.nameComponent && entity.drawable)
        entity.nameComponent.applyName(entity);
});

gameData.physicsWorld.onCollision.push(function(collisions) {
    if (global.playerEntity && collisions) {
        collisions.forEach(function(collision) {
            var aEntity = gameData.physicsEntities[collision[0]];
            var bEntity = gameData.physicsEntities[collision[1]];
            if (aEntity == undefined || bEntity == undefined) return;
            var playerEntity = null;
            var itemEntity = null;
            if (aEntity.id == global.playerEntity.id) {
                playerEntity = aEntity;
                itemEntity = bEntity;
            } else if (bEntity.id == global.playerEntity.id) {
                playerEntity = bEntity;
                itemEntity = aEntity;
            } else
                return;
            if (itemEntity.item && itemEntity.physicsBody && (!itemEntity.item.dropped || ((new Date()) - itemEntity.item.dropped) >= 500)) {
                var message = new MessageRequestItemPickup(itemEntity.id);
                message.send(socket);
            }
        });
    }
});