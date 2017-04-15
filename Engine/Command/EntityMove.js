





var CommandEntityMove = function(entityId, direction, pos) {
    this.entityId = entityId;
    this.direction = direction;
    if (pos)
        this.pos = v2.cloneFix(pos);
}
global.CommandEntityMove = CommandEntityMove;
TypeRegister.add(RegisterCommand, CommandEntityMove);

CommandEntityMove.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    movement.direction = this.direction;
    movement.rotationDirection = v2.clone(this.direction);
    physicsBody.setPos(this.pos);
}

CommandEntityMove.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.direction);
    Serialize.v2(byteArray, index, this.pos);
}

CommandEntityMove.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.direction = Deserialize.v2(byteArray, index);
    this.pos = Deserialize.v2(byteArray, index);
}

CommandEntityMove.prototype.getSerializationSize = function() {
    return 20;
}
