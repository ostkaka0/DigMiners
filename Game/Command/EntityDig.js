
var CommandEntityDig = function(entityId, pos, dir, radius, digSpeed, maxDigHardness) {
    this.entityId = entityId;
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.dir = dir;
    this.radius = fix.toFix(radius);
    this.digSpeed = digSpeed;
    this.maxDigHardness = maxDigHardness;
}
TypeRegister.add(RegisterCommand, CommandEntityDig);

CommandEntityDig.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity || !entity.movement) return;

    var tileWorld = World.tiles;
    var targetTile = Game.tileRegister[World.tiles.getTileId([this.pos[0] + 1.0 * this.dir[0], this.pos[1] + 1.0 * this.dir[1]])];
    var targetDensity = World.tiles.getDensity([this.pos[0] + 1.0 * this.dir[0], this.pos[1] + 1.0 * this.dir[1]]);
    var onDensityChange = null;
    var digDis = 1.5;
    var xp = 0;

    var addXP = function(tile, oldDensity, newDensity) {
        if (newDensity < 128 && oldDensity >= 128)
            xp += tile.xp || 0;
    }

    if (targetTile.isOre && targetDensity > 0) {
        entity.movement.isMining = true;
        digDis = 1.0;
        this.radius = 1.0;
        onDensityChange = function([tileX, tileY], tile, oldDensity, newDensity) {
            if (tile.isOre) {
                var densityChange = (oldDensity - newDensity);// / 2 >> 0;
                var newDensity2 = oldDensity - densityChange;
                if (newDensity2 < 128)
                    newDensity2 = 0;
                addXP(tile, oldDensity, newDensity2);
                return newDensity2;
            }
            else return oldDensity;

        };
        var velocity = v2.create(0, 0);
        v2.mul(0.5, entity.physicsBody.getVelocity(), velocity);
        entity.physicsBody.setVelocity(velocity);
    } else {

        entity.movement.isDigging = true;
        onDensityChange = function([tileX, tileY], tile, oldDensity, newDensity) {
            if (tile.isOre) return oldDensity;
            if (newDensity < 128)
                newDensity = 0;
            addXP(tile, oldDensity, newDensity);
            return newDensity;
        };
    }
    var dug = World.tiles.carveCircle(Game.tileRegister, [this.pos[0] + digDis * this.dir[0], this.pos[1] + digDis * this.dir[1]], this.radius, this.digSpeed, this.maxDigHardness, onDensityChange);
    if (isServer) {
        // Only process dug ores on server
        for (var i = 0; i < dug.length; ++i) {
            if (!dug[i] || dug[i] <= 0) continue;
            var tileName = Game.tileRegister[i].name;
            var itemId = i;
            if (entity.inventory && entity.controlledByPlayer)
                sendCommand(new CommandPlayerOreInventory(entity.controlledByPlayer.playerId, CommandPlayerOreInventory.Actions.ADD_ORE, itemId, dug[i]));
            /*if (tileName == Tiles.Dirt.name) {
                var rand = Math.random() * 1000;
                var itemId = null;
                if (rand > 990)
                    itemId = Items.Types.RottenRoot.id;
                if (itemId != null) {
                    var physicsBody = entity.physicsBody;

                    var itemEntityId = World.idList.next();
                    var itemEntity = entityTemplateItem(itemId, 1);
                    itemEntity.physicsBody.setPos(v2.clone(physicsBody.getPos()));
                    itemEntity.physicsBody.angle = physicsBody.angle;
                    itemEntity.physicsBody.angleOld = physicsBody.angle;
                    sendCommand(new CommandEntitySpawn(itemEntity, itemEntityId));
                }
            }*/
        }
        if (entity.controlledByPlayer && xp > 0)
            sendCommand(new CommandPlayerXP(entity.controlledByPlayer.playerId, xp));
    }
}

CommandEntityDig.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.pos);
    Serialize.v2(byteArray, index, this.dir);
    Serialize.fix(byteArray, index, this.radius);
    Serialize.fix(byteArray, index, this.digSpeed);
    Serialize.fix(byteArray, index, this.maxDigHardness);
}

CommandEntityDig.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.pos = Deserialize.v2(byteArray, index);
    this.dir = Deserialize.v2(byteArray, index);
    this.radius = Deserialize.fix(byteArray, index);
    this.digSpeed = Deserialize.fix(byteArray, index);
    this.maxDigHardness = Deserialize.fix(byteArray, index);
}

CommandEntityDig.prototype.getSerializationSize = function() {
    return 32;
}
