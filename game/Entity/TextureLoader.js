var Event = require("engine/Core/Event.js")
var loadTextures = require("engine/Animation/TextureFunctions.js")

module.exports.TextureLoaderEvents = {};
module.exports.TextureLoaderEvents.onComplete = [];
module.exports.TextureLoaderEvents.onProgress = [];

var TextureLoader = function() {
    this.texturesToLoad = [];
    this.total = 0;
    this.current = 0;
}
module.exports.TextureLoader = TextureLoader

TextureLoader.prototype.queue = function(texture) {
    this.texturesToLoad[this.total] = texture;
    ++this.total;
}

TextureLoader.prototype.loadTextures = function() {
    var context = this;

    loadTextures("data/textures/", this.texturesToLoad, function(textures) {
        Event.trigger(TextureLoaderEvents.onComplete, textures);
    }, function(percentage, name) {
        Event.trigger(TextureLoaderEvents.onProgress, name, percentage);
    });
}
