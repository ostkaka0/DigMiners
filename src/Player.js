Player = function(name, entityId, socketId) {
    this.name = name;
    this.entityId = entityId || 0;
    this.socketId = socketId;
}