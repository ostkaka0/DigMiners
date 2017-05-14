
class BodyPart {
    constructor(sprite, mat = Mat3.create()) {
        this.sprite = sprite;
        this.mat = mat;//this.transform = transform;
        this.children = [];
        // Animation
        this.animation = null; // Current animation
        this.animationTransform = [0, 0, 1, 1, 0]; // [x, y, scaleX, scaleY, angle] //this.matAnimation = Mat3.create(); // Interpolated animation transform
        this.prevAnimationTransform = null;
        this.nextAnimationTransform = null;
        this.animationIndex = 0;
        this.animationTime = 0.0; // Interpolation time between frames, value between 0-1
        this.animationSpeed = 0.0; // Animation frames per second
    }

    setAnimation(animation, animationSpeed) {
        this.animation = animation;
        this.animationSpeed = animationSpeed || this.animationSpeed;
        this.animationIndex = 0;
        this.animationTime = 0.0;
        this.prevAnimationTransform = this.animationTransform || [0, 0, 1, 1, 0];
        this.nextAnimationTransform = this.animation ? this.animation[0] : [0, 0, 1, 1, 0];
        this.animationTransform = [0, 0, 1, 1, 0];
    }

    updateAnimationTransform(dt) {
        if (!this.nextAnimationTransform || !this.prevAnimationTransform) return;
        this.animationTime += dt * this.animationSpeed;
        while(this.animationTime > 1.0) {
            this.animationTime -= 1.0;
            this.animationId++;
            if (!this.animation || this.animationId > this.animation.length) {
                this.animation = null;
                this.animationTransform = null;
                this.prevAnimationTransform = null;
                this.nextAnimationTransform = null;
                return;
            }
            this.prevAnimationTransform = this.nextAnimationTransform;
            this.nextAnimationTransform = (this.animationId < this.animation.length) ? this.animation[this.animationId] : [0, 0, 1, 1, 0];
        }
        // Interpolate animation
        var a = 1.0 - this.animationTime;
        var b = this.animationTime;
        this.animationTransform[0] = a * this.prevAnimationTransform[0] + b * this.nextAnimationTransform[0];
        this.animationTransform[1] = a * this.prevAnimationTransform[1] + b * this.nextAnimationTransform[1];
        this.animationTransform[2] = a * this.prevAnimationTransform[2] + b * this.nextAnimationTransform[2];
        this.animationTransform[3] = a * this.prevAnimationTransform[3] + b * this.nextAnimationTransform[3];
        this.animationTransform[4] = a * this.prevAnimationTransform[4] + b * this.nextAnimationTransform[4];
    }

    draw(spriteArray, dt, matIn) {
        var matDraw = Mat3.create();
        Mat3.mul(matIn, this.mat, matDraw);
        Mat3.mul(matDraw, Mat3.fromTransform(this.animationTransform), matDraw);

        for (var i = 0; i < this.children.length; i++)
            this.children[i].draw(spriteArray, dt, matDraw);
        if (this.sprite) {
            this.sprite.updateMat(matDraw);
            if (this.sprite.isVisible(Client.canvas.width, Client.canvas.height))
                spriteArray.push(this.sprite);
        }
    }
}

var bodyPartsSetAnimation = function(bodyParts, animation, animationSpeed) {
    Object.keys(animation).forEach((key) => {
        bodyParts[key].setAnimation(animation[key], animationSpeed);
    });
}

/*
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
global.BodyPart = BodyPart;

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

BodyPart.prototype.cycle = function(cycle, fps, runToEnd) {
    if (!this.cycleInstance)
        this.cycleInstance = {};
    this.cycleInstance.cycle = WorldRenderer.animationManager.cycles[cycle];
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

BodyPart.prototype.animate = function(animation, fps, runToEnd) {
    if (!this.animInstance) {
        this.animInstance = {};
        this.animInstance.animation = WorldRenderer.animationManager.animations[animation];
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
} */
