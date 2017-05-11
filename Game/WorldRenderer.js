
var WorldRenderer = null;

var worldRendererInit = function() {
    Canvas.updateSize(canvas);
    Canvas.updateSize(spriteCanvas);
    WorldRenderer = {
        camera: {
            width: window.innerWidth,
            height: window.innerHeight,
            pos: v2.create(0, 0)
        },
        chunkRenderer: new ChunkRenderer(Client.gl, World.tiles, 32.0),
        blockRenderer: new BlockChunkRenderer(Client.gl, World.blocks, 32.0),
        animationManager: new AnimationManager(),
    }
    WorldRenderer.onResize = function() {
        WorldRenderer.camera.width = window.innerWidth;
        WorldRenderer.camera.height = window.innerHeight;
    };
    addEventListener('resize', WorldRenderer.onResize, false);
    WorldRenderer.animationManager.load();

    // Initialize bodypart-sprites:
    Event.subscribe(World.entities.onAdd, this, function(entity) {
        if (!isServer && entity.health && entity.drawable)
            Event.trigger(EntityHealth.Events.onChange, entity);

        if (entity.drawable && entity.bodyparts) {
            entity.drawable.initializeBodyparts(entity.bodyparts.bodyparts);
        }

        if (entity.name && entity.drawable)
            entity.name.applyName(entity);

        // Text on items on ground
        if (entity.item && entity.item.amount > 1) {
            var textSprite = new TextSprite(entity.item.amount, "Monospace", 15, "#ffffff");
            entity.drawable.addSprite("textAmount", textSprite, null, false);
        }
    });
}

var worldRendererDestroy = function() {
    if (!WorldRenderer) return;
    removeEventListener('resize', WorldRessnderer.onResize, false);
    WorldRenderer = null;
}

var worldRendererRender = function(tickFracTime) {
    if (!WorldRenderer) return;
    var gl = Client.gl;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set camera pos
    if (Client.spectateEntity) {
        WorldRenderer.camera.pos[0] = tickFracTime * 32.0 * Client.spectateEntity.physicsBody.getPos()[0] + (1 - tickFracTime) * 32.0 * Client.spectateEntity.physicsBody.getPos()[0];
        WorldRenderer.camera.pos[1] = tickFracTime * 32.0 * Client.spectateEntity.physicsBody.getPos()[1] + (1 - tickFracTime) * 32.0 * Client.spectateEntity.physicsBody.getPos()[1];
    } else if (Client.playerEntity && Client.playerEntity.isActive) {
        v2.mul(32., Client.playerEntity.physicsBody.getPos(), WorldRenderer.camera.pos);
        //WorldRenderer.camera.pos[0] = tickFracTime * 32.0 * Client.playerEntity.physicsBody.getPos()[0] + (1 - tickFracTime) * 32.0 * Client.playerEntity.physicsBody.getPos()[0];
        //WorldRenderer.camera.pos[1] = tickFracTime * 32.0 * Client.playerEntity.physicsBody.getPos()[1] + (1 - tickFracTime) * 32.0 * Client.playerEntity.physicsBody.getPos()[1];
    } else // TODO: do something else instead of centering camera at 0,0?
        WorldRenderer.camera.pos = [0, 0];

    // Position entities
    for (var i = 0; i < World.entities.objectArray.length; i++) {
        var entity = World.entities.objectArray[i];
        if (entity.physicsBody && entity.drawable) {
            var x = -WorldRenderer.camera.pos[0] + Client.canvas.width / 2 + 32.0 * entity.physicsBody.getPos()[0];//(tickFracTime * entity.physicsBody.getPos()[0] + (1 - tickFracTime) * entity.physicsBody.getPos()[0]);
            var y = WorldRenderer.camera.pos[1] + Client.canvas.height / 2 - 32.0 * entity.physicsBody.getPos()[1];//(tickFracTime * entity.physicsBody.getPos()[1] + (1 - tickFracTime) * entity.physicsBody.getPos()[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI * 2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI * 2) - a) * tickFracTime;
            entity.drawable.positionAll(x, y, rotation, entity.bodyparts);

            if (entity.bodyparts.bodyparts.feet) {
                var speed = v2.length(entity.physicsBody.getVelocity());
                entity.bodyparts.bodyparts["feet"].animate("feet", speed * 25.0, false);
            }
        } else if (entity.projectile) {
            var pos = [tickFracTime * entity.projectile.pos[0] + (1 - tickFracTime) * entity.projectile.pos[0], tickFracTime * entity.projectile.pos[1] + (1 - tickFracTime) * entity.projectile.pos[1]]
            var x = -WorldRenderer.camera.pos[0] + Client.canvas.width / 2 + 32.0 * pos[0];
            var y = WorldRenderer.camera.pos[1] + Client.canvas.height / 2 - 32.0 * pos[1];

            if (entity.projectile.sprite) {
                entity.projectile.sprite.pos[0] = x;
                entity.projectile.sprite.pos[1] = y;
                entity.projectile.sprite.angle = entity.projectile.angle;
                var distance = v2.distance(pos, entity.projectile.startPos)
                if (distance >= entity.projectile.projectileType.scaleX / 4)
                    entity.projectile.sprite.visible = true;
            }
        } else if (entity.blockPlacer && entity.blockPlacer.sprite) {
            entity.blockPlacer.sprite.pos[0] = -WorldRenderer.camera.pos[0] + Client.canvas.width / 2 + 32 * (entity.blockPlacer.blockPos[0] + 0.5);
            entity.blockPlacer.sprite.pos[1] = WorldRenderer.camera.pos[1] + Client.canvas.height / 2 - 32 * (entity.blockPlacer.blockPos[1] + 0.5);
            var factor = 1.0 - entity.blockPlacer.duration / Game.blockRegister[entity.blockPlacer.blockId].buildDuration;
            entity.blockPlacer.sprite.scale[0] = factor;
            entity.blockPlacer.sprite.scale[1] = factor;
        }
    }

    if (Client.player && Client.playerEntity && Client.playerEntity.isBuilding) {
        var worldCursorPos = [Math.floor((Client.mouseX + WorldRenderer.camera.pos[0] - WorldRenderer.camera.width / 2) / 32), Math.floor((Client.canvas.height - Client.mouseY + WorldRenderer.camera.pos[1] - WorldRenderer.camera.height / 2) / 32)];
        var chunkPos = [0, 0];
        var localPos = [0, 0];
        BlockChunk.fromV2World(worldCursorPos, chunkPos, localPos);
        var blockPos = [chunkPos[0] * BlockChunk.dim + localPos[0], chunkPos[1] * BlockChunk.dim + localPos[1]];
        Client.player.buildPos = blockPos;
        if (Client.player.canPlaceBlock(Game, blockPos[0], blockPos[1])) {
            Client.blockPosBad.visible = false;
            Client.blockPosGood.visible = true;
            Client.blockPosGood.pos[0] = blockPos[0] * 32 - WorldRenderer.camera.pos[0] + WorldRenderer.camera.width / 2;
            Client.blockPosGood.pos[1] = Client.canvas.height - ((blockPos[1] + 1) * 32 - WorldRenderer.camera.pos[1] + WorldRenderer.camera.height / 2);
        } else {
            Client.blockPosGood.visible = false;
            Client.blockPosBad.visible = true;
            Client.blockPosBad.pos[0] = blockPos[0] * 32 - WorldRenderer.camera.pos[0] + WorldRenderer.camera.width / 2;
            Client.blockPosBad.pos[1] = Client.canvas.height - ((blockPos[1] + 1) * 32 - WorldRenderer.camera.pos[1] + WorldRenderer.camera.height / 2);
        }
    } else {
        Client.blockPosGood.visible = false;
        Client.blockPosBad.visible = false;
    }

    //TODO: animationmanager use dt? maybe not needed
    WorldRenderer.animationManager.update();

    // Render terrain and blocks
    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-Math.floor(WorldRenderer.camera.pos[0]), -Math.floor(WorldRenderer.camera.pos[1]));
    viewMatrix = viewMatrix.scale(2 / Client.canvas.width, 2 / Client.canvas.height);
    WorldRenderer.chunkRenderer.render(World.tiles, projectionMatrix.clone().append(viewMatrix), WorldRenderer.camera);
    WorldRenderer.blockRenderer.render(World.blocks, projectionMatrix.clone().append(viewMatrix), WorldRenderer.camera);

    // Render entities
    Client.context.clearRect(0, 0, Client.canvas.width, Client.canvas.height);
    for (var i = 0; i < Client.zindices.length; ++i) {
        var arr = Client.zindices[i].getAll();
        for (var j = 0; j < arr.length; ++j) {
            var sprite = arr[j];
            if (sprite.visible)
                sprite.draw(Client.context);
        }
    }

    // Render particles
    World.particles.render(WorldRenderer.camera, Client.context, tickFracTime);
}
