
CommandProjectileSpawn = function(entityId, pos, angle, speed, projectileType, shooterEntityId) {
    this.entityId = entityId;
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.angle = angle;
    this.speed = speed;
    this.projectileType = projectileType;
    this.shooterEntityId = shooterEntityId;
}

CommandProjectileSpawn.prototype.execute = function(gameData) {
    if (gameData.entityWorld.objects[this.entityId])
        gameData.entityWorld.remove(gameData.entityWorld.objects[this.entityId]);
    var entity = {};
    entity.projectile = new Projectile(this.pos, this.angle, this.speed, this.projectileType, this.shooterEntityId);
    if (!isServer) {
        entity.projectile.sprite = new PIXI.Sprite(gameData.textures[entity.projectile.projectileType.textureName]);
        entity.projectile.sprite.anchor.x = 0.5;
        entity.projectile.sprite.anchor.y = 0.5;
        zindices[2].addChild(entity.projectile.sprite);
    }
    projectileEntitySimulate(entity, gameData.tickDuration / 1000.0);
    gameData.entityWorld.add(entity, this.entityId);
}

CommandProjectileSpawn.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.angle);
    serializeFix(byteArray, index, this.speed);
    serializeInt8(byteArray, index, this.projectileType.id);
    serializeInt32(byteArray, index, this.shooterEntityId);
}

CommandProjectileSpawn.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.angle = deserializeFix(byteArray, index);
    this.speed = deserializeFix(byteArray, index);
    this.projectileType = gameData.projectileRegister[deserializeInt8(byteArray, index)];
    this.shooterEntityId = deserializeInt32(byteArray, index);
}

CommandProjectileSpawn.prototype.getSerializationSize = function() {
    return 25;
}
