class Animation {
    constructor(rect, animationColumns = 1, animationRows = 1, animationLength = animationCOlumns * animationRows) {
        this.rect = rect;
        this.animationColumns = animationColumns;
        this.animationRows = animationRows;
        this.animationLength = animationLength;
    }

    getRect(animationId = 0) {
        animationId %= this.animationLength;
        return [
            this.rect[0] + (animationId % this.animationColumns) * this.rect[2],
            this.rect[1] + (animationId / this.animationColumns >> 0) * this.rect[3],
            this.rect[2],
            this.rect[3]];
    }
}

/*var Animation = function(name, texture, numFrames, frameWidth, frameHeight) {
    this.texture = texture;
    this.numFrames = numFrames;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frames = [];
    this.load();
}
global.Animation = Animation;

Animation.prototype.load = function() {
    var currentFrames = 0;

    for (var y = 0; y < this.texture.height / this.frameHeight; y++) {
        for (var x = 0; x < this.texture.width / this.frameWidth; x++) {
            if (currentFrames < this.numFrames) {
                var rect = [x * this.frameWidth, y * this.frameHeight, this.frameWidth, this.frameHeight];
                this.frames.push(rect);
                currentFrames++;
            }
            else {
                console.log("Loaded animation with " + currentFrames + " frames.");
                return;
            }
        }
    }
}*/
