TileRegister = function() {
    this.tileTypes = [];
    this.mapNameToType = {};
}

TileRegister.prototype.register = function(name, isSolid, isOre, hardness) {
    var id = this.tileTypes.length;
    var tileType = new TileType(id, name, isSolid, isOre, hardness);
    
    if (this.mapNameToType[name]) {
        return;
    }
        
    this.tileTypes.push(tileType);
    this.mapNameToType[name] = tileType;
}

TileRegister.prototype.getById = function(id) {
    return this.tileTypes[id];
}

TileRegister.prototype.getIdByName = function(name) {
    return this.mapNameToType[id];
}
