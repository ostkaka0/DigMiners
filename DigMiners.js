var world = new Map2D();
world.set(13, 37, new Chunk());
var chunk = world.get(13, 37);
console.log(chunk.getTileId(4, 4));

var generator = new Generator(1337);

var loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}
