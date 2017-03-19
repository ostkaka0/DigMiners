









var CommandPlayerXP = function(playerId, xp) {
    this.playerId = playerId;
    this.xp = xp;
}
global.CommandPlayerXP = CommandPlayerXP;
RegisterCommand.push(CommandPlayerXP);

CommandPlayerXP.prototype.execute = function() {
    var player = global.gameData.playerWorld.objects[this.playerId];
    if (!player) return;
    player.xp += this.xp;
    var nextLevelXP = 10 * Math.pow(10.0, (player.level+1)/10.0);
    nextLevelXP = Math.round( nextLevelXP / Math.pow(10, Math.floor(Math.log10(nextLevelXP/10)))) *  Math.pow(10, Math.floor(Math.log10(nextLevelXP/10)));
    while (player.xp >= nextLevelXP) {
        player.xp -= nextLevelXP;
        player.level++;
        console.log("level", player.level, "xp:", player.xp, "/", nextLevelXP);
    }
}

CommandPlayerXP.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.xp);
}

CommandPlayerXP.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.xp = Deserialize.int32(byteArray, index);
}

CommandPlayerXP.prototype.getSerializationSize = function() {
    return 8;
}
