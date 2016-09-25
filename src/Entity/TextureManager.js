TextureManager = function() {
    this.loader = new TextureLoader();
    this.loader.queueTexture("gubbe");
    this.loader.queueTexture("healthbar");
    /*this.loader.queueTexture("octopus");
    this.loader.queueTexture("cheese");
    this.loader.queueTexture("worker");
    this.loader.queueTexture("ground");
    this.loader.queueTexture("block");
    this.loader.queueTexture("rock");
    this.loader.queueTexture("largerock", "rock_large");*/
    this.loader.queueTexture("feet", "feetSheet");
    this.loader.queueTexture("dig", "digSheet");

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