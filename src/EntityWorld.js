var EntityWorld = function() {
    this.entityArray = [];
    this.entities = {};
    this.nextId = 1;
    this.freeIdList = [];
    this.entitiesToCreate = [];
    this.entitiesToDestroy = [];
}

EntityWorld.prototype.add = function() {
    var entity = {};
    entity.isActive = false;
    if (this.freeIdList.length > 0)
        entity.id = freeIdList.pop();
    else
        entity.id = this.nextId++;
    this.entitiesToCreate.push(entity);
    return entity;
}

EntityWorld.prototype.remove = function(entity) {
    this.entitiesToDestroy.push(entity);
}

EntityWorld.prototype.update = function() {
    var that = this;
    // Destroy entities
    this.entitiesToDestroy.forEach(function(entity){
        delete that.entities[entity.id];
        that.freeIdList.push(entity.id);
        entity.isActive = false;
    });
    this.entitiesToDestroy.length = 0;

    // Create entities
    this.entitiesToCreate.forEach(function(entity){
        that.entities[entity.id] = entity;
        entity.isActive = true;
    });
    this.entitiesToCreate.length = 0;

    // Update this.entities
    this.entityArray.length = 0;
    for(var id in this.entities) {
        this.entityArray.push(this.entities[id]);
    }
}
