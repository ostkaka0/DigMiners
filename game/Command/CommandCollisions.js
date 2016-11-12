
CommandCollisions = function(collisions) {
    var physicsWorld = gameData.physicsWorld;
    var physicsEntities = gameData.physicsEntities;
    
    this.collisions = [];
    
    if (collisions) {
        collisions.forEach((function(collision) {
            var aEntity = physicsEntities[collision[0]];
            var bEntity = physicsEntities[collision[1]];
            if (aEntity == undefined || bEntity == undefined) return;
            var aPos = physicsWorld.getPos(collision[0]);
            var bPos = physicsWorld.getPos(collision[1]);
            if (aPos == undefined || bPos == undefined) return;
            
            this.collisions.push([aEntity.id, bEntity.id, aPos, bPos]);
        }).bind(this));
    }
}

CommandCollisions.prototype.execute = function(gameData) {
    var physicsWorld = gameData.physicsWorld;
    var entities = gameData.entityWorld.objects;
    
    this.collisions.forEach(function(collisionData) {
        var aEntity = entities[collisionData[0]];
        var bEntity = entities[collisionData[1]];
        if (!aEntity || !bEntity) return;
        var aPhysics = aEntity.physicsBody;
        var bPhysics = bEntity.physicsBody;
        if (!aPhysics || !bPhysics) return;
        physicsWorld.setPos(aPhysics.bodyId, collisionData[2]);
        physicsWorld.setPos(bPhysics.bodyId, collisionData[3]);
    });
}

CommandCollisions.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.collisions.length);
    this.collisions.forEach((function(collisionData) {
        serializeInt32(byteArray, index, collisionData[0]);
        serializeInt32(byteArray, index, collisionData[1]);
        serializeV2(byteArray, index, collisionData[2]);
        serializeV2(byteArray, index, collisionData[3]);
    }).bind(this));
}

CommandCollisions.prototype.deserialize = function(byteArray, index) {
    var numCollisions = deserializeInt32(byteArray, index);
    for(var i = 0; i < numCollisions; i++) {
        this.collisions.push([deserializeInt32(byteArray, index), 
                              deserializeInt32(byteArray, index),
                              deserializeV2(byteArray, index),
                              deserializeV2(byteArray, index)]);
    }
}

CommandCollisions.prototype.getSerializationSize = function() {
    return 4 + this.collisions.length * (4 + 4 + 8 + 8);
}
