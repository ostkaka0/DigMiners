var canvas = document.getElementById("canvas");
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {'transparent':true});
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);
window.requestAnimationFrame(render);

var entityWorld = new EntityWorld();

var texture = PIXI.Texture.fromImage("data/textures/cheese.png");
var cheese = entityWorld.add();
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

var players = [new Player("karl", cheese.id)];

window.requestAnimationFrame(update);

// Player input
document.addEventListener('keypress', function(event) {
    var char = String.fromCharCode(event.keyCode).toLowerCase();
    if (char == "w") cheese.movement.up = true;
    if (char == "a") cheese.movement.left = true;
    if (char == "s") cheese.movement.down = true;
    if (char == "d") cheese.movement.right = true;
});
document.addEventListener('keyup', function(event) {
    var char = String.fromCharCode(event.keyCode).toLowerCase();
    if (char == "w") cheese.movement.up = false;
    if (char == "a") cheese.movement.left = false;
    if (char == "s") cheese.movement.down = false;
    if (char == "d") cheese.movement.right = false;
});

function update() {
    window.requestAnimationFrame(update);
    var now = performance.now();
    var newTickNum = Math.floor((now - firstTickTime) / tickDuration);
    var tickFracTime = (now - firstTickTime) / tickDuration - newTickNum;
    for(; tickNum < newTickNum; ++tickNum) {
        tick(toFix(tickDuration/1000.0));
    }

    render(tickFracTime);
}

function tick(dt) {
    entityWorld.entityArray.forEach(function(entity) {
        if (entity.angle) entity.angleOld = entity.angle;
    });
    // Only rotate half of the ticks
    if (tickNum %2 == 0)
        cheese.angle = fix.add(cheese.angle, 24*dt);

    entityFunctionPlayerMovement(dt, players, entityWorld);
    entityFunctionPhysicsBodySimulate(entityWorld, dt);
    entityWorld.update();
}

function render(tickFracTime) {
    entityWorld.entityArray.forEach(function(entity) {
        if (entity.physicsBody && entity.angle && entity.sprite) {
            entity.sprite.position.x = tickFracTime * entity.physicsBody.pos[0] + (1-tickFracTime) * entity.physicsBody.posOld[0];
            entity.sprite.position.y = canvas.height - (tickFracTime * entity.physicsBody.pos[1] + (1-tickFracTime) * entity.physicsBody.posOld[1]);
            entity.sprite.rotation = -(tickFracTime * entity.angle + (1-tickFracTime) * entity.angleOld);
        }
        if (entity.sprite)
            renderer.render(entity.sprite);
    });
}
