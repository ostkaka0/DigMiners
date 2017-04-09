(() => {


var update = function() {
    Client.canvas.width = window.innerWidth;
    Client.canvas.height = window.innerHeight;
    tick();
    render();
    window.requestAnimationFrame(update, 1000.0 / 60.0);
}

var tick = function() {
    gameTick();
    worldTick();
}

var render = function() {
    for(var i = 0; i < World.entities.objectArray.length; i++) {
        var entity = World.entities.objectArray[i];
        if (!entity.drawTransform) continue;
        entity.drawTransform.begin(Client.context);
        if (entity.texture)
            Client.context.drawImage(entity.texture, 0, 0, 1, 1);
        entity.drawTransform.end(Client.context);
    }
    worldRendererRender();

    /*var time = (Date.now() - Client.startTime) / 1000.0;
    Client.context.clearRect(0, 0, canvas.width, canvas.height);
    var transformA = new DrawTransform([64, 64], time, [64.0, 16.0]);
    transformA.begin(Client.context);
    Client.context.drawImage(Client.textures["block.png"], 0, 0, 1, 1);
    transformA.end(Client.context);
    for (var i = 0; i < 1000; i++) {
        var transformB = new DrawTransform([600 + 400 * Math.sin(time + i / 4), 200 + 0.6 * i], time + i / 2, [32.0, 8.0]);
        transformB.begin(Client.context);
        Client.context.drawImage(Client.textures["egg.png"], 0, 0, 1, 1);
        transformB.end(Client.context);
    }*/
}

clientInit(() => {
    gameInit();
    worldInit(); // TODO: initWorld at MessageInit and MessageChangeGameMode
    worldRendererInit();
    update();
    var entity = World.entities.add({}, 1);
    entity.drawTransform = new DrawTransform([0, 0], 0, [32, 32]);
    entity.texture = Client.textures["block.png"];
});

})();
