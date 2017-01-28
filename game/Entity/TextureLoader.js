import Event from "engine/Core/Event.js"

export var TextureLoaderEvents = {};
TextureLoaderEvents.onComplete = [];
TextureLoaderEvents.onProgress = [];

export var TextureLoader = function() {
    this.texturesToLoad = [];
    this.total = 0;
    this.current = 0;
}
export default TextureLoader

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
