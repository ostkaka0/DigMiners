
Sprite = function(textureName) {
    this.textureName = (textureName ? textureName : "");
    if (!isServer)
        this.texture = gameData.textures[this.textureName];
    this.frame = null;
    this.visible = true;

    this.pos = [0, 0];
    this.angle = 0;
    this.scale = [1.0, 1.0];
    this.pivot = [0, 0];
    this.anchor = [0.5, 0.5];
    this.alpha = 1.0;
}

Sprite.prototype.getSize = function() {
    if (this.frame)
        return [this.frame[2], this.frame[3]];
    return [this.texture.width, this.texture.height];
}

Sprite.prototype.begin = function(context) {
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(this.angle);
    context.scale(this.scale[0], this.scale[1]);
    context.translate(-this.anchor[0] * this.getSize()[0], -this.anchor[1] * this.getSize()[1]);
    context.translate(-this.pivot[0], -this.pivot[1]);
    context.globalAlpha = this.alpha;
}

Sprite.prototype.end = function(context) {
    context.globalAlpha = 0.0;
    context.translate(this.pivot[0], this.pivot[1]);
    context.translate(this.anchor[0] * this.getSize()[0], this.anchor[1] * this.getSize()[1]);
    context.scale(1.0 / this.scale[0], 1.0 / this.scale[1]);
    context.rotate(-this.angle);
    context.translate(-this.pos[0], -this.pos[1]);
}