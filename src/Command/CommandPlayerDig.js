
CommandPlayerDig = function(playerId, x, y, radius) {
    this.playerId = playerId;
    this.x = toFix(x);
    this.y = toFix(y);
    this.radius = toFix(radius);
}

CommandPlayerDig.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    var tileWorld = gameData.tileWorld;
    var dug = carveCircle(gameData, this.x, this.y, this.radius, player.getDigStrength());
    if(!isServer) return;
    for(var i = 0; i < dug.length; ++i) {
        if(!dug[i] || dug[i] <= 0) continue;
        //console.log(this.playerId + " dug " + i + ": " + dug[i]);
        var tileName = gameData.tileRegister[i].name;
        var itemId = i;//gameData.itemRegister.getIdByName(tileName);
        var message = new MessagePlayerInventory(this.playerId, InventoryActions.ADD_ORE, itemId, dug[i]);
        message.execute(gameData);
        message.send(player.socket);
        var rand = Math.random() * 1000;
        var itemId = null;
        if(rand > 995)
            itemId = Item.BrokenHat
        else if(rand > 990)
            itemId = Item.UglyHat
        if(itemId) {
            var entity = gameData.entityWorld.objects[player.entityId];
            var physicsBody = entity.physicsBody;
            message = new MessageItemDrop(idList.next(), itemId, 1, physicsBody.pos[0], physicsBody.pos[1], physicsBody.angle);
            message.execute(gameData);
            message.send(io.sockets);
        }
    }
}

CommandPlayerDig.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
    serializeFix(byteArray, index, this.radius);
}

CommandPlayerDig.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
    this.radius = deserializeFix(byteArray, index);
}

CommandPlayerDig.prototype.getSerializationSize = function() {
    return 16;
}
