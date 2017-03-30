
class CommandChoosePerk {
    constructor (playerId, perkId) {
        this.playerId = playerId;
        this.perkId = perkId;
    }
    execute() {
        var player = gameData.playerWorld.objects[this.playerId];
        if (!player) return;
        player.choosePerk(this.perkId);
    }
    serialize(byteArray, index) {
        Serialize.int32(byteArray, index, this.playerId);
        Serialize.int32(byteArray, index, this.perkId);
    }
    deserialize(byteArray, index) {
        this.playerId = Deserialize.int32(byteArray, index);
        this.perkId = Deserialize.int32(byteArray, index);
    }
    getSerializationSize() { return 8; }
}
RegisterCommand.push(CommandChoosePerk);
