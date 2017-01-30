var Map2D = function() {
    this.map = {};
}
module.exports = Map2D;

Map2D.prototype.get = function(x, y) {
    return this.map[x + "|" + y];
}

Map2D.prototype.set = function(x, y, value) {
    this.map[x + "|" + y] = value;
}
