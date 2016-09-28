TextureManager = function() {
    this.loader = new TextureLoader();
    this.loader.queueTexture("gubbe");
    this.loader.queueTexture("healthbar");
    this.loader.queueTexture("feet", "feetSheet");
    this.loader.queueTexture("dig", "digSheet");
    this.loader.queueTexture("hats/uglyHat");
    this.loader.queueTexture("hats/brokenHat");
    this.loader.queueTexture("items/dirt");
    this.loader.queueTexture("items/stone");
    this.loader.queueTexture("items/hardStone");
    this.loader.queueTexture("items/veryHardStone");
    this.loader.queueTexture("items/blueOre");
    this.loader.queueTexture("items/redOre");

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