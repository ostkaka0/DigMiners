
MessageEntitySpawn = function(gameData, entity) {
    this.entity = entity;
    if(entity)
        this.entityId = entity.id;
}

MessageEntitySpawn.prototype.execute = function(gameData) {
    if(!gameData.entityWorld.objects[this.entityId])
        gameData.entityWorld.add(this.entity, this.entityId);
    else
        console.log("Entity already exists!");

    if(this.entity.drawable && this.entity.bodyparts)
        this.entity.drawable.initializeBodyparts(this.entity.bodyparts.bodyparts);
}

MessageEntitySpawn.prototype.getSerializationSize = function() {
    var size = 8; // Entity-id, numComponents
    this.numComponents = 0;
    for(var component in this.entity) {
        component = this.entity[component];
        if(!component.serialize) continue;
        size += 4 + component.getSerializationSize(); // component-id
        ++this.numComponents;
    }
    return size;
}

MessageEntitySpawn.prototype.send = function(gameData, socket) {
    var byteArray = new Array(this.getSerializationSize());//new Buffer(this.getSerializationSize());
    var index = new IndexCounter();

    // Serialize entity
    serializeInt32(byteArray, index, this.entity.id);
    serializeInt32(byteArray, index, this.numComponents);
    for(var key in this.entity) {
        var component = this.entity[key];
        if(!component.serialize) continue;
        serializeInt32(byteArray, index, component.id);
        component.serialize(byteArray, index);
    }
    socket.emit(this.idString, new Buffer(byteArray));
}

MessageEntitySpawn.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();

    // Deserialize entity
    var entityId = deserializeInt32(byteArray, index);
    var numComponents = deserializeInt32(byteArray, index);
    var entity = {};
    for(var i = 0; i < numComponents; ++i) {
        var componentId = deserializeInt32(byteArray, index);
        var ComponentType = gameData.componentTypes[componentId];
        var componentName = ComponentType.prototype.name;
        entity[componentName] = new ComponentType();
        entity[componentName].deserialize(byteArray, index, gameData);
        //console.dir(entity[componentName]);
    }
    this.entityId = entityId;
    this.entity = entity;
}
