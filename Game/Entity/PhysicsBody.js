import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Global from "Game/Global.js";
import EntityRegister from "Game/Register/Entity.js";

var PhysicsBody = function(pos, damping, rotationSpeed, mass, radius) {
    this.bodyId = Global.gameData.world.physicsWorld.add(pos, [0.0, 0.0], mass, radius);
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
export default PhysicsBody
EntityRegister.push(PhysicsBody);

PhysicsBody.prototype.name = physicsBody.name; function physicsBody() { };

PhysicsBody.prototype.serialize = function(byteArray, index) {
    Serialize.v2(byteArray, index, this.getPos());
    Serialize.v2(byteArray, index, this.getVelocity());
    Serialize.fix(byteArray, index, this.getMass());
    Serialize.fix(byteArray, index, this.getRadius());
    Serialize.fix(byteArray, index, this.angle);
    Serialize.fix(byteArray, index, this.rotationSpeed);
    Serialize.fix(byteArray, index, this.damping);
}

PhysicsBody.prototype.deserialize = function(byteArray, index) {
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

PhysicsBody.prototype.getSerializationSize = function() {
    return 36;
}

PhysicsBody.prototype.destroy = function(entity) {
    Global.gameData.world.physicsWorld.remove(this.bodyId);
}

PhysicsBody.prototype.getPos = function() { return Global.gameData.world.physicsWorld.getPos(this.bodyId); }
PhysicsBody.prototype.setPos = function(pos) { Global.gameData.world.physicsWorld.setPos(this.bodyId, pos); }
PhysicsBody.prototype.getVelocity = function() { return Global.gameData.world.physicsWorld.getVelocity(this.bodyId); }
PhysicsBody.prototype.setVelocity = function(velocity) { Global.gameData.world.physicsWorld.setVelocity(this.bodyId, velocity); }
PhysicsBody.prototype.getMass = function() { return Global.gameData.world.physicsWorld.getMass(this.bodyId); }
PhysicsBody.prototype.setMass = function(mass) { Global.gameData.world.physicsWorld.setMass(this.bodyId, mass); }
PhysicsBody.prototype.getRadius = function() { return Global.gameData.world.physicsWorld.getRadius(this.bodyId); }
PhysicsBody.prototype.setRadius = function(radius) { Global.gameData.world.physicsWorld.setRadius(this.bodyId, radius); }

PhysicsBody.prototype.rotateTo = function(angle, speed, dt) {
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
