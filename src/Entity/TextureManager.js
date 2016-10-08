TextureManager = function() {
    this.loader = new TextureLoader();
    this.loader.queueTexture("healthbar");
    this.loader.queueTexture("feet", "feetSheet");
    this.loader.queueTexture("tool", "toolSheet");

    this.loader.queueTexture("uglyHat", "hats/uglyHat");
    this.loader.queueTexture("brokenHat", "hats/brokenHat");

    this.loader.queueTexture("RustyShovel", "items/RustyShovel");
    this.loader.queueTexture("CopperShovel", "items/CopperShovel");
    this.loader.queueTexture("IronShovel", "items/IronShovel");
    this.loader.queueTexture("SteelShovel", "items/SteelShovel");
    this.loader.queueTexture("ApatiteShovel", "items/SteelShovel");
    this.loader.queueTexture("LapisLazuliShovel", "items/SteelShovel");
    this.loader.queueTexture("TurquoiseShovel", "items/SteelShovel");
    this.loader.queueTexture("MagnetiteShovel", "items/SteelShovel");
    this.loader.queueTexture("OlivineShovel", "items/SteelShovel");
    this.loader.queueTexture("QuartzShovel", "items/SteelShovel");
    this.loader.queueTexture("EmeraldShovel", "items/SteelShovel");
    this.loader.queueTexture("TopazShovel", "items/SteelShovel");
    this.loader.queueTexture("RubyShovel", "items/SteelShovel");
    this.loader.queueTexture("DiamondShovel", "items/SteelShovel");

    this.loader.queueTexture("Dynamite", "items/Dynamite");
    this.loader.queueTexture("DynamiteSheet", "items/DynamiteSheet");

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
        for(var key in texturesLocal) {
            texturesLocal[key].name = key;

            if(texturesLocal[key].name == "ShovelAtlas") {

            }
        }
        textures = texturesLocal;
        if(onTexturesLoadComplete)
            onTexturesLoadComplete();
    });
}

TextureManager.prototype.getTextures = function(texture, frameWidth, frameHeight, numFrames) {
    var output = [];
    var currentFrames = 0;
    for(var y = 0; y < texture.height / frameHeight; y++) {
        for(var x = 0; x < texture.width / frameWidth; x++) {
            if(currentFrames < numFrames) {
                var rect = new PIXI.Rectangle(x * frameWidth, y * frameHeight, this.frameWidth, this.frameHeight)
                output.push(new PIXI.Texture(texture, rect));
                currentFrames++;
            }
            else {
                console.log("Loaded animation with " + currentFrames + " frames.");
                return;
            }
        }
    }
    return output;
}

TextureManager.prototype.onComplete = function(func) {
    this.onCompleteFunc = func;
}

TextureManager.prototype.onProgress = function(func) {
    this.onProgressFunc = func;
}