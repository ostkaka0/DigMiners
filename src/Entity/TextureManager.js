TextureManager = function() {
    this.loader = new TextureLoader();
    this.loader.queueTexture("healthbar");
    this.loader.queueTexture("feet", "feetSheet");
    //this.loader.queueTexture("dig", "digSheet");
    this.loader.queueTexture("tool", "toolSheet");
    this.loader.queueTexture("uglyHat", "hats/uglyHat");
    this.loader.queueTexture("brokenHat", "hats/brokenHat");
    this.loader.queueTexture("dirt", "items/dirt");
    this.loader.queueTexture("stone", "items/stone");
    this.loader.queueTexture("hardStone", "items/hardStone");
    this.loader.queueTexture("veryHardStone", "items/veryHardStone");
    this.loader.queueTexture("blueOre", "items/blueOre");
    this.loader.queueTexture("redOre", "items/redOre");
    this.loader.queueTexture("shovel", "items/shovel");
    this.loader.queueTexture("body", "body");
    this.loader.queueTexture("head", "head");
    this.loader.queueTexture("rightArm", "rightArm");
    this.loader.queueTexture("leftArm", "leftArm");

    console.log("Loading textures...");
    this.loader.loadTextures();

    this.loader.onProgress(function(name, file, progress) {
        console.log(progress + "% complete");
        if(onTexturesLoadProgress)
            onTexturesLoadProgress(name, file, progress);
    });

    this.loader.onComplete(function(texturesLocal) {
        console.log("Textures loaded.");
        textures = texturesLocal;
        if(onTexturesLoadComplete)
            onTexturesLoadComplete();
    });
}

TextureManager.prototype.onComplete = function(func) {
    this.onCompleteFunc = func;
}

TextureManager.prototype.onProgress = function(func) {
    this.onProgressFunc = func;
}