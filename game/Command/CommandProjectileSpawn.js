
CommandProjectileSpawn = function(entityId, pos, angle, projectileType, shooterEntityId) {
    this.entityId = entityId;
    this.pos = pos;
    this.angle = angle;
    this.projectileType = projectileType;
    this.shooterEntityId = shooterEntityId;
}

CommandProjectileSpawn.prototype.execute = function(gameData) {
    if (gameData.entityWorld.objects[this.entityId])
        gameData.entityWorld.remove(gameData.entityWorld.objects[this.entityId]);
    var entity = {};
    entity.projectile = new Projectile(this.pos, this.angle, this.projectileType, this.shooterEntityId);
    if (!isServer) {
        entity.projectile.sprite = new PIXI.Sprite(gameData.textures[entity.projectile.projectileType.textureName]);
        entity.projectile.sprite.anchor.x = 0.5;
        entity.projectile.sprite.anchor.y = 0.5;
        entity.projectile.sprite.position.x = -camera.pos[0] + canvas.width / 2 + 32.0 * entity.projectile.pos[0];
        entity.projectile.sprite.position.y = camera.pos[1] + canvas.height / 2 - 32.0 * entity.projectile.pos[1];
        entity.projectile.sprite.rotation = entity.projectile.angle;
        zindices[2].addChild(entity.projectile.sprite);
    }
    gameData.entityWorld.add(entity, this.entityId);
}

CommandProjectileSpawn.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.angle);
    serializeInt8(byteArray, index, this.projectileType.id);
    serializeInt32(byteArray, index, this.shooterEntityId);
}

CommandProjectileSpawn.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.angle = deserializeFix(byteArray, index);
    this.projectileType = gameData.projectileRegister[deserializeInt8(byteArray, index)];
    this.shooterEntityId = deserializeInt32(byteArray, index);
}

CommandProjectileSpawn.prototype.getSerializationSize = function() {
    return 21;
}