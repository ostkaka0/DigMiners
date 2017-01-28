import { Serialize, Deserialize } from "engine/Serialization.js"
import IndexCounter from "engine/IndexCounter.js"

import Global from "game/Global.js"
import Config from "game/Config.js"

var MessageInit = function(gameData, player) {
    this.players = [];
    this.tickId = (Global.gameData) ? Global.gameData.world.tickId : 0;
    if (player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
    }

    if (!gameData) return;
    Global.gameData.world.entityWorld.update();
}
export default MessageInit

MessageInit.prototype.execute = function(gameData) {
    Global.gameData.world.tickId = this.tickId;
    var player = Global.gameData.playerWorld.add(new Player(this.playerId, this.entityId), this.playerId);
    global.player = player;

    for (var i = 0; i < this.players.length; ++i) {
        var playerData = this.players[i];
        var player = Global.gameData.playerWorld.add(new Player(playerData[0], playerData[1]), playerData[0]);
    }

    loadGame();
    Global.gameData.HUD = new HUD(Global.gameData);
}

MessageInit.prototype.getSerializationSize = function(gameData) {
    var size = 20;

    // Calculate serializationSize of entities
    var entitySizes = {};
    Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
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
    Global.gameData.playerWorld.objectArray.forEach(function(player) {
        if (player.id == this.playerId) return;
        size += 8;
    }.bind(this));
    return size;
}

MessageInit.prototype.send = function(gameData, socket) {
    var byteArray = new Array(this.getSerializationSize(Global.gameData));//new Buffer(this.getSerializationSize());
    var index = new IndexCounter();

    Serialize.int32(byteArray, index, this.tickId);
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, Global.gameData.world.generator.seed);

    // Serialize entities
    Serialize.int32(byteArray, index, Global.gameData.world.entityWorld.objectArray.length);
    Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
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
    Serialize.int32(byteArray, index, Global.gameData.playerWorld.objectArray.length);
    Global.gameData.playerWorld.objectArray.forEach(function(player) {
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
    Global.gameData.world.generator = new Generator(Deserialize.int32(byteArray, index));

    // Deserialize entities
    var amountOfEntities = Deserialize.int32(byteArray, index);
    for (var i = 0; i < amountOfEntities; ++i) {
        var entityId = Deserialize.int32(byteArray, index);

        var entitySize = Deserialize.int32(byteArray, index);
        var entityEnd = index.value + entitySize;
        var entity = {};
        while (index.value < entityEnd) {
            var componentId = Deserialize.int32(byteArray, index);
            var ComponentType = Config.componentTypes[componentId];
            var componentName = ComponentType.prototype.name;
            entity[componentName] = new ComponentType();
            entity[componentName].deserialize(byteArray, index, Global.gameData);
        }

        // If entity received already exists, remove existing(convenience)
        if (Global.gameData.world.entityWorld.objects[entityId])
            Global.gameData.world.entityWorld.remove(Global.gameData.world.entityWorld.objects[entityId]);
        Global.gameData.world.entityWorld.add(entity, entityId);
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
