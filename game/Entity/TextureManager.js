TextureManager = function(gameData) {
    this.gameData = gameData;
    this.loader = new TextureLoader();
    this.loader.queueTexture("healthbar");
    this.loader.queueTexture("feet", "feetSheet");
    this.loader.queueTexture("tool", "toolSheet");
    this.loader.queueTexture("body", "body");
    this.loader.queueTexture("head", "head");
    this.loader.queueTexture("rightArm", "rightArm");
    this.loader.queueTexture("leftArm", "leftArm");

    this.loader.queueTexture("shovelAtlas.png", "shovelAtlas");
    this.loader.queueTexture("swordAtlas.png", "shovelAtlas");
    this.loader.queueTexture("itemAtlas.png", "itemAtlas");
    this.loader.queueTexture("hatAtlas.png", "hatAtlas");
    this.loader.queueTexture("blockAtlas.png", "blockAtlas");

    this.loader.queueTexture("blockPosGood.png", "blockPosGood");
    this.loader.queueTexture("blockPosBad.png", "blockPosBad");

    console.log("Loading textures...");
    this.loader.loadTextures();

    this.loader.onProgress(function(name, file, progress) {
        console.log(progress + "% complete");
        if(onTexturesLoadProgress)
            onTexturesLoadProgress(name, file, progress);
    });

    this.loader.onComplete(function(texturesLocal) {
        console.log("Textures loaded.");
        for(var key in texturesLocal)
            texturesLocal[key].name = key;

        for(var name in Items) {
            var itemType = Items[name];
            if(!itemType.texture.dimX)
                texturesLocal[itemType.name] = texturesLocal[itemType.texture.path];
            else {
                var offsetWidth = (itemType.texture.offsetWidth ? itemType.texture.offsetWidth : 0);
                var offsetHeight = (itemType.texture.offsetHeight ? itemType.texture.offsetHeight : 0);
                var rect = new PIXI.Rectangle((itemType.spriteId % itemType.texture.dimX) * (itemType.texture.spriteWidth + offsetWidth),
                    Math.floor(itemType.spriteId / itemType.texture.dimX) * (itemType.texture.spriteHeight + offsetHeight),
                    itemType.texture.spriteWidth,
                    itemType.texture.spriteHeight);
                texturesLocal[itemType.name] = new PIXI.Texture(texturesLocal[itemType.texture.path], rect);
            }
        }

        this.gameData.textures = texturesLocal;
        if(onTexturesLoadComplete)
            onTexturesLoadComplete(texturesLocal);
    }.bind(this));
}

TextureManager.prototype.onComplete = function(func) {
    this.onCompleteFunc = func;
}

TextureManager.prototype.onProgress = function(func) {
    this.onProgressFunc = func;
}
