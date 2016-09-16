Player = function(name, entityId) {
    this.isActive = false;
    this.id = 0;
    this.name = name;
    this.entityId = (entityId)? entityId : 0;
}