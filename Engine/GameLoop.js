
module.exports = function(tick, render, tickDuration) {
    var frameTime = 1000 / 60;
    var lastFrameTime = performance.now();
    var startDate = performance.now();
    var firstTickTime = performance.now();
    var tickNum = 0;

    function update() {
        window.requestAnimationFrame(update);
        var now = performance.now();

        // Simulate ticks:
        var newTickNum = Math.floor((now - firstTickTime) / tickDuration);
        var tickFracTime = (now - firstTickTime) / tickDuration - newTickNum;
        if (newTickNum - tickNum > 1200)
            location.reload();
        for (; tickNum < newTickNum; ++tickNum) {
            tick(tickDuration / 1000.0);
        }
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
    }
    window.requestAnimationFrame(update);
}
