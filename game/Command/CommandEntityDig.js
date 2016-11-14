
CommandEntityDig = function(entityId, x, y, dir, radius, digSpeed, maxDigHardness) {
    this.entityId = entityId;
    this.x = toFix(x);
    this.y = toFix(y);
    this.dir = dir;
    this.radius = toFix(radius);
    this.digSpeed = digSpeed;
    this.maxDigHardness = maxDigHardness;
}

CommandEntityDig.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;

    var tileWorld = gameData.tileWorld;
    var targetTile = gameData.tileRegister[getTileId(gameData.tileWorld, this.x + 1.0 * this.dir[0], this.y + 1.0 * this.dir[1])];
    var targetDensity = getDensity(gameData.tileWorld, this.x + 1.0 * this.dir[0], this.y + 1.0 * this.dir[1]);
    var onDensityChange = null;
    var digDis = 1.5;

    if (targetTile.isOre && targetDensity > 0) {
        entity.movement.isMining = true;
        digDis = 1.0;
        this.radius = 1.0;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) {
            if (tile.isOre) {
                var densityChange = (oldDensity - newDensity) / 2 >> 0;
                var newDensity2 = oldDensity - densityChange;
                if (newDensity2 < 128)
                    return 0;
                else return newDensity2;
            }
            else return oldDensity;

        };
        v2.mul(0.5, entity.physicsBody.speed, entity.physicsBody.speed);
    } else {

        entity.movement.isDigging = true;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) { return (tile.isOre) ? oldDensity : newDensity; };
    }

    var dug = carveCircle(gameData, this.x + digDis * this.dir[0], this.y + digDis * this.dir[1], this.radius, this.digSpeed, this.maxDigHardness, onDensityChange);
    if (isServer) {
        // Only process dug ores on server
        for (var i = 0; i < dug.length; ++i) {
            if (!dug[i] || dug[i] <= 0) continue;
            var tileName = gameData.tileRegister[i].name;
            var itemId = i;
            if (entity.inventory && entity.controlledByPlayer)
                sendCommand(new CommandPlayerOreInventory(entity.controlledByPlayer.playerId, OreInventoryActions.ADD_ORE, itemId, dug[i]));
            if (tileName == Tiles.Dirt.name) {
                var rand = Math.random() * 1000;
                var itemId = null;
                if (rand > 990)
                    itemId = Items.RottenRoot.id;
                if (itemId != null) {
                    var physicsBody = entity.physicsBody;

                    var itemEntityId = idList.next();
                    var itemEntity = entityTemplates.item(itemId, 1, gameData);
                    itemEntity.physicsBody.pos = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
                    itemEntity.physicsBody.posOld = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
                    itemEntity.physicsBody.angle = physicsBody.angle;
                    itemEntity.physicsBody.angleOld = physicsBody.angle;
                    sendCommand(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));
                }
            }
        }
    }
}

CommandEntityDig.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
    serializeV2(byteArray, index, this.dir);
    serializeFix(byteArray, index, this.radius);
    serializeFix(byteArray, index, this.digSpeed);
    serializeFix(byteArray, index, this.maxDigHardness);
}

CommandEntityDig.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
    this.dir = deserializeV2(byteArray, index);
    this.radius = deserializeFix(byteArray, index);
    this.digSpeed = deserializeFix(byteArray, index);
    this.maxDigHardness = deserializeFix(byteArray, index);
}

CommandEntityDig.prototype.getSerializationSize = function() {
    return 32;
}
