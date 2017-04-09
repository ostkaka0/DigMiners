var canvas = document.getElementById("canvas");
var spriteCanvas = document.getElementById("spriteCanvas");
var context2d = spriteCanvas.getContext("2d", { antialias: true });
var gl = Canvas.initGL(canvas);

Canvas.updateSize(canvas);
Canvas.updateSize(spriteCanvas);

window.zindices = new Array(3);
for (var i = 0; i < window.zindices.length; ++i)
    window.zindices[i] = new SpriteContainer();

window.addEventListener('resize', function() {
    Canvas.updateSize(canvas);
    Canvas.updateSize(spriteCanvas);
    camera.width = window.innerWidth;
    camera.height = window.innerHeight;

}, false);

var lastMouseSync = 0;
var mouseX = 0;
var mouseY = 0;
var deathScreen = null;
window.client = null;

gameData.init();

var camera = {
    width: window.innerWidth,
    height: window.innerHeight,
    pos: v2.create(0, 0)
};
var chunkRenderer = new ChunkRenderer(gl, World.tileWorld, 32.0);
var blockChunkRenderer = new BlockChunkRenderer(gl, World.blockWorld, 32.0);
var commands = [];
var player = null;
var playerEntity = null;
var keysDown = {};
var loadingScreen = new LoadingScreen();
var textureManager = new TextureManager();
//window.global = {};


var keyCodeLeft = 37;
var keyCodeLeft = 38;
var keyCodeLeft = 39;
var keyCodeLeft = 37;

//gameData.events.onChangeGamemode.set(window, function() {
//    var chunkRenderer = new ChunkRenderer(gl, World.tileWorld, 32.0);
//    var blockChunkRenderer = new BlockChunkRenderer(gl, World.blockWorld, 32.0);
//})

window.loadGame = function() {
    gameData.animationManager.load();
    // Player input
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

        if (!keysDown[char]) {
            keysDown[char] = true;
            var key = null;
            if (char == "w") key = Keys.UP;
            if (char == "a") key = Keys.LEFT;
            if (char == "s") key = Keys.DOWN;
            if (char == "d") key = Keys.RIGHT;
            if (char == " ") key = Keys.SPACEBAR;
            if (char == "r") key = Keys.R;

            if (key == Keys.SPACEBAR && keysDown["lmb"]) return;

            if (key != null)
                new MessageRequestKeyStatusUpdate(key, true).send(socket);
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

        if (keysDown[char]) {
            keysDown[char] = false;
            var key = null;
            if (char == "w") key = Keys.UP;
            if (char == "a") key = Keys.LEFT;
            if (char == "s") key = Keys.DOWN;
            if (char == "d") key = Keys.RIGHT;
            if (char == " ") key = Keys.SPACEBAR;
            if (char == "r") key = Keys.R;

            if (key == Keys.SPACEBAR && keysDown["lmb"]) return;

            if (key != null)
                new MessageRequestKeyStatusUpdate(key, false).send(socket);
        }
    });
    $("#eventdiv").mousedown(function(event) {
        if (event.button == 0 && !keysDown["lmb"]) {
            keysDown["lmb"] = true;
            if (keysDown[" "]) return;
            new MessageRequestKeyStatusUpdate(Keys.SPACEBAR, true).send(socket);
        }
    });
    $('*').mouseup(function(event) {
        if (event.button == 0 && keysDown["lmb"]) {
            keysDown["lmb"] = false;
            if (keysDown[" "]) return;
            new MessageRequestKeyStatusUpdate(Keys.SPACEBAR, false).send(socket);
        }
    });

    // Start gameLoop
    gameLoop(tick, render, Config.tickDuration);
}

var tick = function(dt) {
    var readyTicks = 0;
    for (var i = 0; i <= 6 && World.pendingCommands[World.tickId + i]; i++)
        readyTicks++;

    if (readyTicks >= 3) {
        while (readyTicks >= 1 && World.pendingCommands[World.tickId]) {
            gameData.tick(dt);
            readyTicks--;
        }
    }

    if (World.pendingCommands[World.tickId])
        gameData.tick(dt);

    // Fix interpolation after MessagePlayerMove
    World.entityWorld.objectArray.forEach(function(entity) {
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

    World.particleWorld.update(dt);
}

var render = function(tickFracTime) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set camera pos
    if (global.spectateEntity) {
        camera.pos[0] = tickFracTime * 32.0 * global.spectateEntity.physicsBody.posClient[0] + (1 - tickFracTime) * 32.0 * global.spectateEntity.physicsBody.posClientOld[0];
        camera.pos[1] = tickFracTime * 32.0 * global.spectateEntity.physicsBody.posClient[1] + (1 - tickFracTime) * 32.0 * global.spectateEntity.physicsBody.posClientOld[1];
    } else if (global.playerEntity && global.playerEntity.isActive) {
        camera.pos[0] = tickFracTime * 32.0 * global.playerEntity.physicsBody.posClient[0] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posClientOld[0];
        camera.pos[1] = tickFracTime * 32.0 * global.playerEntity.physicsBody.posClient[1] + (1 - tickFracTime) * 32.0 * global.playerEntity.physicsBody.posClientOld[1];
    } else // TODO: do something else instead of centering camera at 0,0?
        camera.pos = [0, 0];

    // Position entities
    World.entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.drawable) {
            var x = -camera.pos[0] + canvas.width / 2 + 32.0 * (tickFracTime * entity.physicsBody.posClient[0] + (1 - tickFracTime) * entity.physicsBody.posClientOld[0]);
            var y = camera.pos[1] + canvas.height / 2 - 32.0 * (tickFracTime * entity.physicsBody.posClient[1] + (1 - tickFracTime) * entity.physicsBody.posClientOld[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI * 2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI * 2) - a) * tickFracTime;
            entity.drawable.positionAll(x, y, rotation, entity.bodyparts);

            if (entity.bodyparts.bodyparts.feet) {
                var speed = v2.distance(entity.physicsBody.posClient, entity.physicsBody.posClientOld);
                entity.bodyparts.bodyparts["feet"].animate("feet", speed * 500.0, false);
            }
        } else if (entity.projectile) {
            var pos = [tickFracTime * entity.projectile.posClient[0] + (1 - tickFracTime) * entity.projectile.posClientOld[0], tickFracTime * entity.projectile.posClient[1] + (1 - tickFracTime) * entity.projectile.posClientOld[1]]
            var x = -camera.pos[0] + canvas.width / 2 + 32.0 * pos[0];
            var y = camera.pos[1] + canvas.height / 2 - 32.0 * pos[1];

            if (entity.projectile.sprite) {
                entity.projectile.sprite.pos[0] = x;
                entity.projectile.sprite.pos[1] = y;
                entity.projectile.sprite.angle = entity.projectile.angle;
                var distance = v2.distance(pos, entity.projectile.startPos)
                if (distance >= entity.projectile.projectileType.scaleX / 4)
                    entity.projectile.sprite.visible = true;
            }
        } else if (entity.blockPlacer && entity.blockPlacer.sprite) {
            entity.blockPlacer.sprite.pos[0] = -camera.pos[0] + canvas.width / 2 + 32 * (entity.blockPlacer.blockPos[0] + 0.5);
            entity.blockPlacer.sprite.pos[1] = camera.pos[1] + canvas.height / 2 - 32 * (entity.blockPlacer.blockPos[1] + 0.5);
            var factor = 1.0 - entity.blockPlacer.duration / global.gameData.blockRegister[entity.blockPlacer.blockId].buildDuration;
            entity.blockPlacer.sprite.scale[0] = factor;
            entity.blockPlacer.sprite.scale[1] = factor;
        }
    });

    if (global.player && global.playerEntity && global.playerEntity.isBuilding) {
        var worldCursorPos = [Math.floor((mouseX + camera.pos[0] - camera.width / 2) / 32), Math.floor((canvas.height - mouseY + camera.pos[1] - camera.height / 2) / 32)];
        var chunkPos = [0, 0];
        var localPos = [0, 0];
        BlockChunk.fromV2World(worldCursorPos, chunkPos, localPos);
        var blockPos = [chunkPos[0] * BlockChunk.dim + localPos[0], chunkPos[1] * BlockChunk.dim + localPos[1]];
        global.player.buildPos = blockPos;
        if (global.player.canPlaceBlock(gameData, blockPos[0], blockPos[1])) {
            window.blockPosBad.visible = false;
            window.blockPosGood.visible = true;
            window.blockPosGood.pos[0] = blockPos[0] * 32 - camera.pos[0] + camera.width / 2;
            window.blockPosGood.pos[1] = canvas.height - ((blockPos[1] + 1) * 32 - camera.pos[1] + camera.height / 2);
        } else {
            window.blockPosGood.visible = false;
            window.blockPosBad.visible = true;
            window.blockPosBad.pos[0] = blockPos[0] * 32 - camera.pos[0] + camera.width / 2;
            window.blockPosBad.pos[1] = canvas.height - ((blockPos[1] + 1) * 32 - camera.pos[1] + camera.height / 2);
        }
    } else {
        window.blockPosGood.visible = false;
        window.blockPosBad.visible = false;
    }

    //TODO: animationmanager use dt? maybe not needed
    gameData.animationManager.update();

    // Render terrain and blocks
    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-Math.floor(camera.pos[0]), -Math.floor(camera.pos[1]));
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(World.tileWorld, projectionMatrix.clone().append(viewMatrix), camera);
    blockChunkRenderer.render(gameData, World.blockWorld, projectionMatrix.clone().append(viewMatrix), camera);

    // Render entities
    context2d.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    for (var i = 0; i < zindices.length; ++i) {
        var arr = zindices[i].getAll();
        for (var j = 0; j < arr.length; ++j) {
            var sprite = arr[j];
            if (sprite.visible)
                sprite.draw(context2d);
        }
    }

    // Render particles
    World.particleWorld.render(camera, context2d, tickFracTime);
}

var loadChunk = function(world, x, y) {
    if (World.generator) {
        var chunk = new Chunk();
        World.generator.generate(chunk, x, y);
        world.set([x, y], chunk);
    }
}

var onMessage = function(messageType, callback) {
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
            BlockChunk.fromV2World(worldCursorPos, chunkPos, localPos);
            var blockPos = [chunkPos[0] * BlockChunk.dim + localPos[0], chunkPos[1] * BlockChunk.dim + localPos[1]];
            new MessageRequestClickBlock(blockPos, (event.button == 0 ? ClickTypes.LEFT_CLICK : (event.button == 2 ? ClickTypes.RIGHT_CLICK : ClickTypes.UNKNOWN))).send(socket);
        }
    }
});

World.events.on("connected", function() {
    deathScreen = new DeathScreen();
});

$("*").mousemove(function(e) {
    if (!global.player || !global.playerEntity) return;
    if (World.tickId - lastMouseSync < 1) return;

    var entity = global.playerEntity;
    lastMouseSync = World.tickId;
    var worldCursorPos = [(e.pageX + camera.pos[0] - camera.width / 2) / 32, (canvas.height - e.pageY + camera.pos[1] - camera.height / 2) / 32];
    var pos = entity.physicsBody.getPos();
    var diff = [worldCursorPos[0] - pos[0], worldCursorPos[1] - pos[1]];
    new MessageRequestRotate(diff).send(socket);
});

World.events.on("ownPlayerSpawned", function(entity, player) {
    if (gameData.HUD.inventory)
        gameData.HUD.inventory.remove();
    if (entity.inventory) {
        gameData.HUD.inventory = new InventoryHUD(entity.inventory, "Your amazing inventory", 10);
        gameData.HUD.inventory.update();
    }
});

World.entityWorld.onAdd.set(window, function(entity) {
    if (!isServer && entity.health && entity.drawable)
        Event.trigger(EntityHealth.Events.onChange, entity);

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

    if (entity.name && entity.drawable)
        entity.name.applyName(entity);

    // Text on items on ground
    if (entity.item && entity.item.amount > 1) {
        var textSprite = new TextSprite(entity.item.amount, "Monospace", 15, "#ffffff");
        entity.drawable.addSprite("textAmount", textSprite, null, false);
    }
});

World.physicsWorld.onCollision.push(function(collisions) {
    if (global.playerEntity && collisions) {
        collisions.forEach(function(collision) {
            var aEntity = World.physicsEntities[collision[0]];
            var bEntity = World.physicsEntities[collision[1]];
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

TextureLoader.Events.onComplete.set(window, function(textures) {
    // Must wait until all textures have loaded to continue! important
    window.blockPosGood = new Sprite("blockPosGood.png");
    window.blockPosGood.anchor = [0, 0];
    window.zindices[2].add(window.blockPosGood);
    window.blockPosBad = new Sprite("blockPosBad.png");
    window.blockPosBad.anchor = [0, 0];
    window.zindices[2].add(window.blockPosBad);
    $("*").mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });
    client = new Client(gameData, window.vars.ip);
});
