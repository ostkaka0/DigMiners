
CommandPlayerDig = function(playerId, x, y, dir, radius, digSpeed, maxDigHardness) {
    this.playerId = playerId;
    this.x = toFix(x);
    this.y = toFix(y);
    this.dir = dir;
    this.radius = toFix(radius);
    this.digSpeed = digSpeed;
    this.maxDigHardness = maxDigHardness;
}

CommandPlayerDig.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    var entity = gameData.entityWorld.objects[player.entityId];
    if(!entity || !entity.movement) return;

    var tileWorld = gameData.tileWorld;
    var targetTile = gameData.tileRegister[getTileId(gameData.tileWorld, this.x + 1.0 * this.dir[0], this.y + 1.0 * this.dir[1])];
    var targetDensity = getDensity(gameData.tileWorld, this.x + 1.0 * this.dir[0], this.y + 1.0 * this.dir[1]);
    var onDensityChange = null;
    var digDis = 1.5;

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

    var dug = carveCircle(gameData, this.x + digDis * this.dir[0], this.y + digDis * this.dir[1], this.radius, this.digSpeed, this.maxDigHardness, onDensityChange);
    if(isServer) {
        // Only process dug ores on server
        for(var i = 0; i < dug.length; ++i) {
            if(!dug[i] || dug[i] <= 0) continue;
            //console.log(this.playerId + " dug " + dug[i] + " " + i);
            var tileName = gameData.tileRegister[i].name;
            var itemId = i;//gameData.itemRegister.getIdByName(tileName);
            var message = new MessagePlayerInventory(this.playerId, InventoryActions.ADD_ORE, itemId, dug[i]);
            message.execute(gameData);
            message.send(player.socket);
            if(tileName == Tiles.Dirt.name) {
                var rand = Math.random() * 1000;
                var itemId = null;
                if(rand > 990)
                    itemId = Items.RottenRoot.id;
                if(itemId != null) {
                    var entity = gameData.entityWorld.objects[player.entityId];
                    var physicsBody = entity.physicsBody;

                    var itemEntityId = idList.next();
                    var itemEntity = entityTemplates.item(itemId, 1, gameData);
                    itemEntity.physicsBody.pos = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
                    itemEntity.physicsBody.posOld = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
                    itemEntity.physicsBody.angle = physicsBody.angle;
                    itemEntity.physicsBody.angleOld = physicsBody.angle;
                    gameData.commands.push(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));
                }
            }
        }
    }
}

CommandPlayerDig.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
    serializeV2(byteArray, index, this.dir);
    serializeFix(byteArray, index, this.radius);
    serializeFix(byteArray, index, this.digSpeed);
    serializeFix(byteArray, index, this.maxDigHardness);
}

CommandPlayerDig.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
    this.dir = deserializeV2(byteArray, index);
    this.radius = deserializeFix(byteArray, index);
    this.digSpeed = deserializeFix(byteArray, index);
    this.maxDigHardness = deserializeFix(byteArray, index);
}

CommandPlayerDig.prototype.getSerializationSize = function() {
    return 32;
}
