
TextureManager = function() {
    this.loader = new TextureLoader();
    var loader = this.loader;

    gameData.world.events.trigger("texturesBeginLoading");
    console.log("Loading textures...");

    loader.queue("healthbar.png");
    loader.queue("feet.png");
    loader.queue("tool.png");
    loader.queue("body.png");
    loader.queue("head.png");
    loader.queue("rightArm.png");
    loader.queue("leftArm.png");

    loader.queue("monster/feet.png");
    loader.queue("monster/head.png");
    loader.queue("monster/rightArm.png");
    loader.queue("monster/leftArm.png");

    loader.queue("shovelAtlas.png");
    loader.queue("swordAtlas.png");
    loader.queue("gunAtlas.png");
    loader.queue("itemAtlas.png");
    loader.queue("hatAtlas.png");
    loader.queue("blockAtlas.png");

    loader.queue("blockPosGood.png");
    loader.queue("blockPosBad.png");

    loader.queue("egg.png");
    loader.queue("bigEgg.png");

    loader.queue("particles/smokeParticle.png");
    loader.queue("particles/particle.png");

    subscribeEvent(TextureLoaderEvents.onProgress, this, function(file, progress) {
        console.log(progress + "% complete");
    }.bind(this));

    subscribeEvent(TextureLoaderEvents.onComplete, this, function(textures) {
        console.log("Textures loaded.");

        for (var name in Items) {
            var itemType = Items[name];
            if (!itemType.texture.dimX)
                textures[itemType.name] = textures[itemType.texture.path];
            else {
                var offsetWidth = (itemType.texture.offsetWidth ? itemType.texture.offsetWidth : 0);
                var offsetHeight = (itemType.texture.offsetHeight ? itemType.texture.offsetHeight : 0);
                var rect = new PIXI.Rectangle((itemType.spriteId % itemType.texture.dimX) * (itemType.texture.spriteWidth + offsetWidth),
                    Math.floor(itemType.spriteId / itemType.texture.dimX) * (itemType.texture.spriteHeight + offsetHeight),
                    itemType.texture.spriteWidth,
                    itemType.texture.spriteHeight);
                textures[itemType.name] = new PIXI.Texture(textures[itemType.texture.path], rect);
            }
        }

        gameData.textures = textures;
    }.bind(this));

    this.loader.loadTextures();
}