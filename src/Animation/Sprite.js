
Sprite = function(textureName, sprite, noAnchor) {
    this.textureName = (textureName ? textureName : "");
    this.noAnchor = noAnchor;
    if(!isServer) {
        this.setPIXISprite((textureName && textureName.length > 0 ? new PIXI.Sprite(textures[textureName]) : sprite));
    }
}

Sprite.prototype.setPIXISprite = function(sprite) {
    if(!sprite) {
        this.sprite = new PIXI.Sprite();
    } else {
        this.sprite = sprite;
        if(!this.noAnchor && this.sprite) {
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;
        }
    }
}