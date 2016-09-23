
CommandEntityStatus = function (entityId, physicsBody) {
    this.entityId = entityId;
    //TODO: PROPER CLONE
    var physicsBodyClone = JSON.parse(JSON.stringify(physicsBody));
    this.physicsBody = physicsBodyClone;
}

var COMMAND_ID_COUNTER = (COMMAND_ID_COUNTER || 0)+1;
var COMMANDS = COMMANDS || [null];
CommandEntityStatus.prototype.id = COMMAND_ID_COUNTER;
COMMANDS.push("CommandEntityStatus");

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
    console.dir(this.physicsBody);
    physicsBody.pos = this.physicsBody.pos;
    console.log("set " + this.entityId + " pos to " + physicsBody.pos);
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

CommandEntityStatus.prototype.serialize = function(byteArray) {
    serializeInt32(byteArray, this.entityId);
    this.physicsBody.serialize(byteArray);
}

CommandEntityStatus.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    //this.physicsBody = new physicsBody();
    physicsBody.deserialize(byteArray, index);
}