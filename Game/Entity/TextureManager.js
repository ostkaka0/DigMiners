





var TextureManager = function(callback) {
    this.callback = callback;
    this.loader = new TextureLoader();
    var loader = this.loader;

    // TODO: Fix: World.events.trigger("texturesBeginLoading");
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

    loader.queue("turret/bottom.png");

    loader.queue("ghost.png");

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

    loader.queue("dynamite.png");

    loader.queue("tree.png");
    loader.queue("stump.png");
    loader.queue("log.png");

    TextureLoader.Events.onProgress.set(this, function(file, progress) {
        console.log(Math.round(progress) + "% complete");
    }.bind(this));

    TextureLoader.Events.onComplete.set(this, function(textures) {
        console.log("Textures loaded.");

        var texturesOutput = {};

        Object.keys(textures).forEach(function(key) {
            texturesOutput[key] = new Texture(textures[key]);
        });

        for (var name in Items.Types) {
            var itemType = Items.Types[name];
            if (!itemType.texture.dimX)
                texturesOutput[itemType.name] = new Texture(textures[itemType.texture.path]);
            else {
                var offsetWidth = (itemType.texture.offsetWidth ? itemType.texture.offsetWidth : 0);
                var offsetHeight = (itemType.texture.offsetHeight ? itemType.texture.offsetHeight : 0);
                texturesOutput[itemType.name] = new Texture(textures[itemType.texture.path],
                    (itemType.spriteId % itemType.texture.dimX) * (itemType.texture.spriteWidth + offsetWidth),
                    Math.floor(itemType.spriteId / itemType.texture.dimX) * (itemType.texture.spriteHeight + offsetHeight),
                    itemType.texture.spriteWidth,
                    itemType.texture.spriteHeight);
            }
        }
        Object.assign(Client.textures, texturesOutput);
        this.callback();
    }.bind(this), true);

    this.loader.loadTextures();
}
