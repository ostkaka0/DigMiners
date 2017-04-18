
var GameModeEmpty = function() {

}

GameModeEmpty.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        global.gameData.world.generator.generate(chunk, x, y);
        world.set([x, y], chunk);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(global.gameData.world.tileWorld, x, y);
        }
    }
}

GameModeEmpty.prototype.name = "Empty";
