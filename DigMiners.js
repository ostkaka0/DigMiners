
var canvas = document.getElementById("canvas");
canvasInitGL(canvas);
var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { 'transparent': true, 'antialias': true, 'view': canvas, 'clearBeforeRender': false });
var gl = renderer.gl;

window.zindices = new Array(3);
for (var i = 0; i < window.zindices.length; ++i) {
    window.zindices[i] = new PIXI.Container();
}
window.particleContainer = new PIXI.Container();

window.addEventListener('resize', function() {
    renderer.resize(window.innerWidth, window.innerHeight);
    camera.width = window.innerWidth;
    camera.height = window.innerHeight;
}, false);

var lastMouseSync = 0;
var mouseX = 0;
var mouseY = 0;

gameData.init();
gameData.events.on("texturesLoaded", function(textures) {
    // Must wait until all textures have loaded to continue! important
    this.blockPosGood = new PIXI.Sprite(textures["blockPosGood.png"]);
    window.zindices[2].addChild(this.blockPosGood);
    this.blockPosBad = new PIXI.Sprite(textures["blockPosBad.png"]);
    window.zindices[2].addChild(this.blockPosBad);
    $("*").mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    }.bind(this));
    client = new Client(gameData, window.vars.ip);
});

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
var loadingScreen = new LoadingScreen();
var textureManager = new TextureManager(gameData);
window.global = {};

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
            if (char == "r") key = Keys.R;
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
            if (char == "r") key = Keys.R;
            if (key != null)
                new MessageRequestKeyStatusUpdate(key, false).send(socket);
        }
    });

    // Start gameLoop
    gameLoop(tick, render, Config.tickDuration);
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
            physicsBody.posClient = v2.clone(physicsBody.getPos());
        } else if (entity.projectile) {
            var projectile = entity.projectile;
            projectile.posClientOld = v2.clone(projectile.posClient);
            projectile.posClient = v2.clone(projectile.pos);
        }
    });

    gameData.particleEmitterWorld.objectArray.forEach(function(emitter) {
        emitter.update(dt);
    });
}

render = function(tickFracTime) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set camera pos
    if (global.playerEntity && global.playerEntity.isActive) {
        camera.pos[0] = tickFracTime * 32.0 * global.playerEntity.physicsBody.posClient[0] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posClientOld[0];
        camera.pos[1] = tickFracTime * 32.0 * global.playerEntity.physicsBody.posClient[1] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posClientOld[1];
    } else // TODO: do something else instead of centering camera at 0,0?
        camera.pos = [0, 0];

    // Position entities
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.drawable) {
            var x = -camera.pos[0] + canvas.width / 2 + 32.0 * (tickFracTime * entity.physicsBody.posClient[0] + (1 - tickFracTime) * entity.physicsBody.posClientOld[0]);
            var y = camera.pos[1] + canvas.height / 2 - 32.0 * (tickFracTime * entity.physicsBody.posClient[1] + (1 - tickFracTime) * entity.physicsBody.posClientOld[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI * 2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI * 2) - a) * tickFracTime;
            entity.drawable.positionAll(x, y, rotation, entity.bodyparts);

            if (entity.bodyparts.bodyparts.feet) {
                var speed = v2.distance(entity.physicsBody.posClient, entity.physicsBody.posClientOld);
                entity.bodyparts.bodyparts["feet"].animate(gameData, "feet", speed * 450.0, false);
            }
        } else if (entity.projectile) {
            var pos = [tickFracTime * entity.projectile.posClient[0] + (1 - tickFracTime) * entity.projectile.posClientOld[0], tickFracTime * entity.projectile.posClient[1] + (1 - tickFracTime) * entity.projectile.posClientOld[1]]
            var x = -camera.pos[0] + canvas.width / 2 + 32.0 * pos[0];
            var y = camera.pos[1] + canvas.height / 2 - 32.0 * pos[1];

            if (entity.projectile.sprite) {
                entity.projectile.sprite.position.x = x;
                entity.projectile.sprite.position.y = y;
                entity.projectile.sprite.rotation = entity.projectile.angle;
                var distance = v2.distance(pos, entity.projectile.startPos)
                if (distance >= entity.projectile.projectileType.scaleX / 4)
                    entity.projectile.sprite.visible = true;
            }
        } else if (entity.blockPlacer && entity.blockPlacer.sprite) {
            entity.blockPlacer.sprite.position.x = -camera.pos[0] + canvas.width / 2 + 32 * (entity.blockPlacer.blockPos[0] + 0.5);
            entity.blockPlacer.sprite.position.y = camera.pos[1] + canvas.height / 2 - 32 * (entity.blockPlacer.blockPos[1] + 0.5);
            var factor = 1.0 - entity.blockPlacer.duration / Config.blockRegister[entity.blockPlacer.blockId].buildDuration;
            entity.blockPlacer.sprite.scale.x = factor;
            entity.blockPlacer.sprite.scale.y = factor;
        }
    });

    particleContainer.position.x = -camera.pos[0] + canvas.width / 2;
    particleContainer.position.y = camera.pos[1] + canvas.height / 2;

    if (global.player && global.playerEntity && global.playerEntity.isBuilding) {
        var worldCursorPos = [Math.floor((mouseX + camera.pos[0] - camera.width / 2) / 32), Math.floor((canvas.height - mouseY + camera.pos[1] - camera.height / 2) / 32)];
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

    // Render terrain and blocks
    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-Math.floor(camera.pos[0]), -Math.floor(camera.pos[1]));
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(gameData.tileWorld, projectionMatrix.clone().append(viewMatrix), camera);
    blockChunkRenderer.render(gameData, gameData.blockWorld, projectionMatrix.clone().append(viewMatrix), camera);

    // Render entities
    for (var i = 0; i < window.zindices.length; ++i)
        renderer.render(window.zindices[i]);
    renderer.render(particleContainer);

    renderer._activeShader = null;
    renderer._activeRenderTarget = renderer.rootRenderTarget;
    renderer._activeTextureLocation = 999;
    renderer._activeTexture = null;
    renderer.state.resetToDefault();
}

loadChunk = function(world, x, y) {
    if (gameData.generator) {
        var chunk = new Chunk();
        gameData.generator.generate(chunk, x, y);
        world.set(x, y, chunk);
    }
}

onMessage = function(messageType, callback) {
    gameData.messageCallbacks[messageType.prototype.id] = callback;
}

$(document).mousedown(function(event) {
    if (global.player && global.playerEntity && global.playerEntity.isBuilding) {
        if (event.button == 0) {
            var stackId = global.playerEntity.inventory.getEquippedStackId("tool");
            var bodies = [];
            if (!global.player.canPlaceBlock(gameData, global.player.buildPos[0], global.player.buildPos[1]))
                return false;
            if (stackId != null) {
                var message = new MessageRequestPlaceBlock(stackId, global.player.buildPos[0], global.player.buildPos[1]);
                message.send(socket);
            }
        }
    } else if (global.player && global.playerEntity) {
        var worldCursorPos = [(event.pageX + camera.pos[0] - camera.width / 2) / 32, (canvas.height - event.pageY + camera.pos[1] - camera.height / 2) / 32];
        if (v2.distance(global.playerEntity.physicsBody.getPos(), worldCursorPos) > 0.5) {
            var chunkPos = [0, 0];
            var localPos = [0, 0];
            v2WorldToBlockChunk(worldCursorPos, chunkPos, localPos);
            var blockPos = [chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0], chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1]];
            new MessageRequestClickBlock(blockPos, (event.button == 0 ? ClickTypes.LEFT_CLICK : (event.button == 2 ? ClickTypes.RIGHT_CLICK : ClickTypes.UNKNOWN))).send(socket);
        }
    }
});

gameData.events.on("connected", function() {
    this.deathScreen = new DeathScreen();
}.bind(this));

gameData.events.on("ownPlayerSpawned", function(entity, player) {
    $("#hud").unbind("mousemove");
    $("#hud").mousemove(function(e) {
        if (gameData.tickId - lastMouseSync >= 1) {
            lastMouseSync = gameData.tickId;
            var worldCursorPos = [(mouseX + camera.pos[0] - camera.width / 2) / 32, (canvas.height - mouseY + camera.pos[1] - camera.height / 2) / 32];
            var pos = entity.physicsBody.getPos();
            var diff = [worldCursorPos[0] - pos[0], worldCursorPos[1] - pos[1]];
            new MessageRequestRotate(diff).send(socket);
        }
    }.bind(this));
}.bind(this));

gameData.entityWorld.onAdd["DigMiners.js"] = function(entity) {
    if (!isServer && entity.health && entity.drawable)
        gameData.events.trigger("healthChange", entity);

    if (entity.drawable && entity.bodyparts) {
        entity.drawable.initializeBodyparts(entity.bodyparts.bodyparts);
        // Uncomment to enable click sprites
        /*for (var key in entity.bodyparts.bodyparts) {
            var bodypart = entity.bodyparts.bodyparts[key];
            bodypart.sprite.sprite.interactive = true;
            bodypart.sprite.sprite.on("mousedown", function(mouseData) {
                new MessageRequestClickEntity(entity.id, ClickTypes.LEFT_CLICK).send(socket);
            });
            bodypart.sprite.sprite.on("rightdown", function(mouseData) {
                new MessageRequestClickEntity(entity.id, ClickTypes.RIGHT_CLICK).send(socket);
            });
        }*/
    }

    if (entity.nameComponent && entity.drawable)
        entity.nameComponent.applyName(entity);

    if (entity.item && entity.item.amount > 1) {
        var text = new PIXI.Text(entity.item.amount, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
        var textSprite = new Sprite(null, text, false);
        entity.drawable.addSprite("textAmount", textSprite, null, false);
    }
}

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
