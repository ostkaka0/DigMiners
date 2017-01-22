Animation = function(name, texture, numFrames, frameWidth, frameHeight) {
    this.name = name;
    this.texture = texture;
    this.numFrames = numFrames;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frames = [];
    this.load();
}

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
}
