
MessageInit = function(gameData, player) {
    this.players = [];
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

    for(var i = 0; i < this.players.length; ++i) {
        var playerData = this.players[i];
        var player = gameData.playerWorld.add(new Player(playerData[0], playerData[1], playerData[2]), playerData[0]);
        player.setName(playerData[2], gameData);
    }
}

MessageInit.prototype.getSerializationSize = function(gameData) {
    var size = 20 + getUTF8SerializationSize(this.playerName);

    // Calculate serializationSize of entities
    var entitySizes = {};
    console.log("forof of");
    console.log(gameData.entityWorld.objectArray);
    forOf(this, gameData.entityWorld.objectArray, function(entity) {
        size += 8; // Entity-id, entitySize
        var entitySize = 0;
        console.log("forin of ");
        console.log(entity);
        forIn(this, entity, function(componentKey) {
            component = entity[componentKey];
            if(component.serialize == undefined) return;
            console.log("component " + component.id + " serialization size " + component.getSerializationSize());
            entitySize += 4 + component.getSerializationSize(); // component-id
        });
        entitySizes[entity.id] = entitySize;
        size += entitySize;
    });
    this.entitySizes = entitySizes;

    // Calculate serializationSize of players
    size += 4;
    gameData.playerWorld.objectArray.forEach(function(player) {
        if(player.id == this.playerId) return;
        size += 8 + getUTF8SerializationSize(player.name);
    }.bind(this));
    return size;
}

MessageInit.prototype.send = function(gameData, socket) {
    var byteArray = new Array(this.getSerializationSize(gameData));//new Buffer(this.getSerializationSize());
    var index = new IndexCounter();

    serializeInt32(byteArray, index, this.tickId);
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);
    serializeInt32(byteArray, index, gameData.generator.seed);

    // Serialize entities
    serializeInt32(byteArray, index, gameData.entityWorld.objectArray.length);
    gameData.entityWorld.objectArray.forEach(function(entity) {
        serializeInt32(byteArray, index, entity.id);
        //console.log("serializing entity " + entity.id + " size " + this.entitySizes[entity.id]);
        serializeInt32(byteArray, index, this.entitySizes[entity.id]);
        Object.keys(entity).forEach(function(key) {
            var component = entity[key];
            if(!component.serialize) return;
            //console.log("serializing component: " + component.name);
            serializeInt32(byteArray, index, component.id);
            //console.log("componentId " + component.id);
            component.serialize(byteArray, index);
        }.bind(this));
    }.bind(this));

    // Serialize players
    serializeInt32(byteArray, index, gameData.playerWorld.objectArray.length);
    gameData.playerWorld.objectArray.forEach(function(player) {
        if(player.id == this.playerId) return;
        serializeInt32(byteArray, index, player.id);
        serializeInt32(byteArray, index, player.entityId);
        serializeUTF8(byteArray, index, player.name);
    }.bind(this));

    socket.emit(this.idString, new Buffer(byteArray));
}

MessageInit.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();

    this.tickId = deserializeInt32(byteArray, index);
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
    gameData.generator = new Generator(deserializeInt32(byteArray, index));

    // Deserialize entities
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

        if(entity.drawable && entity.bodyparts)
            entity.drawable.initializeBodyparts(entity.bodyparts.bodyparts);
        //console.dir(entity);
    }

    // Deserialize players
    var amountOfPlayers = deserializeInt32(byteArray, index);
    for(var i = 0; i < amountOfPlayers; ++i) {
        var playerId = deserializeInt32(byteArray, index);
        var entityId = deserializeInt32(byteArray, index);
        var playerName = deserializeUTF8(byteArray, index);
        this.players.push([playerId, entityId, playerName]);
    }

    this.index = index;
}
