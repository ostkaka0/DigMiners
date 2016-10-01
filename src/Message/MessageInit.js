
MessageInit = function(gameData, player, playerJoinMessages, entityStatusMessages) {
    this.tickId = (gameData)? gameData.tickId : 0;
    if(player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
        this.playerJoinMessages = playerJoinMessages;
        this.entityStatusMessages = entityStatusMessages;
    } else {
        this.playerJoinMessages = [];
        this.entityStatusMessages = [];
    }
    
    if (!gameData) return;
    gameData.entityWorld.update();
    
    // Calculate serializationSize of entities
    var size = 0;
    var entitySizes = {};
    for (entity of gameData.entityWorld.objectArray) {
        size += 8; // Entity-id, entitySize
        var entitySize = 0;
        for (component in entity) {
            if (!component.serialize) continue;
            entitySize += 4 + component.getSerializationSize();
        }
        entitySizes[entity.id] = entitySize;
        size += entitySize;
    }
    this.entityData = new Array(size);
    var index = new IndexCounter();
    // Serialize entities
    for (entity of gameData.entityWorld.objectArray) {
        serializeInt32(this.entityData, index, entity.id);
        serializeInt32(this.entityData, index, entitySizes[entity.id]);
        for (key in entity) {
            var component = entity[key];
            console.log(component.name);
            if (!component.serialize) continue;
            console.log("serializing component: " + component.name);
            serializeInt32(this.entityData, index, component.id);
            component.serialize(this.entityData, index);
        }
    }
}

MessageInit.prototype.execute = function(gameData) {
    gameData.tickId = this.tickId;
    entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
    for(var i = 0; i < this.playerJoinMessages.length; ++i)
        this.playerJoinMessages[i].execute(gameData);
    for(var i = 0; i < this.entityStatusMessages.length; ++i)
        this.entityStatusMessages[i].execute(gameData);

    // Deserialize entity data
    var index = this.index;//new IndexCounter();
    while(index.value < this.entityData.byteLength) {
        var entityId = deserializeInt32(this.entityData, index);
        var entitySize = deserializeInt32(this.entityData, index);
        var entityEnd = index.value + entitySize;
        var entity = {};
        while(index.value < entityEnd) {
            var componentId = deserializeInt32(this.entityData, index);
            var ComponentType = gameData.componentTypes[componentId];
            var componentName = ComponentType.prototype.name;
            entity[componentName] = new ComponentType();
            entity[componentName].deserialize(this.entityData, index);
        }
        if (!gameData.entityWorld.objects[entityId])
            gameData.entityWorld.add(entity, entityId);
        else
            console.log("Entity does already exist!");
    }
}

MessageInit.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.tickId);
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);

    serializeInt32(byteArray, index, this.playerJoinMessages.length);
    for(var i = 0; i < this.playerJoinMessages.length; ++i)
        this.playerJoinMessages[i].serialize(byteArray, index);

    serializeInt32(byteArray, index, this.entityStatusMessages.length);
    for(var i = 0; i < this.entityStatusMessages.length; ++i)
        this.entityStatusMessages[i].serialize(byteArray, index);
        
    
}

MessageInit.prototype.deserialize = function(byteArray, index) {
    this.tickId = deserializeInt32(byteArray, index);
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);

    var playerJoinMessagesLength = deserializeInt32(byteArray, index);
    for(var i = 0; i < playerJoinMessagesLength; ++i) {
        var message = new MessagePlayerJoin();
        message.deserialize(byteArray, index);
        this.playerJoinMessages.push(message);
    }

    var entityStatusMessagesLength = deserializeInt32(byteArray, index);
    for(var i = 0; i < entityStatusMessagesLength; ++i) {
        var message = new MessageEntityStatus();
        message.deserialize(byteArray, index);
        this.entityStatusMessages.push(message);
    }
}

MessageInit.prototype.getSerializationSize = function() {
    var size = 20 + getUTF8SerializationSize(this.playerName);
    for(var i = 0; i < this.playerJoinMessages.length; ++i)
        size += this.playerJoinMessages[i].getSerializationSize();
    for(var i = 0; i < this.entityStatusMessages.length; ++i)
        size += this.entityStatusMessages[i].getSerializationSize();
    return size;
}

MessageInit.prototype.send = function(socket) {
    var byteArray = new Array(this.getSerializationSize());//new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    byteArray = byteArray.concat(this.entityData);
    socket.emit(this.idString, new Buffer(byteArray));
    console.log(this.entityData);
}

MessageInit.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
    this.entityData = byteArray;//byteArray.slice(counter.value, byteArray.byteLength);
    this.index = counter;
}
