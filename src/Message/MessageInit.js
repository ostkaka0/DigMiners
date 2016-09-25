
MessageInit = function(player, playerJoinMessages, entityStatusMessages) {
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
}

MessageInit.prototype.execute = function(gameData) {
    entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
    for(var i = 0; i < this.playerJoinMessages.length; ++i)
        this.playerJoinMessages[i].execute(gameData);
    for(var i = 0; i < this.entityStatusMessages.length; ++i)
        this.entityStatusMessages[i].execute(gameData);
}

MessageInit.prototype.serialize = function(byteArray, index) {
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
    var size = 12 + getUTF8SerializationSize(this.playerName);
    for(var i = 0; i < this.playerJoinMessages.length; ++i)
        size += this.playerJoinMessages[i].getSerializationSize();
    for(var i = 0; i < this.entityStatusMessages.length; ++i)
        size += this.entityStatusMessages[i].getSerializationSize();
    return size;
}

MessageInit.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessageInit.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}