
MessageEntityStatus = function (entityId, physicsBody) {
    this.entityId = entityId;
    //TODO: PROPER CLONE
    if (!physicsBody)
        physicsBody = {};
    var physicsBodyClone = JSON.parse(JSON.stringify(physicsBody));
    this.physicsBody = physicsBodyClone;
}

MessageEntityStatus.prototype.execute = function (gameData) {
    var entityWorld = gameData.entityWorld;
    if (!entityWorld) {
        console.error("Missing required gameData properties");
        return;
    }

    var entity = entityWorld.objects[this.entityId];
    if (!entity) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    physicsBody.pos = this.physicsBody.pos;
    physicsBody.posOld = this.physicsBody.posOld;
    physicsBody.speed = this.physicsBody.speed;
    physicsBody.speedOld = this.physicsBody.speedOld;
    physicsBody.damping = this.physicsBody.damping;
    physicsBody.angle = this.physicsBody.angle;
    physicsBody.angleOld = this.physicsBody.angleOld;
    physicsBody.rotationSpeed = this.physicsBody.rotationSpeed;
}

MessageEntityStatus.prototype.serialize = function (byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.physicsBody.pos);
    serializeV2(byteArray, index, this.physicsBody.posOld);
    serializeV2(byteArray, index, this.physicsBody.speed);
    serializeV2(byteArray, index, this.physicsBody.speedOld);
    serializeFix(byteArray, index, this.physicsBody.damping);
    serializeFix(byteArray, index, this.physicsBody.angle);
    serializeFix(byteArray, index, this.physicsBody.angleOld);
    serializeFix(byteArray, index, this.physicsBody.rotationSpeed);
}

MessageEntityStatus.prototype.deserialize = function (byteArray, index) {
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

MessageEntityStatus.prototype.getSerializationSize = function () {
    return 52;
}

MessageEntityStatus.prototype.send = function (socket) {
    var byteArray = new Uint8Array(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit("entityStatus", byteArray);
}

MessageEntityStatus.receive = function (byteArray) {
    var message = new MessageEntityStatus();
    var counter = new IndexCounter();
    message.deserialize(byteArray, counter);
    return message;
}