
loadTexture = function(path, callback) {
    var texture = new Image();
    texture.addEventListener("load", callback, false);
    texture.src = "data/textures/block.png" 
    return texture;
}

loadTextures = function(parentFolder, paths, callback) {
    var textures = {};
    var numPathsToLoad = paths.length;
    
    paths.forEach(function(path) {
        var texture = new Image();
        texture.addEventListener("load", function() {
            numPathsToLoad--;
            if (numPathsToLoad == 0)
                callback(textures);
        }, false);
        texture.src = parentFolder + "/" + path;
        textures[path] = texture;
    });
    return textures;
}
