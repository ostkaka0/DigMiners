





;
;




var MessageInit = function(gameData, player) {
    this.players = [];
    this.tickId = (global.gameData) ? global.gameData.world.tickId : 0;
    if (player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
    }

    if (!gameData) return;
    global.gameData.world.entityWorld.update();
}
global.MessageInit = MessageInit;
RegisterMessage.ToClient.push(MessageInit);

MessageInit.prototype.execute = function(gameData) {
    global.gameData.world.tickId = this.tickId;
    var player = global.gameData.playerWorld.add(new Player(this.playerId, this.entityId), this.playerId);
    global.player = player;

    for (var i = 0; i < this.players.length; ++i) {
        var playerData = this.players[i];
        var player = global.gameData.playerWorld.add(new Player(playerData[0], playerData[1]), playerData[0]);
    }

    loadGame();
    global.gameData.HUD = new HUD(global.gameData);
}

MessageInit.prototype.getSerializationSize = function(gameData) {
    var size = 24;

    // Calculate serializationSize of entities
    var entitySizes = {};
    global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
        size += 8; // Entity-id, entitySize
        var entitySize = 0;
        Object.keys(entity).forEach(function(componentKey) {
            var component = entity[componentKey];
            if (!component || !component.serialize) return;
            entitySize += 4 + component.getSerializationSize(); // component-id
        }.bind(this));
        entitySizes[entity.id] = entitySize;
        size += entitySize;
    }.bind(this));
    this.entitySizes = entitySizes;

    // Calculate serializationSize of players
    size += 4;
    global.gameData.playerWorld.objectArray.forEach(function(player) {
        if (player.id == this.playerId) return;
        size += 8;
    }.bind(this));
    return size;
}

MessageInit.prototype.send = function(gameData, socket) {
    var byteArray = new Array(this.getSerializationSize(global.gameData));//new Buffer(this.getSerializationSize());
    var index = new IndexCounter();

    Serialize.int32(byteArray, index, this.tickId);
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, global.gameData.world.generator.id);
    Serialize.int32(byteArray, index, global.gameData.world.generator.seed);

    // Serialize entities
    Serialize.int32(byteArray, index, global.gameData.world.entityWorld.objectArray.length);
    global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
        Serialize.int32(byteArray, index, entity.id);
        Serialize.int32(byteArray, index, this.entitySizes[entity.id]);
        Object.keys(entity).forEach(function(key) {
            var component = entity[key];
            if (!component || !component.serialize) return;
            Serialize.int32(byteArray, index, component.id);
            component.serialize(byteArray, index);
        }.bind(this));
    }.bind(this));

    // Serialize players
    Serialize.int32(byteArray, index, global.gameData.playerWorld.objectArray.length);
    global.gameData.playerWorld.objectArray.forEach(function(player) {
        if (player.id == this.playerId) return;
        Serialize.int32(byteArray, index, player.id);
        Serialize.int32(byteArray, index, player.entityId);
    }.bind(this));

    socket.emit(this.idString, new Buffer(byteArray));
}

MessageInit.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();

    this.tickId = Deserialize.int32(byteArray, index);
    this.playerId = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
    var generatorId = Deserialize.int32(byteArray, index);
    global.gameData.world.generator = new gameData.generatorRegister[generatorId](Deserialize.int32(byteArray, index));

    // Deserialize entities
    var amountOfEntities = Deserialize.int32(byteArray, index);
    for (var i = 0; i < amountOfEntities; ++i) {
        var entityId = Deserialize.int32(byteArray, index);

        var entitySize = Deserialize.int32(byteArray, index);
        var entityEnd = index.value + entitySize;
        var entity = {};
        while (index.value < entityEnd) {
            var componentId = Deserialize.int32(byteArray, index);
            var componentType = RegisterEntity[componentId];
            var componentName = componentType.prototype.name;
            entity[componentName] = new componentType();
            entity[componentName].deserialize(byteArray, index, global.gameData);
        }

        // If entity received already exists, remove existing(convenience)
        if (global.gameData.world.entityWorld.objects[entityId])
            global.gameData.world.entityWorld.remove(global.gameData.world.entityWorld.objects[entityId]);
        global.gameData.world.entityWorld.add(entity, entityId);
    }

    // Deserialize players
    var amountOfPlayers = Deserialize.int32(byteArray, index);
    for (var i = 0; i < amountOfPlayers; ++i) {
        var playerId = Deserialize.int32(byteArray, index);
        var entityId = Deserialize.int32(byteArray, index);
        this.players.push([playerId, entityId]);
    }

    this.index = index;
}
