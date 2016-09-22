var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {'transparent':true});
var stage = new PIXI.Container();
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);
var client = new Client("127.0.0.1", 3000);

var playerWorld = new ObjectWorld();
var entityWorld = new ObjectWorld();
var tileWorld = new Map2D();
var generator = new Generator(1337);
var chunkRenderer = new ChunkRenderer(gl, tileWorld, 32.0);
var camera = new Camera();
var gameData = { playerWorld: playerWorld, entityWorld: entityWorld, tileWorld: tileWorld };

onTexturesLoadProgress = function(name, file, progress) {

}

onTexturesLoadComplete = function() {
    // Must wait until all textures have loaded to continue! important

    animationManager = new AnimationManager();
    animationManager.load();

    //todo: playerEntity is global
    playerEntity = entityWorld.add({});

    //todo: player is global
    player = playerWorld.add(new Player("karl", playerEntity.id));

    playerEntity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
    playerEntity.movement = new Movement(50.0);
    var sprite = new PIXI.Sprite(textures.feet);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;  
    var bodySprite = new PIXI.Sprite(textures.dig);
    bodySprite.anchor.x = 0.5;
    bodySprite.anchor.y = 0.5;
    var bodyparts = {
        "feet": {
            "sprite": sprite
        },
        "body": {
            "sprite": bodySprite
        }
    };
    playerEntity.drawable = new Drawable(stage, bodyparts, animationManager);
    
    //todo: commands is global
    commands = [];
    
    loadGame();
}
var textureManager = new TextureManager();

loadGame = function() {
    for (var x = -8; x < 8; ++x) {
        for (var y = -8; y < 8; ++y) {
            loadChunk(tileWorld, x, y);
        }
    }

    // Player input
    document.addEventListener('keypress', function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        var playerMoveDirection = null;
        if (char == "w") playerMoveDirection = PlayerMoveDirection.ENABLE_UP;
        if (char == "a") playerMoveDirection = PlayerMoveDirection.ENABLE_LEFT;
        if (char == "s") playerMoveDirection = PlayerMoveDirection.ENABLE_DOWN;
        if (char == "d") playerMoveDirection = PlayerMoveDirection.ENABLE_RIGHT;
        if (char == " ") playerEntity.drawable.animate("body", "dig", 200, false);
        if (playerMoveDirection != null)
            client.sendCommand(new CommandPlayerMove(player.id, playerMoveDirection));
    });
    document.addEventListener('keyup', function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        var playerMoveDirection = null;
        if (char == "w") playerMoveDirection = PlayerMoveDirection.DISABLE_UP;
        if (char == "a") playerMoveDirection = PlayerMoveDirection.DISABLE_LEFT;
        if (char == "s") playerMoveDirection = PlayerMoveDirection.DISABLE_DOWN;
        if (char == "d") playerMoveDirection = PlayerMoveDirection.DISABLE_RIGHT;
        if (char == " ") playerEntity.drawable.unanimate("body", "dig", true);
        if (playerMoveDirection != null)
            client.sendCommand(new CommandPlayerMove(player.id, playerMoveDirection));
    });

    // Start gameLoop
    gameLoop(tick, render);
}

loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}

tick = function(dt) {
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.physicsBody.angle) 
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    });

    commands.forEach(function(command) {
        command.execute(gameData);
    });
    commands.length = 0;
    playerWorld.update();
    entityFunctionPlayerMovement(gameData, dt);
    entityFunctionPhysicsBodySimulate(gameData, dt);
    entityWorld.update();
}

render = function(tickFracTime) {
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.frustrum.x = tickFracTime * 32.0 * playerEntity.physicsBody.pos[0] + (1-tickFracTime) * 32.0 * playerEntity.physicsBody.posOld[0];
    camera.frustrum.y = tickFracTime * 32.0 * playerEntity.physicsBody.pos[1] + (1-tickFracTime) * 32.0 * playerEntity.physicsBody.posOld[1];

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.frustrum.x, -camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2/canvas.width, 2/canvas.height);
    chunkRenderer.render(tileWorld, projectionMatrix.clone().append(viewMatrix), camera);

    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.drawable) {
            var x = -camera.frustrum.x + canvas.width/2 + tickFracTime * 32.0 * entity.physicsBody.pos[0] + (1-tickFracTime) * 32.0 * entity.physicsBody.posOld[0];
            var y = camera.frustrum.y + canvas.height/2 - (tickFracTime * 32.0 * entity.physicsBody.pos[1] + (1-tickFracTime) * 32.0 * entity.physicsBody.posOld[1]);

            var a = (entity.physicsBody.angle - entity.physicsBody.angleOld) % (Math.PI*2);
            var rotation = entity.physicsBody.angleOld + (2 * a % (Math.PI*2) - a) * tickFracTime;
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