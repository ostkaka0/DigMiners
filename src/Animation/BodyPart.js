
BodyPart = function(sprite, offsetX, offsetY, offsetRotation, pivot, children) {
    this.sprite = sprite;
    if(children)
        this.children = children;
    else
        this.children = {};
    if(!this.sprite) {
        this.sprite = {};
        this.sprite.textureName = "";
        this.sprite.sprite = {};
        this.sprite.sprite.fake = true;
        this.sprite.sprite.position = { x: 0, y: 0 };
        this.sprite.sprite.rotation = {};
    }
    this.offset = [offsetX, offsetY, offsetRotation];
    console.log(this.offset);
    this.cycleOffset = [0, 0, 0];
    console.dir(pivot);
    if(pivot && (pivot[0] != 0 || pivot[1] != 0)) {
        this.usePivot = true;
        this.pivot = pivot;
        if(!isServer) {
            this.sprite.sprite.anchor.x = 0;
            this.sprite.sprite.anchor.y = 0;
            this.sprite.sprite.pivot.x = pivot[0];
            this.sprite.sprite.pivot.y = pivot[1];
        }
    } else
        this.pivot = [0, 0];
}

BodyPart.prototype.position = function(x, y, rotation) {
    //Begin by initializing all bodyparts in center with same rotation.
    this.sprite.sprite.position.x = x;
    this.sprite.sprite.position.y = y;
    this.sprite.sprite.rotation = rotation;

    for(var key in this.children) {
        var child = this.children[key];
        child.position(this.sprite.sprite.position.x,
            this.sprite.sprite.position.y,
            this.sprite.sprite.rotation);
    }

    // Run only on root body parts:
    if(!this.isChild) {
        for(var key in this.children) {
            var child = this.children[key];
            child.rotateAroundPoint([0, 0], rotation);
        }
    }
}

BodyPart.prototype.rotate = function(ax, ay, x, y, angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        nx = (cos * (x - ax)) + (sin * (y - ay)) + ax,
        ny = (cos * (y - ay)) - (sin * (x - ax)) + ay;
    return [-nx, ny];
}

BodyPart.prototype.rotateAroundPoint = function(aroundPoint, parentRotation) {
    console.log("rotating around " + aroundPoint + " " + this.sprite.textureName);
    //console.log(aroundPoint);
    console.log(this.cycleOffset);
    var totalOffset = [this.cycleOffset[0] + this.offset[0] + (this.parent ? this.parent.offset[0] : 0), this.cycleOffset[1] + this.offset[1] + (this.parent ? this.parent.offset[1] : 0)];
    var newPos = this.rotate(aroundPoint[0], aroundPoint[1], totalOffset[0], totalOffset[1], parentRotation + this.cycleOffset[2] + this.offset[2]);
    //console.log(newPos);
    console.log("parent offset " + (this.parent ? this.parent.offset : -1));

    this.sprite.sprite.position.x += newPos[0];
    this.sprite.sprite.position.y += newPos[1];
    this.sprite.sprite.rotation = parentRotation + this.cycleOffset[2] + this.offset[2];

    for(var key in this.children) {
        var child = this.children[key];
        //var totalCoords = [aroundPoint[0] + this.offset[0], aroundPoint[1] + this.offset[1]];
        //child.sprite.sprite.pivot = new PIXI.Point(newPos[0], newPos[1]);
        child.rotateAroundPoint([newPos[0], newPos[1]], this.sprite.sprite.rotation);
    }
    console.log("-");
}

BodyPart.prototype.cycle = function(cycle, fps, runToEnd) {
    if(!this.sprite) {
        console.log("Cycle sprite null");
        return;
    }
    if(!this.cycleInstance) {
        this.cycleInstance = {};
        console.log(cycle);
        this.cycleInstance.cycle = animationManager.cycles[cycle];
    }
    this.cycleInstance.mspf = 1000.0 / fps;
    if(!this.cycleInstance.lastFrame || !this.cycleInstance)
        this.cycleInstance.lastFrame = new Date();
    if(!this.cycleInstance.currentFrame)
        this.cycleInstance.currentFrame = 0;
    this.cycleInstance.runToEnd = runToEnd; //If animation is aborted, finish animation and stop at frame 0
    this.cycleInstance.finishing = false;
}