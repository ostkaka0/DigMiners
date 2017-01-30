var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var Sprite = require("engine/Animation/Sprite.js")

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Command = require("game/Command/Command.js")
var Projectile = require("game/Entity/Projectile.js")
var projectileEntitySimulate = require("game/ProjectilePhysics.js").projectileEntitySimulate

var CommandProjectileSpawn = function(entityId, pos, angle, speed, maxDistance, projectileType, shooterEntityId) {
    this.entityId = entityId;
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.angle = angle;
    this.speed = speed;
    this.maxDistance = maxDistance;
    this.projectileType = projectileType;
    this.shooterEntityId = shooterEntityId;
}
module.exports = CommandProjectileSpawn
Command.Register.push(module.exports)

CommandProjectileSpawn.prototype.execute = function() {
    if (Global.gameData.world.entityWorld.objects[this.entityId])
        Global.gameData.world.entityWorld.remove(Global.gameData.world.entityWorld.objects[this.entityId]);
    var entity = {};
    entity.projectile = new Projectile(this.pos, this.angle, this.speed, this.maxDistance, this.projectileType, this.shooterEntityId);
    if (!isServer) {
        entity.projectile.sprite = new Sprite(entity.projectile.projectileType.textureName);
        entity.projectile.sprite.anchor[0] = 1.0;
        entity.projectile.sprite.anchor[1] = 0.5;
        entity.projectile.sprite.scale[0] = this.projectileType.scaleX;
        entity.projectile.sprite.scale[1] = this.projectileType.scaleY;
        entity.projectile.sprite.visible = false;
        zindices[2].add(entity.projectile.sprite);
    }
    projectileEntitySimulate(entity, Config.tickDuration / 1000.0);
    Global.gameData.world.entityWorld.add(entity, this.entityId);
}

CommandProjectileSpawn.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.pos);
    Serialize.fix(byteArray, index, this.angle);
    Serialize.fix(byteArray, index, this.speed);
    Serialize.fix(byteArray, index, this.maxDistance);
    Serialize.int8(byteArray, index, this.projectileType.id);
    Serialize.int32(byteArray, index, this.shooterEntityId);
}

CommandProjectileSpawn.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.pos = Deserialize.v2(byteArray, index);
    this.angle = Deserialize.fix(byteArray, index);
    this.speed = Deserialize.fix(byteArray, index);
    this.maxDistance = Deserialize.fix(byteArray, index);
    this.projectileType = Config.projectileRegister[Deserialize.int8(byteArray, index)];
    this.shooterEntityId = Deserialize.int32(byteArray, index);
}

CommandProjectileSpawn.prototype.getSerializationSize = function() {
    return 29;
}
