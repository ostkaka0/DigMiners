(() => {

var frameTime = 1000 / 60;
var lastFrameTime = performance.now();
var startDate = performance.now();
var firstTickTime = performance.now();
var tickNum = 0;
var tickDuration = Config.tickDuration;
var loadingScreen = new LoadingScreen();
var deathScreen = null;

var init = function() {
    gameInit();
    requestAnimationFrame(update);

    deathScreen = new DeathScreen();
}

var update = function() {
    var now = performance.now();
    var newTickNum = Math.floor((now - firstTickTime) / tickDuration);
    var tickFracTime = (now - firstTickTime) / tickDuration - newTickNum;
    // Refresh tab when simulation lag
    if (newTickNum - tickNum > 1200) {
        location.reload();
        exit();
    }
    // Simulate ticks:
    if (World) {
        var readyTicks = 0;
        for (var i = 0; i <= 6 && World.pendingCommands[World.tickId + i]; i++)
            readyTicks++;

        if (readyTicks >= 3) {
            while (readyTicks >= 1 && World.pendingCommands[World.tickId]) {
                tick(tickDuration / 1000.0);
                tickNum++;
                readyTicks--;
            }
        }

        if (World.pendingCommands[World.tickId]) {
            tick(tickDuration / 1000.0);
            tickNum++;
        }
    }
    //for (; tickNum < newTickNum; ++tickNum)
    //    tick(tickDuration / 1000.0);
    // Render:
    render(tickFracTime);
    // Skip frames:
    var now = performance.now();
    var delay = lastFrameTime - now + frameTime;
    while (delay < 0.0 * frameTime) {
        delay += frameTime;
        lastFrameTime += frameTime;
        //console.log("Skipping frame");
    }
    lastFrameTime += frameTime;
    requestAnimationFrame(update);
}

var tick = function(dt) {
    gameTick(dt);
    //clientTick(dt);
    gameModeTick(dt);
    worldTick(dt);
}

var render = function(dt) {
    worldRendererRender(dt);
}

clientInit(init);

})();
