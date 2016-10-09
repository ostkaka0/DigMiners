
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
    var digDis = 1.5; // Distance to dig
    if(targetTile.isOre && targetDensity > 0) {
        entity.movement.isMining = true;
        digDis = 1.0;
        this.radius = 1.0;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) {
            if(tile.isOre) {
                var densityChange = (oldDensity - newDensity) / 2 >> 0;
                var newDensity2 = oldDensity - densityChange;
                if(newDensity2 < 128)
                    return 0;
                else return newDensity2;
            }
            else return oldDensity;

        };
        var entityId = gameData.playerWorld.objects[this.playerId].entityId;
        var speedRef = gameData.entityWorld.objects[entityId].physicsBody.speed;
        v2.mul(0.5, speedRef, speedRef);
    } else {

        entity.movement.isDigging = true;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) { return (tile.isOre) ? oldDensity : newDensity; };
    }

    var dug = carveCircle(gameData, this.x + digDis * this.dir[0], this.y + digDis * this.dir[1], this.radius, player.getDigStrength(), onDensityChange);
    if(!isServer) {
        var entity = gameData.entityWorld.objects[player.entityId];
        if(entity.drawable)
            entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArm", 64 / entity.movement.digDuration, false);
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
            itemId = Items.BrokenHat.id;
        else if(rand > 800)
            itemId = Items.UglyHat.id;
        if(itemId) {
            var entity = gameData.entityWorld.objects[player.entityId];
            var physicsBody = entity.physicsBody;

            var itemEntity = entityTemplates.item(idList.next(), itemId, 1, gameData);
            itemEntity.physicsBody.pos = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
            itemEntity.physicsBody.posOld = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
            itemEntity.physicsBody.angle = physicsBody.angle;
            itemEntity.physicsBody.angleOld = physicsBody.angle;
            var message = new MessageEntitySpawn(gameData, itemEntity);
            // Do not execute message, entity is already spawned
            message.send(gameData, io.sockets);
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
