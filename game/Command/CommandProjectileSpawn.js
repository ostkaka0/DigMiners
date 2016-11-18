
CommandProjectileSpawn = function(entityId, pos, angle, projectileType) {
    this.entityId = entityId;
    this.pos = pos;
    this.angle = angle;
    this.projectileType = projectileType;
}

CommandProjectileSpawn.prototype.execute = function(gameData) {
    if (gameData.entityWorld.objects[this.entityId])
        gameData.entityWorld.remove(gameData.entityWorld.objects[this.entityId]);
    var entity = {};
    entity.projectile = new Projectile(this.pos, this.angle, this.projectileType);
    if (!isServer) {
        entity.projectile.sprite = new PIXI.Sprite(gameData.textures[entity.projectile.projectileType.textureName]);
        entity.projectile.sprite.anchor.x = 0.5;
        entity.projectile.sprite.anchor.y = 0.5;
        zindices[2].addChild(entity.projectile.sprite);
    }
    gameData.entityWorld.add(entity, this.entityId);
}

CommandProjectileSpawn.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.angle);
    serializeInt8(byteArray, index, this.projectileType);
}

CommandProjectileSpawn.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.angle = deserializeFix(byteArray, index);
    this.projectileType = gameData.projectileRegister[deserializeInt8(byteArray, index)];
}

CommandProjectileSpawn.prototype.getSerializationSize = function() {
    return 17;
}