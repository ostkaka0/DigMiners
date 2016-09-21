Map2D = function(defaultValue) {
    this.map = {};
}

Map2D.prototype.get = function(x, y, value) {
    return this.map[x + "|" + y];
}

Map2D.prototype.set = function(x, y, value) {
    this.map[x + "|" + y] = value;
}
