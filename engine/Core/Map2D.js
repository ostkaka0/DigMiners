Map2D = function() {
    this.map = {};
}
export default Map2D;

Map2D.prototype.get = function(x, y) {
    return this.map[x + "|" + y];
}

Map2D.prototype.set = function(x, y, value) {
    this.map[x + "|" + y] = value;
}
