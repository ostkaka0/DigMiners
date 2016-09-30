
CommandPlayerEquipStack = function(playerId, stackId) {
    this.playerId = playerId;
    this.stackId = stackId;
}

CommandPlayerEquipStack.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    var item = player.inventory.items[this.stackId];
    if(!item) return;
    item.equipped = !item.equipped;
    //todo: function to equip item?
    if(!isServer)
        updateHUD(gameData);
}

CommandPlayerEquipStack.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.stackId);
}

CommandPlayerEquipStack.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.stackId = deserializeInt32(byteArray, index);
}

CommandPlayerEquipStack.prototype.getSerializationSize = function() {
    return 8;
}
