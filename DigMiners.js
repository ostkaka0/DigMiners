console.log("DigMiners.js!");

var pos = v2.create(0, 0);
v2.add(pos, v2.create(10, 2), pos);
v2.div(pos, 3, pos);

console.log(pos[0]);

var world = new Map2D();
world.set(13, 37, new Chunk());
var chunk = world.get(13, 37);
console.log(chunk.getTileId(4, 4));
