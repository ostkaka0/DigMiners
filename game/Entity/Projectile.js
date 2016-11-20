
Projectile = function(pos, angle, projectileType) {
    this.pos = pos;
    this.angle = angle;
    this.projectileType = projectileType;

    if (pos) {
        this.posOld = v2.clone(pos);
        this.posClient = v2.clone(pos);
        this.posClientOld = v2.clone(pos);
    }
    else {
        this.posOld = [0, 0];
        this.posClient = [0, 0];
        this.posClientOld = [0, 0];
    }
}

Projectile.prototype.name = projectile.name; function projectile() { };

Projectile.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.angle);
    serializeInt8(byteArray, index, this.projectileType);
}

Projectile.prototype.deserialize = function(byteArray, index) {
    this.pos = deserializeV2(byteArray, index);
    this.posOld = v2.clone(this.pos);
    this.angle = deserializeFix(byteArray, index);
    this.projectileType = gameData.projectileRegister[deserializeInt8(byteArray, index)];
    this.posClient = v2.create(0, 0);
    this.posClientOld = v2.create(0, 0);
}

Projectile.prototype.getSerializationSize = function() {
    return 13;
}

Projectile.prototype.destroy = function(entity) {
    if (!isServer)
        zindices[2].removeChild(entity.projectile.sprite);
}