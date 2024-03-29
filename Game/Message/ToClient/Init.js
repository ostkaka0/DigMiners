
var MessageInit = function(player) {
    this.players = [];
    this.tickId = (World) ? World.tickId : 0;
    if (player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
    }

    if (World)
        World.entities.update();
}
global.MessageInit = MessageInit;
TypeRegister.add(RegisterMessage.ToClient, MessageInit);

MessageInit.prototype.execute = function() {
    World.tickId = this.tickId + 1;
    var player = Game.playerWorld.add(new Player(this.playerId, this.entityId), this.playerId);
    Client.player = player;
    Client.playerId = player.id;

    for (var i = 0; i < this.players.length; ++i) {
        var playerData = this.players[i];
        var player = Game.playerWorld.add(new Player(playerData[0], playerData[1]), playerData[0]);
    }

    //worldLoad();
    Game.HUD = new HUD();
}

MessageInit.prototype.getSerializationSize = function() {
    var size = 24;

    // Calculate serializationSize of entities
    var entitySizes = {};
    World.entities.objectArray.forEach(function(entity) {
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
    Game.playerWorld.objectArray.forEach(function(player) {
        if (player.id == this.playerId) return;
        size += 8;
    }.bind(this));
    return size;
}

MessageInit.prototype.send = function(socket) {
    var byteArray = new Array(this.getSerializationSize());//new Buffer(this.getSerializationSize());
    var index = new IndexCounter();

    Serialize.int32(byteArray, index, this.tickId);
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, World.generator.id);
    Serialize.int32(byteArray, index, World.generator.seed);

    // Serialize entities
    Serialize.int32(byteArray, index, World.entities.objectArray.length);
    World.entities.objectArray.forEach(function(entity) {
        //var start = index.value;
        Serialize.int32(byteArray, index, entity.id);
        Serialize.int32(byteArray, index, this.entitySizes[entity.id]);
        Object.keys(entity).forEach(function(key) {
            //var begin = index.value;
            var component = entity[key];
            if (!component || !component.serialize) return;
            Serialize.int32(byteArray, index, component.id);
            component.serialize(byteArray, index);
            //console.log(component.name + " is " + (index.value - begin) + " bytes");
        }.bind(this));
        //console.log("entity was " + (index.value - start) + " bytes");
    }.bind(this));

    // Serialize players
    Serialize.int32(byteArray, index, Game.playerWorld.objectArray.length);
    Game.playerWorld.objectArray.forEach(function(player) {
        if (player.id == this.playerId) return;
        Serialize.int32(byteArray, index, player.id);
        Serialize.int32(byteArray, index, player.entityId);
    }.bind(this));

    socket.emit(this.idString, new Buffer(byteArray));
}

MessageInit.prototype.receive = function(byteArray) {
    gameModeChange(new Game.defaultgameMode());
    gameModeTick();
    worldTick();

    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();

    this.tickId = Deserialize.int32(byteArray, index);
    this.playerId = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
    var generatorId = Deserialize.int32(byteArray, index);
    World.generator = new Game.generatorRegister[generatorId](Deserialize.int32(byteArray, index));

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
            entity[componentName].deserialize(byteArray, index);
        }

        // If entity received already exists, remove existing(convenience)
        if (World.entities.objects[entityId])
            World.entities.remove(World.entities.objects[entityId]);
        World.entities.add(entity, entityId);
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
