
BodyPart = function(sprite, offsetX, offsetY, offsetRotation, children) {
    this.sprite = sprite;
    this.offset = [offsetX, offsetY, offsetRotation];
    this.cycleOffset = [0, 0, 0]
    this.children = children;
    //this.sprite.pivot.x = this.offset[0];
    //this.sprite.pivot.y = this.offset[1];
}

BodyPart.prototype.position = function(x, y, rotation) {
    /*for(var i = 0; i < this.children.length; ++i) {
        this.children[i].position(this.offset[0] + this.cycleOffset[0] + x,
            this.offset[1] + this.cycleOffset[1] + y,
            this.offset[2] + this.cycleOffset[2] + rotation);
    }*/

    //this.sprite.position.x = this.offset[0] + this.cycleOffset[0] + x;
    //this.sprite.position.y = this.offset[1] + this.cycleOffset[1] + y;

    var totalOffset = [this.offset[0] + this.cycleOffset[0], this.offset[1] + this.cycleOffset[1]];

    var cs = Math.cos(rotation);
    var sn = Math.sin(rotation);

    var newX = totalOffset[0] * cs - totalOffset[1] * sn;
    var newY = totalOffset[0] * sn + totalOffset[1] * cs;

    this.sprite.position.x = newX + x;
    this.sprite.position.y = newY + y;
    this.sprite.rotation = this.offset[2] + this.cycleOffset[2] + rotation;
}

BodyPart.prototype.setCycleOffset = function(x, y, rotation) {
    this.cycleOffset = [x, y, rotation];
}