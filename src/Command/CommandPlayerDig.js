
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
    if(isServer) {
        for(var i = 0; i < dug.length; ++i) {
            if(dug[i] != undefined && dug[i] > 0) {
                //console.log(this.playerId + " dug " + i + ": " + dug[i]);
                var tileName = gameData.tileRegister.getById(i).name;
                var itemId = gameData.itemRegister.getIdByName(tileName);
                /*var message = new MessagePlayerInventory(this.playerId, 0, itemId, dug[i]);
                message.execute(gameData);
                message.send(player.socket);*/

                var entity = gameData.entityWorld.objects[player.entityId];
                var physicsBody = entity.physicsBody;
                message = new MessageItemDrop(idList.next(), itemId, dug[i], physicsBody.pos[0], physicsBody.pos[1], physicsBody.angle);
                message.execute(gameData);
                message.send(player.socket);
            }
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
