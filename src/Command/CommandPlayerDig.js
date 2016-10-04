
CommandPlayerDig = function(playerId, x, y, dir, radius) {
    this.playerId = playerId;
    this.x = toFix(x);
    this.y = toFix(y);
    this.dir = dir;
    this.radius = toFix(radius);
}

CommandPlayerDig.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    var entity = gameData.entityWorld.objects[player.entityId];
    if(!entity || !entity.movement) return;
    entity.movement.digTickTimeout = entity.movement.calcDigTickDuration(gameData.tickDuration);

    var tileWorld = gameData.tileWorld;
    var targetTile = gameData.tileRegister[getTileId(gameData.tileWorld, this.x + 1.0 * this.dir[0], this.y + 1.0 * this.dir[1])];
    var targetDensity = getDensity(gameData.tileWorld, this.x + 1.0 * this.dir[0], this.y + 1.0 * this.dir[1]);
    var onDensityChange = null;
    if(targetTile.isOre && targetDensity > 0) {
        entity.movement.isMining = true;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) {
            if(tile.isOre) {
                var densityChange = (oldDensity - newDensity) / 2 >> 0;
                var newDensity2 = oldDensity - densityChange;
                if(newDensity2 < 128)
                    return 0;
                else return newDensity2;
            }
            else return oldDensity;

        };// || tile.id == targetTile.id; };
        var entityId = gameData.playerWorld.objects[this.playerId].entityId;
        var speedRef = gameData.entityWorld.objects[entityId].physicsBody.speed;
        v2.mul(0.5, speedRef, speedRef);
    } else {

        entity.movement.isDigging = true;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) { return (tile.isOre) ? oldDensity : newDensity; };
    }

    var dug = carveCircle(gameData, this.x + 0.7 * this.dir[0], this.y + 0.7 * this.dir[1], this.radius, player.getDigStrength(), onDensityChange);
    if(!isServer) {
        var entity = gameData.entityWorld.objects[player.entityId];
        if(entity.drawable) {
            // bodypart, gameData, cycle name, fps, runToEnd
            entity.drawable.bodyparts["rightArm"].cycle(gameData, "rightArm", 256, true);
        }
        return;
    }
    for(var i = 0; i < dug.length; ++i) {
        if(!dug[i] || dug[i] <= 0) continue;
        //console.log(this.playerId + " dug " + dug[i] + " " + i);
        var tileName = gameData.tileRegister[i].name;
        var itemId = i;//gameData.itemRegister.getIdByName(tileName);
        var message = new MessagePlayerInventory(this.playerId, InventoryActions.ADD_ORE, itemId, dug[i]);
        message.execute(gameData);
        message.send(player.socket);
        var rand = Math.random() * 1000;
        var itemId = null;
        if(rand > 900)
            itemId = Item.BrokenHat.id;
        else if(rand > 800)
            itemId = Item.UglyHat.id;
        if(itemId) {
            var entity = gameData.entityWorld.objects[player.entityId];
            var physicsBody = entity.physicsBody;
            message = new MessageItemDrop(idList.next(), itemId, 1, physicsBody.pos[0], physicsBody.pos[1], 0, 0, physicsBody.angle);
            message.execute(gameData);
            message.send(io.sockets);
        }
    }
}

CommandPlayerDig.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
    serializeV2(byteArray, index, this.dir);
    serializeFix(byteArray, index, this.radius);
}

CommandPlayerDig.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
    this.dir = deserializeV2(byteArray, index);
    this.radius = deserializeFix(byteArray, index);
}

CommandPlayerDig.prototype.getSerializationSize = function() {
    return 24;
}
