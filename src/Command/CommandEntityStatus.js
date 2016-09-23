
CommandEntityStatus = function (entityId, physicsBody) {
    this.entityId = entityId;
    //TODO: PROPER CLONE
    if (!physicsBody)
        physicsBody = {};
    var physicsBodyClone = JSON.parse(JSON.stringify(physicsBody));
    this.physicsBody = physicsBodyClone;
}

COMMAND_ID_COUNTER = COMMAND_ID_COUNTER + 1;
CommandEntityStatus.prototype.id = COMMAND_ID_COUNTER;
COMMANDS[COMMAND_ID_COUNTER] = CommandEntityStatus;

CommandEntityStatus.prototype.execute = function (gameData) {
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

CommandEntityStatus.prototype.getName = function () {
    return "CommandEntityStatus";
}

CommandEntityStatus.prototype.getData = function () {
    return [this.entityId, this.physicsBody];
}

CommandEntityStatus.prototype.serialize = function (byteArray, index) {
    console.log("serializing physicsbody " + JSON.stringify(this.physicsBody));
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index += 4, this.physicsBody.pos);
    serializeV2(byteArray, index += 4, this.physicsBody.posOld);
    serializeV2(byteArray, index += 4, this.physicsBody.speed);
    serializeV2(byteArray, index += 4, this.physicsBody.speedOld);
    serializeFix(byteArray, index += 4, this.physicsBody.damping);
    serializeFix(byteArray, index += 4, this.physicsBody.angle);
    serializeFix(byteArray, index += 4, this.physicsBody.angleOld);
    serializeFix(byteArray, index += 4, this.physicsBody.rotationSpeed);
}

CommandEntityStatus.prototype.deserialize = function (byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.physicsBody.pos = deserializeV2(byteArray, index += 8);
    this.physicsBody.posOld = deserializeV2(byteArray, index += 8);
    this.physicsBody.speed = deserializeV2(byteArray, index += 8);
    this.physicsBody.speedOld = deserializeV2(byteArray, index += 8);
    this.physicsBody.damping = deserializeFix(byteArray, index += 4);
    this.physicsBody.angle = deserializeFix(byteArray, index += 4);
    this.physicsBody.angleOld = deserializeFix(byteArray, index += 4);
    this.physicsBody.rotationSpeed = deserializeFix(byteArray, index += 4);
}

CommandEntityStatus.prototype.getSerializationSize = function () {
    return 52;
}