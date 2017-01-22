
Sprite = function(textureName) {
    try {
        if (typeof textureName != "string")
            throw "textureName is not string";
    } catch (e) {
        console.error(e.stack);
    }
    this.textureName = (textureName ? textureName : "");
    if (!isServer)
        this.texture = gameData.textures[this.textureName];
    this.transform = new DrawTransform();
    this.frame = null;
    this.visible = true;
}

Object.defineProperties(Sprite.prototype, {
    pos: {
        get: function() {
            return this.transform.pos;
        },
        set: function(value) {
            this.transform.pos = value;
        }
    },
    angle: {
        get: function() {
            return this.transform.angle;
        },
        set: function(value) {
            this.transform.angle = value;
        }
    },
    scale: {
        get: function() {
            return this.transform.scale;
        },
        set: function(value) {
            this.transform.scale = value;
        }
    },
    pivot: {
        get: function() {
            return this.transform.pivot;
        },
        set: function(value) {
            this.transform.pivot = value;
        }
    },
});