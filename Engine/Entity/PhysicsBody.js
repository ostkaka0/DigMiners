import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import RegisterEntity from "Engine/Register/Entity.js";

var EntityPhysicsBody = function(pos, damping, rotationSpeed, mass, radius) {
    this.bodyId = global.gameData.world.physicsWorld.add(pos, [0.0, 0.0], mass, radius);
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
    if (rotationSpeed)
        this.rotationSpeed = rotationSpeed;
    else
        this.rotationSpeed = 20.0;
    this.speedOld = [0, 0];
    if (damping)
        this.damping = fix.toFix(damping);
    this.angle = 0;
    this.angleOld = 0;
}
export default EntityPhysicsBody
RegisterEntity.push(EntityPhysicsBody);

EntityPhysicsBody.prototype.name = physicsBody.name; function physicsBody() { };

EntityPhysicsBody.prototype.serialize = function(byteArray, index) {
    Serialize.v2(byteArray, index, this.getPos());
    Serialize.v2(byteArray, index, this.getVelocity());
    Serialize.fix(byteArray, index, this.getMass());
    Serialize.fix(byteArray, index, this.getRadius());
    Serialize.fix(byteArray, index, this.angle);
    Serialize.fix(byteArray, index, this.rotationSpeed);
    Serialize.fix(byteArray, index, this.damping);
}

EntityPhysicsBody.prototype.deserialize = function(byteArray, index) {
    this.setPos(Deserialize.v2(byteArray, index));
    this.posOld = v2.clone(this.getPos());
    this.setVelocity(Deserialize.v2(byteArray, index));
    this.speedOld = v2.clone(this.getVelocity());
    this.setMass(Deserialize.fix(byteArray, index));
    this.setRadius(Deserialize.fix(byteArray, index));
    this.angle = Deserialize.fix(byteArray, index);
    this.angleOld = this.angle;
    this.rotationSpeed = Deserialize.fix(byteArray, index);
    this.damping = Deserialize.fix(byteArray, index);

    this.posClient = v2.clone(this.getPos());
    this.posClientOld = v2.clone(this.getPos());
}

EntityPhysicsBody.prototype.getSerializationSize = function() {
    return 36;
}

EntityPhysicsBody.prototype.destroy = function(entity) {
    global.gameData.world.physicsWorld.remove(this.bodyId);
}

EntityPhysicsBody.prototype.getPos = function() { return global.gameData.world.physicsWorld.getPos(this.bodyId); }
EntityPhysicsBody.prototype.setPos = function(pos) { global.gameData.world.physicsWorld.setPos(this.bodyId, pos); }
EntityPhysicsBody.prototype.getVelocity = function() { return global.gameData.world.physicsWorld.getVelocity(this.bodyId); }
EntityPhysicsBody.prototype.setVelocity = function(velocity) { global.gameData.world.physicsWorld.setVelocity(this.bodyId, velocity); }
EntityPhysicsBody.prototype.getMass = function() { return global.gameData.world.physicsWorld.getMass(this.bodyId); }
EntityPhysicsBody.prototype.setMass = function(mass) { global.gameData.world.physicsWorld.setMass(this.bodyId, mass); }
EntityPhysicsBody.prototype.getRadius = function() { return global.gameData.world.physicsWorld.getRadius(this.bodyId); }
EntityPhysicsBody.prototype.setRadius = function(radius) { global.gameData.world.physicsWorld.setRadius(this.bodyId, radius); }

EntityPhysicsBody.prototype.rotateTo = function(angle, speed, dt) {
    if (this.angle == angle)
        return;

    var newDirx = Math.cos(angle);
    var newDiry = Math.sin(angle);
    var oldDirx = Math.cos(this.angle);
    var oldDiry = Math.sin(this.angle);
    oldDirx += (newDirx - oldDirx) * speed * dt;
    oldDiry += (newDiry - oldDiry) * speed * dt;
    this.angle = Math.atan2(oldDiry, oldDirx);
}
