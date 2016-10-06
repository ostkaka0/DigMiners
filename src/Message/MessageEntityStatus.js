
MessageEntityStatus = function(entityId, physicsBody) {
    this.entityId = entityId;
    //TODO: PROPER CLONE
    if(!physicsBody)
        this.physicsBody = new PhysicsBody();
    else {
        var physicsBodyClone = JSON.parse(JSON.stringify(physicsBody));
        this.physicsBody = physicsBodyClone;
    }
}

MessageEntityStatus.prototype.execute = function(gameData) {
    var entityWorld = gameData.entityWorld;

    var entity = entityWorld.objects[this.entityId];
    if(!entity) return;
    var physicsBody = entity.physicsBody;
    if(!physicsBody) return;
    physicsBody.pos = this.physicsBody.pos;
    physicsBody.posOld = this.physicsBody.posOld;
    physicsBody.speed = this.physicsBody.speed;
    physicsBody.speedOld = this.physicsBody.speedOld;
    physicsBody.damping = this.physicsBody.damping;
    physicsBody.angle = this.physicsBody.angle;
    physicsBody.angleOld = this.physicsBody.angleOld;
    physicsBody.rotationSpeed = this.physicsBody.rotationSpeed;
}

MessageEntityStatus.prototype.getSerializationSize = function() {
    return 52;
}

MessageEntityStatus.prototype.send = function(socket) {
    var byteArray = new Uint8Array(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.physicsBody.pos);
    serializeV2(byteArray, index, this.physicsBody.posOld);
    serializeV2(byteArray, index, this.physicsBody.speed);
    serializeV2(byteArray, index, this.physicsBody.speedOld);
    serializeFix(byteArray, index, this.physicsBody.damping);
    serializeFix(byteArray, index, this.physicsBody.angle);
    serializeFix(byteArray, index, this.physicsBody.angleOld);
    serializeFix(byteArray, index, this.physicsBody.rotationSpeed);
    socket.emit(this.idString, byteArray);
}

MessageEntityStatus.prototype.receive = function(gameData, byteArray) {
    var index = new IndexCounter();
    byteArray = new Uint8Array(byteArray);
    this.entityId = deserializeInt32(byteArray, index);
    this.physicsBody.pos = deserializeV2(byteArray, index);
    this.physicsBody.posOld = deserializeV2(byteArray, index);
    this.physicsBody.speed = deserializeV2(byteArray, index);
    this.physicsBody.speedOld = deserializeV2(byteArray, index);
    this.physicsBody.damping = deserializeFix(byteArray, index);
    this.physicsBody.angle = deserializeFix(byteArray, index);
    this.physicsBody.angleOld = deserializeFix(byteArray, index);
    this.physicsBody.rotationSpeed = deserializeFix(byteArray, index);
}
