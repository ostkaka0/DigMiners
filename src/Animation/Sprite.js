
Sprite = function(textureName, sprite, noAnchor) {
    this.textureName = textureName;
    this.noAnchor = noAnchor;
    if(!isServer) {
        this.sprite = (textureName ? new PIXI.Sprite(textures[textureName]) : sprite);
        if(!noAnchor) {
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;
        }
    }
}