
MessageInit = function(gameData, player) {
    this.tickId = (gameData) ? gameData.tickId : 0;
    if(player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
    }

    if(!gameData) return;
    gameData.entityWorld.update();
}

MessageInit.prototype.execute = function(gameData) {
    gameData.tickId = this.tickId;
    //entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
    var player = gameData.playerWorld.add(new Player(this.playerId, this.entityId, this.playerName), this.playerId);
    player.setName(this.playerName, gameData);
}

MessageInit.prototype.serialize = function(gameData, byteArray, index) {
    serializeInt32(byteArray, index, this.tickId);
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);

    // Serialize entities
    serializeInt32(byteArray, index, gameData.entityWorld.objectArray.length);
    for(entity of gameData.entityWorld.objectArray) {
        serializeInt32(byteArray, index, entity.id);
        console.log("serializing entity " + entity.id + " size " + this.entitySizes[entity.id]);
        serializeInt32(byteArray, index, this.entitySizes[entity.id]);
        for(var key in entity) {
            var component = entity[key];
            if(!component.serialize) continue;
            console.log("serializing component: " + component.name);
            serializeInt32(byteArray, index, component.id);
            //console.log("componentId " + component.id);
            component.serialize(byteArray, index);
        }
    }
}

MessageInit.prototype.deserialize = function(gameData, byteArray, index) {
    this.tickId = deserializeInt32(byteArray, index);
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);

    // Deserialize entity data
    //console.log("bytelength " + byteArray.byteLength);
    var amountOfEntities = deserializeInt32(byteArray, index);
    //console.log("deserializing " + amountOfEntities + " entities");
    for(var i = 0; i < amountOfEntities; ++i) {
        var entityId = deserializeInt32(byteArray, index);
        var entitySize = deserializeInt32(byteArray, index);
        var entityEnd = index.value + entitySize;
        //console.log(entityId + " begin " + index.value + " end " + entityEnd);
        var entity = {};
        while(index.value < entityEnd) {
            //console.log("index.value " + index.value + " of " + entityEnd);
            var componentId = deserializeInt32(byteArray, index);
            //console.log("componentId " + componentId);
            var ComponentType = gameData.componentTypes[componentId];
            var componentName = ComponentType.prototype.name;
            entity[componentName] = new ComponentType();
            entity[componentName].deserialize(byteArray, index, gameData);
            //console.log("deserialized component " + componentName);
            //console.log("now at " + index.value);
        }
        if(!gameData.entityWorld.objects[entityId])
            gameData.entityWorld.add(entity, entityId);
        else
            console.log("Entity does already exist!");
        //console.dir(entity);
    }
}

MessageInit.prototype.getSerializationSize = function(gameData) {
    var size = 16 + getUTF8SerializationSize(this.playerName);
    // Calculate serializationSize of entities
    var entitySizes = {};
    for(entity of gameData.entityWorld.objectArray) {
        size += 8; // Entity-id, entitySize
        var entitySize = 0;
        for(var component in entity) {
            component = entity[component];
            if(!component.serialize) continue;
            //console.log("component " + component.id + " serialization size " + component.getSerializationSize());
            entitySize += 4 + component.getSerializationSize(); // component-id
        }
        entitySizes[entity.id] = entitySize;
        size += entitySize;
    }
    this.entitySizes = entitySizes;
    //console.log("TOTAL size " + size);
    return size;
}

MessageInit.prototype.send = function(gameData, socket) {
    var byteArray = new Array(this.getSerializationSize(gameData));//new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(gameData, byteArray, counter);
    byteArray = byteArray.concat(this.entityData);
    socket.emit(this.idString, new Buffer(byteArray));
}

MessageInit.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(gameData, new Uint8Array(byteArray), counter);
    this.entityData = byteArray;//byteArray.slice(counter.value, byteArray.byteLength);
    this.index = counter;
}
