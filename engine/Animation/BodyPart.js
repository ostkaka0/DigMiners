
BodyPart = function(sprite, offsetX, offsetY, offsetRotation, pivot, parent) {
    this.sprite = sprite;
    this.offset = [offsetX, offsetY, offsetRotation];
    this.defaultOffset = [offsetX, offsetY, offsetRotation];
    this.cycleOffset = [0, 0, 0];
    if (pivot && (pivot[0] != 0 || pivot[1] != 0)) {
        this.usePivot = true;
        this.pivot = pivot;
        if (!isServer) {
            this.sprite.sprite.anchor.x = 0;
            this.sprite.sprite.anchor.y = 0;
            this.sprite.sprite.pivot.x = pivot[0];
            this.sprite.sprite.pivot.y = pivot[1];
        }
    } else
        this.pivot = [0, 0];
    this.parent = parent;
    this.children = [];
    this.animInstance = null;
}

BodyPart.prototype.position = function(x, y, rotation) {
    this.sprite.sprite.position.x = x + this.offset[0];
    this.sprite.sprite.position.y = y + this.offset[1];
    this.sprite.sprite.rotation = rotation + this.offset[2];
    this.children.forEach(function(child) {
        BodyPart.positionChild(child, this);
    }.bind(this));
}

BodyPart.positionChild = function(child, parent) {
    child.sprite.sprite.position.x = parent.sprite.sprite.position.x;
    child.sprite.sprite.position.y = parent.sprite.sprite.position.y;
    var rotation3 = parent.sprite.sprite.rotation + child.cycleOffset[2] + child.offset[2];
    var rotatedOffset = BodyPart.rotate(0, 0, child.cycleOffset[0], child.cycleOffset[1], rotation3);
    var derivedOffset = BodyPart.rotate(0, 0, child.offset[0], child.offset[1], parent.sprite.sprite.rotation);
    child.sprite.sprite.position.x += rotatedOffset[0] + derivedOffset[0];
    child.sprite.sprite.position.y += rotatedOffset[1] + derivedOffset[1];
    child.sprite.sprite.rotation = rotation3;
    child.children.forEach(function(child2) {
        BodyPart.positionChild(child2, child);
    }.bind(this));
}

BodyPart.rotate = function(ax, ay, x, y, angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        nx = (cos * (x - ax)) + (sin * (y - ay)) + ax,
        ny = (cos * (y - ay)) - (sin * (x - ax)) + ay;
    return [-nx, ny];
}

BodyPart.prototype.cycle = function(gameData, cycle, fps, runToEnd) {
    if (!this.cycleInstance)
        this.cycleInstance = {};
    this.cycleInstance.cycle = gameData.animationManager.cycles[cycle];
    this.cycleInstance.rest = 0;
    this.cycleInstance.mspf = 1000.0 / fps;
    if (!this.cycleInstance.lastFrame || !this.cycleInstance)
        this.cycleInstance.lastFrame = new Date();
    //if (!this.cycleInstance.currentFrame)
    this.cycleInstance.currentFrame = 0;
    this.cycleInstance.runToEnd = runToEnd; //If animation is aborted, finish animation and stop at frame 0
    this.cycleInstance.finishing = false;
}

BodyPart.prototype.finishCycle = function() {
    if (this.cycleInstance) {
        this.cycleInstance.runToEnd = true;
        this.cycleInstance.finishing = false;
    }
}

BodyPart.prototype.animate = function(gameData, animation, fps, runToEnd) {
    if (!this.animInstance) {
        this.animInstance = {};
        this.animInstance.animation = gameData.animationManager.animations[animation];
        this.sprite.sprite.texture = this.animInstance.animation.texture.clone();
    }
    this.animInstance.mspf = 1000.0 / fps;
    if (!this.animInstance.lastFrame || !this.animInstance.animating)
        this.animInstance.lastFrame = new Date();
    if (!this.animInstance.currentFrame)
        this.animInstance.currentFrame = 0;
    this.animInstance.runToEnd = runToEnd; //If animation is aborted, finish animation and stop at frame 0
    this.animInstance.finishing = false;
    this.animInstance.animating = true;
}

BodyPart.prototype.finishAnimation = function() {
    this.runToEnd = true;
    this.finishing = true;
}
