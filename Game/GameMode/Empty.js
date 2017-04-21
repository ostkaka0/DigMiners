
var GameModeEmpty = function() {

}

GameModeEmpty.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(x, y) {
        var chunk = new Chunk();
        World.generator.generate(chunk, x, y);
        World.tiles.set([x, y], chunk);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(x, y);
        }
    }
}

GameModeEmpty.prototype.name = "Empty";
