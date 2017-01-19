
ProjectileEvents = {};
ProjectileEvents.onHit = [];
ProjectileEvents.onHitEntity = [];
ProjectileEvents.onHitBlock = [];
ProjectileEvents.onHitTile = [];

Projectile = function(pos, angle, speed, maxDistance, projectileType, shooterEntityId) {
    this.pos = pos;
    this.angle = angle;
    this.speed = speed;
    this.maxDistance = maxDistance;
    this.projectileType = projectileType;
    this.shooterEntityId = shooterEntityId;
    this.damageFactor = 1.0;

    if (pos) {
        this.startPos = v2.clone(pos);
        this.posOld = v2.clone(pos);
        this.posClient = v2.clone(pos);
        this.posClientOld = v2.clone(pos);
    }
    else {
        this.startPos = [0, 0];
        this.posOld = [0, 0];
        this.posClient = [0, 0];
        this.posClientOld = [0, 0];
    }
}

Projectile.prototype.name = projectile.name; function projectile() { };

Projectile.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.angle);
    serializeFix(byteArray, index, this.speed);
    serializeFix(byteArray, index, this.maxDistance);
    serializeInt8(byteArray, index, this.projectileType.id);
}

Projectile.prototype.deserialize = function(byteArray, index) {
    this.pos = deserializeV2(byteArray, index);
    this.startPos = v2.clone(this.pos);
    this.posOld = v2.clone(this.pos);
    this.angle = deserializeFix(byteArray, index);
    this.speed = deserializeFix(byteArray, index);
    this.maxDistance = deserializeFix(byteArray, index);
    this.projectileType = Config.projectileRegister[deserializeInt8(byteArray, index)];
    this.posClient = v2.create(0, 0);
    this.posClientOld = v2.create(0, 0);
}

Projectile.prototype.getSerializationSize = function() {
    return 21;
}

Projectile.prototype.destroy = function(entity) {
    if (!isServer)
        zindices[2].removeChild(entity.projectile.sprite);
}
