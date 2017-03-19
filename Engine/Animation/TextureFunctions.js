
global.loadTexture = function(path, callback) {
    var texture = new Image();
    texture.addEventListener("load", callback, false);
    texture.src = "data/textures/block.png"
    return texture;
}

global.loadTextures = function(parentFolder, paths, finishCallback, callback) {
    var textures = {};
    var numPathsToLoad = paths.length;

    paths.forEach(function(path) {
        var texture = new Image();
        texture.addEventListener("load", function() {
            numPathsToLoad--;
            if (callback)
                callback(Math.floor((paths.length - numPathsToLoad) / paths.length * 100.0), texture.name);
            if (numPathsToLoad == 0 && finishCallback)
                finishCallback(textures);
        }, false);
        texture.src = parentFolder + "/" + path;
        texture.name = path;
        textures[path] = texture;
    });
    return textures;
}
