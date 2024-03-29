






var EntityProjectile = function(pos, angle, speed, maxDistance, projectileType, shooterEntityId) {
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
global.EntityProjectile = EntityProjectile;
TypeRegister.add(RegisterEntity, EntityProjectile);
EntityProjectile.Events = { onHit: new Map(), onHitEntity: new Map(), onHitBlock: new Map(), onHitTile: new Map() };

EntityProjectile.prototype.name = projectile.name; function projectile() { };

EntityProjectile.prototype.serialize = function(byteArray, index) {
    Serialize.v2(byteArray, index, this.pos);
    Serialize.fix(byteArray, index, this.angle);
    Serialize.fix(byteArray, index, this.speed);
    Serialize.fix(byteArray, index, this.maxDistance);
    Serialize.int8(byteArray, index, this.projectileType.id);
}

EntityProjectile.prototype.deserialize = function(byteArray, index) {
    this.pos = Deserialize.v2(byteArray, index);
    this.startPos = v2.clone(this.pos);
    this.posOld = v2.clone(this.pos);
    this.angle = Deserialize.fix(byteArray, index);
    this.speed = Deserialize.fix(byteArray, index);
    this.maxDistance = Deserialize.fix(byteArray, index);
    this.projectileType = Game.projectileRegister[Deserialize.int8(byteArray, index)];
    this.posClient = v2.create(0, 0);
    this.posClientOld = v2.create(0, 0);
}

EntityProjectile.prototype.getSerializationSize = function() {
    return 21;
}

EntityProjectile.prototype.destroy = function(entity) {
    if (!isServer)
        Client.zindices[2].remove(entity.projectile.sprite);
}
