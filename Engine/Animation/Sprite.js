// TODO: Rename "Sprite" to "SpriteAnimation" or "textureAnimation" or "spriteBoundary" or ...
// TODO: Create real Sprite-class: texture + source-rect + matrix

class Sprite {
    constructor(image, animation = null, animationId = 0, transform = [0., 0., 1., 1., 0.,], mat = Mat3.create()) {
        this.image = image;
        this.animation = animation;
        this.animationId = animationId;
        this.transform = transform;
        this.mat = mat;
    }

    getAnimationRectSize() {
        return this.animation ? [this.animation.rect[2], this.animation.rect[3]] : [this.image.width, this.image.height];
    }

    getSrcRect() {
        return this.animation ? this.animation.getRect(this.animationId) : [0, 0, this.image.width, this.image.height];
    }

    updateMat(mat) {
        Mat3.clear(this.mat);
        Mat3.fromTransform(this.transform, this.mat);
        Mat3.mul(mat, this.mat, this.mat);
    }

    draw(context) {
        Mat3.apply(context, this.mat);
        var srcRect = this.getSrcRect();
        context.drawImage(this.image, srcRect[0], srcRect[1], srcRect[2], srcRect[3], -srcRect[2]/2, -srcRect[3]/2, srcRect[2], srcRect[3]);
    }

    isVisible(width, height) {
        if (this.image == null) return false;
        var size = this.getAnimationRectSize();
        var a = [-0.5 * size[0], -0.5 * size[1]];
        var b = [0.5 * size[0], -0.5 * size[1]];
        var c = [-0.5 * size[0], 0.5 * size[1]];
        var d = [0.5 * size[0], 0.5 * size[1]];
        Mat3.mulV2(a, this.mat);
        Mat3.mulV2(b, this.mat);
        Mat3.mulV2(c, this.mat);
        Mat3.mulV2(d, this.mat);
        var minX = Math.min(Math.min(a[0], b[0]), Math.min(c[0], d[0]));
        var maxX = Math.max(Math.max(a[0], b[0]), Math.max(c[0], d[0]));
        var minY = Math.min(Math.min(a[1], b[1]), Math.min(c[1], d[1]));
        var maxY = Math.max(Math.max(a[1], b[1]), Math.max(c[1], d[1]));
        return (maxX < 0 || maxY < 0 || minX > width || minY > height);
    }
}

/*class Sprite {
    constructor(image, rect = [0, 0, image.width, image.height], animationColumns = 1) {
        this.image = image;
        this.texture = image; // TODO: this.image = this.texture, only keep one
        this.rect = rect;
        this.animationColumns = animationColumns;
    }

    getRect(animationId = 0) {
        return [
            this.rect[0] + (animationId % this.animationColumns) * this.rect[2],
            this.rect[1] + (animationId / this.animationColumns >> 0) * this.rect[3],
            this.rect[2],
            this.rect[3]];
    }
}*/

/* var Sprite = function(textureName) {
    if (textureName) {
        this.textureName = textureName;
        this.visible = true;
    } else {
        this.textureName = "";
        this.visible = false;
    }
    if (!isServer)
        this.texture = Client.textures[this.textureName];
    this.frame = null;

    this.pos = [0, 0];
    this.angle = 0;
    this.scale = [1.0, 1.0];
    this.pivot = [0, 0];
    this.anchor = [0.5, 0.5];
    this.alpha = 1.0;
}
global.Sprite = Sprite;

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

Sprite.prototype.draw = function(context) {
    this.begin(context);
    context.drawImage(
        this.texture.baseImage,
        (this.frame ? this.frame[0] : this.texture.x),
        (this.frame ? this.frame[1] : this.texture.y),
        (this.frame ? this.frame[2] : this.texture.width),
        (this.frame ? this.frame[3] : this.texture.height),
        0,
        0,
        (this.frame ? this.frame[2] : this.texture.width),
        (this.frame ? this.frame[3] : this.texture.height));
    this.end(context);
}

Sprite.prototype.end = function(context) {
    context.globalAlpha = 1.0;
    context.setTransform(1, 0, 0, 1, 0, 0);
}*/
