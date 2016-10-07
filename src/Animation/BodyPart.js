
BodyPart = function(sprite, offsetX, offsetY, offsetRotation, pivot, children) {
    this.sprite = sprite;
    if(children)
        this.children = children;
    else
        this.children = {};
    this.offset = [offsetX, offsetY, offsetRotation];
    this.cycleOffset = [0, 0, 0];
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
    var rotatedOffset = this.rotate(0, 0, this.offset[0] + (this.parent ? this.parent.offset[0] : 0), this.offset[1] + (this.parent ? this.parent.offset[1] : 0), rotation);

    this.sprite.sprite.position.x = x + rotatedOffset[0];
    this.sprite.sprite.position.y = y + rotatedOffset[1];
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
            var totalOffset = [child.cycleOffset[0], child.cycleOffset[1]];
            var newPos = child.rotate(0, 0, totalOffset[0], totalOffset[1], rotation + child.cycleOffset[2] + child.offset[2]);
            if(totalOffset[0] == 0 && totalOffset[1] == 0)
                newPos = [0, 0];

            child.sprite.sprite.position.x += newPos[0];
            child.sprite.sprite.position.y += newPos[1];
            child.sprite.sprite.rotation = rotation + child.cycleOffset[2] + child.offset[2];

            for(var key in child.children) {
                var child2 = child.children[key];
                child2.rotateAroundPoint(x, y, rotation, child.sprite.sprite.rotation);
            }
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

BodyPart.prototype.rotateAroundPoint = function(x, y, rotation, parentRotation) {
    var rotatedParent = this.rotate(0, 0, this.parent.offset[0], this.parent.offset[1], rotation);
    var rotatedOffset = this.rotate(0, 0, this.offset[0], this.offset[1], parentRotation + this.cycleOffset[2] + this.offset[2]);

    this.sprite.sprite.position.x = x + rotatedParent[0] + rotatedOffset[0];
    this.sprite.sprite.position.y = y + rotatedParent[1] + rotatedOffset[1];
    this.sprite.sprite.rotation = parentRotation + this.cycleOffset[2] + this.offset[2];
}

BodyPart.prototype.cycle = function(gameData, cycle, fps, runToEnd) {
    if(!this.sprite) {
        console.log("Cycle sprite null");
        return;
    }
    if(!this.cycleInstance) {
        this.cycleInstance = {};
        //console.log(cycle);
        this.cycleInstance.cycle = gameData.animationManager.cycles[cycle];
    }
    this.cycleInstance.mspf = 1000.0 / fps;
    if(!this.cycleInstance.lastFrame || !this.cycleInstance)
        this.cycleInstance.lastFrame = new Date();
    if(!this.cycleInstance.currentFrame)
        this.cycleInstance.currentFrame = 0;
    this.cycleInstance.runToEnd = runToEnd; //If animation is aborted, finish animation and stop at frame 0
    this.cycleInstance.finishing = false;
}

BodyPart.prototype.finishCycle = function() {
    if(this.cycleInstance) {
        this.cycleInstance.runToEnd = true;
        this.cycleInstance.finishing = false;
    }
}