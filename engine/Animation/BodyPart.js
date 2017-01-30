
var BodyPart = function(sprite, offsetX, offsetY, offsetRotation, pivot, parent, disableRotation) {
    this.sprite = sprite;
    this.offset = [offsetX, offsetY, offsetRotation];
    this.defaultOffset = [offsetX, offsetY, offsetRotation];
    this.cycleOffset = [0, 0, 0];
    if (pivot && (pivot[0] != 0 || pivot[1] != 0)) {
        this.pivot = pivot;
        this.sprite.anchor[0] = 0;
        this.sprite.anchor[1] = 0;
        this.sprite.pivot = pivot;
    } else
        this.pivot = [0, 0];
    this.parent = parent;
    this.children = [];
    this.animInstance = null;
    this.disableRotation = (disableRotation ? true : false);
}
module.exports = BodyPart;

BodyPart.prototype.position = function(x, y, angle) {
    this.sprite.pos[0] = x + this.offset[0];
    this.sprite.pos[1] = y + this.offset[1];
    if (!this.disableRotation)
        this.sprite.angle = angle + this.offset[2];
    this.children.forEach(function(child) {
        BodyPart.positionChild(child, this);
    }.bind(this));
}

BodyPart.positionChild = function(child, parent) {
    child.sprite.pos[0] = parent.sprite.pos[0];
    child.sprite.pos[1] = parent.sprite.pos[1];
    var angle = parent.sprite.angle + child.cycleOffset[2] + child.offset[2];
    var rotatedOffset = BodyPart.rotate(0, 0, child.cycleOffset[0], child.cycleOffset[1], angle);
    var derivedOffset = BodyPart.rotate(0, 0, child.offset[0], child.offset[1], parent.sprite.angle);
    child.sprite.pos[0] += rotatedOffset[0] + derivedOffset[0];
    child.sprite.pos[1] += rotatedOffset[1] + derivedOffset[1];
    child.sprite.angle = angle;
    child.finalPos = [child.sprite.pos[0], child.sprite.pos[1]];
    child.finalAngle = child.sprite.angle;
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
        this.sprite.frame = this.animInstance.animation.frames[0];
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
