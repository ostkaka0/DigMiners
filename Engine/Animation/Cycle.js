/*var Cycle = function(frames) {
    this.frames = [];
    this.load(frames);
}
global.Cycle = Cycle;

Cycle.prototype.load = function(frames) {
    for (var i = 0; i < frames.length; ++i) {
        var current = frames[i];
        var x = current[0];
        var y = current[1];
        var angle = current[2];
        var numFrames = current[3];
        for (var j = 0; j < numFrames; ++j) {
            var startX = (i > 0 ? frames[i - 1][0] : frames[frames.length - 1][0]);
            var startY = (i > 0 ? frames[i - 1][1] : frames[frames.length - 1][1]);
            var startAngle = (i > 0 ? frames[i - 1][2] : frames[frames.length - 1][2]);
            var currentX = startX + (j / numFrames) * (x - startX);
            var currentY = startY + (j / numFrames) * (y - startY);
            var currentAngle = startAngle + (j / numFrames) * (angle - startAngle);
            this.frames.push([currentX, currentY, currentAngle]);
            //console.log("created cycle " + currentX + " - " + currentY + " . " + currentAngle);
        }
    }
    this.numFrames = this.frames.length;
    //console.log("Created cycle with " + this.frames.length + " frames.");
}
 */
