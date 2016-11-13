
CommandPlayerJoin = function(playerId, entityId, playerName, socketId) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.playerName = playerName;
    this.socketId = socketId;
}

CommandPlayerJoin.prototype.execute = function(gameData) {

    if(isServer || this.playerId != global.player.id) {  
        var player = new Player(this.playerId, this.entityId);
        gameData.playerWorld.add(player, this.playerId);    
    }

    if(isServer) {
        var socket = connections[this.socketId].socket;
        connections[this.socketId].player = player;
        player.socket = socket;

        // Send init message
        // Sends generator seed, chunks must be sent AFTERWARDS
        new MessageInit(gameData, player).send(gameData, socket);

        // Spawn player's entity
        var entity = entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
        connections[this.socketId].entity = entity;
        sendCommand(new CommandEntitySpawn(gameData, entity, this.entityId));

        // Send chunks
        // TODO: client requests chunks instead
        for(var x = -3; x < 3; ++x) {
            for(var y = -3; y < 3; ++y) {
                var chunk = gameData.tileWorld.get(x, y);
                var blockChunk = gameData.blockWorld.get(x, y);
                var message = new MessageChunk(chunk, blockChunk, x, y);
                message.send(socket);
            }
        }

        // give player shovel at join
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.RustyShovel.id, 1);
        message.execute(gameData);
        message.send(socket);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.CopperShovel.id, 1);
        message.execute(gameData);
        message.send(socket);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.IronShovel.id, 1);
        message.execute(gameData);
        message.send(socket);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.SteelShovel.id, 1);
        message.execute(gameData);
        message.send(socket);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.DiamondShovel.id, 1);
        message.execute(gameData);
        message.send(socket);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.CopperSword.id, 1);
        message.execute(gameData);
        message.send(socket);

        // give player dynamite at join
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.Dynamite.id, 4);
        message.execute(gameData);
        message.send(socket);

        // give player blocks at join
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.StoneWall.id, 10);
        message.execute(gameData);
        message.send(socket);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, Items.StoneFloor.id, 10);
        message.execute(gameData);
        message.send(socket);

        // (TEMPORARY) spawn monsters on player join
        for(var i = 0; i < 3; ++i) {       
            var monsterEntityId = idList.next();
            var monster = entityTemplates.testMonster(monsterEntityId, [0, 0], gameData);
            sendCommand(new CommandEntitySpawn(gameData, monster, monsterEntityId));
        }
    }
    console.log(this.playerName + " connected with playerId " + this.playerId);
}

CommandPlayerJoin.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);
}

CommandPlayerJoin.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
}

CommandPlayerJoin.prototype.getSerializationSize = function() {
    return 8 + getUTF8SerializationSize(this.playerName);
}
