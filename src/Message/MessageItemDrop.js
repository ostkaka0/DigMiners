
MessageItemDrop = function(entityId, itemId, amount, x, y, speedX, speedY, rotation) {
    this.entityId = entityId;
    this.itemId = itemId;
    this.amount = amount;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.rotation = rotation;
}

MessageItemDrop.prototype.execute = function(gameData) {
    // todo: serialize/deserialize/store v2 instead of x y
    var entity = entityTemplates.item(this.entityId, this.itemId, this.amount, gameData);
    entity.physicsBody.pos = v2.create(this.x, this.y);
    entity.physicsBody.posOld = v2.create(this.x, this.y);
    entity.physicsBody.speed = v2.create(this.speedX, this.speedY);
    entity.physicsBody.speedOld = v2.create(this.speedX, this.speedY);
    entity.physicsBody.angle = this.rotation;
    entity.physicsBody.angleOld = entity.physicsBody.angle;
    entity.item.dropped = new Date();
}

MessageItemDrop.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
    serializeFix(byteArray, index, this.speedX);
    serializeFix(byteArray, index, this.speedY);
    serializeFix(byteArray, index, this.rotation);
}

MessageItemDrop.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
    this.speedX = deserializeFix(byteArray, index);
    this.speedY = deserializeFix(byteArray, index);
    this.rotation = deserializeFix(byteArray, index);
}

MessageItemDrop.prototype.getSerializationSize = function() {
    return 32;
}

MessageItemDrop.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessageItemDrop.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}