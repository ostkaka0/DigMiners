
BodyPart = function(sprite, offsetX, offsetY, offsetRotation, children) {
    this.sprite = sprite;
    this.offset = [offsetX, offsetY, offsetRotation];
    this.cycleOffset = [0, 0, 0]
    this.children = children;
}

BodyPart.prototype.position = function(x, y, rotation) {
    //TODO: fix children
    /*for(var i = 0; i < this.children.length; ++i) {
        this.children[i].position(this.offset[0] + this.cycleOffset[0] + x,
            this.offset[1] + this.cycleOffset[1] + y,
            this.offset[2] + this.cycleOffset[2] + rotation);
    }*/

    var totalOffset = [this.offset[0] + this.cycleOffset[0], this.offset[1] + this.cycleOffset[1]];

    // Code to rotate displaced textures around centre of player
    var cs = Math.cos(rotation);
    var sn = Math.sin(rotation);

    var newX = totalOffset[0] * cs - totalOffset[1] * sn;
    var newY = totalOffset[0] * sn + totalOffset[1] * cs;

    this.sprite.position.x = newX + x;
    this.sprite.position.y = newY + y;
    this.sprite.rotation = this.offset[2] + this.cycleOffset[2] + rotation;
}