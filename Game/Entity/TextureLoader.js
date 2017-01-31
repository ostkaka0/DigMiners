var Event = require("Engine/Core/Event.js")
var loadTextures = require("Engine/Animation/TextureFunctions.js").loadTextures



var TextureLoader = function() {
    this.texturesToLoad = [];
    this.total = 0;
    this.current = 0;
}
module.exports = TextureLoader
TextureLoader.Events = {};
TextureLoader.Events.onComplete = [];
TextureLoader.Events.onProgress = [];

TextureLoader.prototype.queue = function(texture) {
    this.texturesToLoad[this.total] = texture;
    ++this.total;
}

TextureLoader.prototype.loadTextures = function() {
    var context = this;

    loadTextures("data/textures/", this.texturesToLoad, function(textures) {
        Event.trigger(TextureLoader.Events.onComplete, textures);
    }, function(percentage, name) {
        Event.trigger(TextureLoader.Events.onProgress, name, percentage);
    });
}
