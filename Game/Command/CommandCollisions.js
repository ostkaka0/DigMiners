import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import CommandRegister from "Game/Register/Command.js";
import Config from "Game/Config.js";
import Global from "Game/Global.js";

var CommandCollisions = function(collisions) {
    var physicsWorld = Global.gameData.world.physicsWorld;
    var physicsEntities = Global.gameData.world.physicsEntities;

    var bodies = {};
    this.collisions = [];

    if (collisions) {
        collisions.forEach(function(collision) {
            var aEntity = physicsEntities[collision[0]];
            var bEntity = physicsEntities[collision[1]];
            if (aEntity == undefined || bEntity == undefined) return;
            var aPos = physicsWorld.getPos(collision[0]);
            var bPos = physicsWorld.getPos(collision[1]);
            if (aPos == undefined || bPos == undefined) return;

            if (!bodies[collision[0]]) {
                bodies[collision[0]] = true;
                this.collisions.push([aEntity.id, aPos]);
            }
            if (!bodies[collision[1]]) {
                bodies[collision[1]] = true;
                this.collisions.push([bEntity.id, bPos]);
            }
        }.bind(this));
    }
}
export default CommandCollisions;
CommandRegister.push(CommandCollisions);

CommandCollisions.prototype.execute = function() {
    var physicsWorld = Global.gameData.world.physicsWorld;
    var entities = Global.gameData.world.entityWorld.objects;

    this.collisions.forEach(function(collisionData) {
        var entity = entities[collisionData[0]];
        if (!entity) return;
        var physics = entity.physicsBody;
        if (!physics) return;
        physicsWorld.setPos(physics.bodyId, collisionData[1]);
    });
}

CommandCollisions.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.collisions.length);
    this.collisions.forEach((function(collisionData) {
        Serialize.int32(byteArray, index, collisionData[0]);
        Serialize.v2(byteArray, index, collisionData[1]);
    }).bind(this));
}

CommandCollisions.prototype.deserialize = function(byteArray, index) {
    var numCollisions = Deserialize.int32(byteArray, index);
    for (var i = 0; i < numCollisions; i++) {
        this.collisions.push([Deserialize.int32(byteArray, index), Deserialize.v2(byteArray, index)]);
    }
}

CommandCollisions.prototype.getSerializationSize = function() {
    return 4 + this.collisions.length * (4 + 8);
}
