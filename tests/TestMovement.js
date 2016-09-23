var canvas = document.getElementById("canvas");
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {'transparent':true});
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);
window.requestAnimationFrame(render);

var idList = new IdList();
var playerWorld = new ObjectWorld();
var entityWorld = new ObjectWorld();
var gameData = { playerWorld: playerWorld, entityWorld: entityWorld, tileWorld: new Map2D() };

var texture = PIXI.Texture.fromImage("data/textures/cheese.png");
var cheese = entityWorld.add({}, idList.next());
var player = playerWorld.add(new Player("karl", cheese.id), idList.next());
cheese.physicsBody = new PhysicsBody(v2.create(0, 0), 0.02);
cheese.movement = new Movement(2000.0);
cheese.angle = toFix(0);
cheese.angleOld = cheese.angle;
cheese.sprite = new PIXI.Sprite(texture);
cheese.sprite.anchor.x = 0.5;
cheese.sprite.anchor.y = 0.5;

var tickDuration = 1000.0/8.0;
var firstTickTime = performance.now();
var tickNum = 0;

var commands = [];

gameLoop(tick, render);

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

function tick(dt) {
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.angle) entity.angleOld = entity.angle;
    });
    // Only rotate half of the ticks
    if (tickNum %2 == 0)
        cheese.angle = fix.add(cheese.angle, 24*dt);

    commands.forEach(function(command) {
        command.execute(gameData);
    });
    commands.length = 0;
    playerWorld.update();
    entityFunctionPlayerMovement(gameData, dt);
    entityFunctionPhysicsBodySimulate(gameData, dt);
    entityWorld.update();
}

function render(tickFracTime) {
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.angle && entity.sprite) {
            entity.sprite.position.x = tickFracTime * entity.physicsBody.pos[0] + (1-tickFracTime) * entity.physicsBody.posOld[0];
            entity.sprite.position.y = canvas.height - (tickFracTime * entity.physicsBody.pos[1] + (1-tickFracTime) * entity.physicsBody.posOld[1]);
            entity.sprite.rotation = -(tickFracTime * entity.angle + (1-tickFracTime) * entity.angleOld);
        }
        if (entity.sprite)
            renderer.render(entity.sprite);
    });
}
