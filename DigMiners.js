var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {'transparent':true});
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);
var socket = io("127.0.0.1:3000");

var playerWorld = new ObjectWorld();
var entityWorld = new ObjectWorld();
var tileWorld = new Map2D();
var generator = new Generator(1337);
var chunkRenderer = new ChunkRenderer(gl, tileWorld, 32.0);
var camera = new Camera();
var gameData = { playerWorld: playerWorld, entityWorld: entityWorld, tileWorld: tileWorld };

var texture = PIXI.Texture.fromImage("data/textures/cheese.png");
var playerEntity = entityWorld.add({});
var player = playerWorld.add(new Player("karl", playerEntity.id));
playerEntity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.02);
playerEntity.movement = new Movement(2000.0);
playerEntity.angle = toFix(0);
playerEntity.angleOld = playerEntity.angle;
playerEntity.sprite = new PIXI.Sprite(texture);
playerEntity.sprite.anchor.x = 0.5;
playerEntity.sprite.anchor.y = 0.5;

/*var frameTime = 1000/60;
var lastFrameTime = performance.now();
var startDate = performance.now();
var tickDuration = 1000.0/8.0;
var firstTickTime = performance.now();
var tickNum = 0;*/
var commands = [];

loadGame = function() {
    for (var x = -4; x < 4; ++x) {
        for (var y = -4; y < 4; ++y) {
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
        if (playerMoveDirection != null)
            commands.push(new CommandPlayerMove(player.id, playerMoveDirection));
    });
    document.addEventListener('keyup', function(event) {
        var char = String.fromCharCode(event.keyCode).toLowerCase();
        var playerMoveDirection = null;
        if (char == "w") playerMoveDirection = PlayerMoveDirection.DISABLE_UP;
        if (char == "a") playerMoveDirection = PlayerMoveDirection.DISABLE_LEFT;
        if (char == "s") playerMoveDirection = PlayerMoveDirection.DISABLE_DOWN;
        if (char == "d") playerMoveDirection = PlayerMoveDirection.DISABLE_RIGHT;
        if (playerMoveDirection != null)
            commands.push(new CommandPlayerMove(player.id, playerMoveDirection));
    });

    // Start gameLoop
    gameLoop(tick, render);
}

loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}

/*function update() {
    window.requestAnimationFrame(update);
    var now = performance.now();
    var newTickNum = Math.floor((now - firstTickTime) / tickDuration);
    var tickFracTime = (now - firstTickTime) / tickDuration - newTickNum;
    for(; tickNum < newTickNum; ++tickNum) {
        tick(toFix(tickDuration/1000.0));
    }

    render(tickFracTime);
    
    // Skip frames:
    var now = performance.now();
    var delay = lastFrameTime - now + frameTime;
    while(delay < 0.0*frameTime) {
        delay += frameTime;
        lastFrameTime += frameTime;
        console.log("Skipping frame");
    }
    lastFrameTime += frameTime;
}*/

tick = function(dt) {
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.angle) entity.angleOld = entity.angle;
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

    camera.frustrum.x = tickFracTime * playerEntity.physicsBody.pos[0] + (1-tickFracTime) * playerEntity.physicsBody.posOld[0];
    camera.frustrum.y = tickFracTime * playerEntity.physicsBody.pos[1] + (1-tickFracTime) * playerEntity.physicsBody.posOld[1];

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.frustrum.x, -camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2/canvas.width, 2/canvas.height);
    chunkRenderer.render(tileWorld, projectionMatrix.clone().append(viewMatrix), camera);

    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.angle && entity.sprite) {
            entity.sprite.position.x = -camera.frustrum.x + canvas.width/2 + tickFracTime * entity.physicsBody.pos[0] + (1-tickFracTime) * entity.physicsBody.posOld[0];
            entity.sprite.position.y = camera.frustrum.y + canvas.height/2 - (tickFracTime * entity.physicsBody.pos[1] + (1-tickFracTime) * entity.physicsBody.posOld[1]);
            entity.sprite.rotation = -(tickFracTime * entity.angle + (1-tickFracTime) * entity.angleOld);
        }
    });
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.sprite)
            renderer.render(entity.sprite);
    });
}

loadGame();