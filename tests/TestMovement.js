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
cheese.pos = v2.create(200, 150);
cheese.speed = v2.create(0, 0);
cheese.angle = toFix(0);
cheese.posOld = v2.clone(cheese.pos);
cheese.angleOld = cheese.angle;
cheese.sprite = new PIXI.Sprite(texture);
cheese.sprite.anchor.x = 0.5;
cheese.sprite.anchor.y = 0.5;
cheese.sprite.position.x = 200;
cheese.sprite.position.y = 150;

var tickDuration = 1000.0/8.0;
var firstTickTime = performance.now();
var tickNum = 0;

var moveUp = false;
var moveLeft = false;
var moveDown = false;
var moveRight = false;
var speed = 200.0;

window.requestAnimationFrame(update);

document.addEventListener('keypress', function(event) {
    var char = String.fromCharCode(event.keyCode).toLowerCase();
    if (char == "w")
        moveUp = true;
    if (char == "a")
        moveLeft = true;
    if (char == "s")
        moveDown = true;
    if (char == "d")
        moveRight = true;
});

document.addEventListener('keyup', function(event) {
    var char = String.fromCharCode(event.keyCode).toLowerCase();
    if (char == "w")
        moveUp = false;
    if (char == "a")
        moveLeft = false;
    if (char == "s")
        moveDown = false;
    if (char == "d")
        moveRight = false;
});

function update() {
    window.requestAnimationFrame(update);
    var now = performance.now();

    var newTickNum = Math.floor((now - firstTickTime) / tickDuration);
    var tickFracTime = (now - firstTickTime) / tickDuration - newTickNum;
    for(; tickNum < newTickNum; ++tickNum) {
        tick(tickDuration/1000.0);
    }

    
    render(tickFracTime);
}

function tick(dt) {
    entityWorld.entityArray.forEach(function(entity) {
        if (entity.pos && entity.angle) {
            entity.posOld = v2.clone(entity.pos);
            entity.angleOld = entity.angle;
        }
    });
    // Only rotate half of the ticks
    if (tickNum %2 == 0)
        cheese.angle = fix.add(cheese.angle, 24*dt);

    v2.mul(fix.pow(0.1, dt), cheese.speed, cheese.speed);

    if (moveLeft && !moveRight)
        v2.add(v2.create(-speed*dt, 0), cheese.speed, cheese.speed);
    else if (!moveLeft && moveRight)
        v2.add(v2.create(speed*dt, 0), cheese.speed, cheese.speed);

    if (moveDown && !moveUp)
        v2.add(v2.create(0, -speed*dt), cheese.speed, cheese.speed);
    else if (!moveDown && moveUp)
        v2.add(v2.create(0, speed*dt), cheese.speed, cheese.speed);

    v2.add(cheese.speed, cheese.pos, cheese.pos);

    entityWorld.update();
}

function render(tickFracTime) {
    entityWorld.entityArray.forEach(function(entity) {
        if (entity.pos && entity.angle && entity.sprite) {
            entity.sprite.position.x = tickFracTime * entity.pos[0] + (1-tickFracTime) * entity.posOld[0];
            entity.sprite.position.y = canvas.height - (tickFracTime * entity.pos[1] + (1-tickFracTime) * entity.posOld[1]);
            entity.sprite.rotation = -(tickFracTime * entity.angle + (1-tickFracTime) * entity.angleOld);
        }
        if (entity.sprite)
            renderer.render(entity.sprite);
    });
}
